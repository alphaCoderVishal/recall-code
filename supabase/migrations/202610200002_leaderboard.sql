-- Only opt-in display names and aggregate scores are exposed, never study documents.
create table public.leaderboard_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(btrim(display_name)) between 2 and 30),
  participating boolean not null default false,
  correct_cards integer not null default 0 check (correct_cards >= 0)
);
alter table public.leaderboard_profiles enable row level security;
revoke all on public.leaderboard_profiles from anon, authenticated;
grant select on public.leaderboard_profiles to authenticated;
create policy "Read own leaderboard preference" on public.leaderboard_profiles
for select to authenticated using ((select auth.uid()) = user_id);

create function public.recall_correct_cards(doc jsonb) returns integer
language sql immutable set search_path = '' as $$
  with cards as (
    select distinct c->>'id' as id
    from jsonb_array_elements(case when jsonb_typeof(doc->'cards')='array' then doc->'cards' else '[]'::jsonb end) c
    where jsonb_typeof(c->'id')='string'
  ), latest as (
    select distinct on (e->>'cardId') e->>'cardId' as id, e->>'rating' as rating
    from jsonb_array_elements(case when jsonb_typeof(doc->'history')='array' then doc->'history' else '[]'::jsonb end) with ordinality as h(e, n)
    order by e->>'cardId',
      (case when jsonb_typeof(e->'at')='number' and length(e->>'at')<=20 then (e->>'at')::numeric else 0 end) desc, n desc
  )
  select count(*)::integer from cards join latest using(id) where rating in ('Good','Easy');
$$;
revoke all on function public.recall_correct_cards(jsonb) from public, anon, authenticated;

create function public.refresh_leaderboard_score() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  update public.leaderboard_profiles set correct_cards=public.recall_correct_cards(new.document)
  where user_id=new.user_id;
  return new;
end;
$$;
revoke all on function public.refresh_leaderboard_score() from public, anon, authenticated;
create trigger refresh_leaderboard_score after insert or update of document on public.study_snapshots
for each row execute function public.refresh_leaderboard_score();

create function public.set_leaderboard_profile(p_display_name text, p_participating boolean)
returns void language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid();
begin
  if uid is null then raise exception 'Authentication required' using errcode='42501'; end if;
  if p_display_name is null or char_length(btrim(p_display_name)) not between 2 and 30 or p_participating is null then
    raise exception 'Choose a display name between 2 and 30 characters';
  end if;
  -- Lock snapshot against a concurrent review save before calculating the score.
  perform 1 from public.study_snapshots where user_id=uid for update;
  insert into public.leaderboard_profiles(user_id,display_name,participating,correct_cards)
  values(uid,btrim(p_display_name),p_participating,
    coalesce((select public.recall_correct_cards(document) from public.study_snapshots where user_id=uid),0))
  on conflict(user_id) do update set display_name=excluded.display_name,
    participating=excluded.participating,correct_cards=excluded.correct_cards;
end;
$$;
revoke all on function public.set_leaderboard_profile(text,boolean) from public, anon;
grant execute on function public.set_leaderboard_profile(text,boolean) to authenticated;

create function public.get_leaderboard()
returns table(rank bigint, display_name text, correct_cards integer, is_me boolean)
language sql stable security definer set search_path = '' as $$
  with ranked as (
    select rank() over(order by p.correct_cards desc) as rank,
      row_number() over(order by p.correct_cards desc,p.display_name,p.user_id) as position,
      p.user_id,p.display_name,p.correct_cards
    from public.leaderboard_profiles p where p.participating and auth.uid() is not null
  )
  select r.rank,r.display_name,r.correct_cards,r.user_id=auth.uid() from ranked r
  where r.position<=100 or r.user_id=auth.uid()
  order by r.correct_cards desc,r.display_name,r.user_id;
$$;
revoke all on function public.get_leaderboard() from public, anon;
grant execute on function public.get_leaderboard() to authenticated;

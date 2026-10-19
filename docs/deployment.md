# Cloudflare Pages + Supabase Free

## Database and login

1. Create a Supabase Free project near your users.
2. Run `supabase/migrations/202610200001_study_sync.sql` once in its SQL editor. This creates the owner-protected table and revision-checked RPC.
3. Create a GitHub OAuth application for RecallCode. Its callback is `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`. Put its client ID and secret only in Supabase Authentication > Providers > GitHub and enable that provider.
4. Set Supabase Authentication > URL Configuration > Site URL to the production Pages URL. Add that exact URL as an allowed redirect. Add localhost only if needed for local testing.
5. Put the project URL and publishable key in `.env` (ignored by Git) using `.env.example`. No database password or secret/service-role key goes in the build.

GitHub OAuth is the default. Optional `AUTH_MODE=email` adds email/password, but public email delivery requires configured SMTP; Supabase's built-in sender is restricted to team addresses.

## Static deployment

Run `npm ci`, `npm test`, `npm run test:java`, `npm run build`, then browser checks. Create a Cloudflare Pages Direct Upload project named `recall-code` and upload only `dist/` (or a ZIP of its contents). Alternatively, authenticate Wrangler and run `npm run deploy`; that command refuses to deploy an unconfigured login build.

For automatic deployment, configure the repository's manual Pages workflow with `CLOUDFLARE_API_TOKEN` (Pages edit for the deployment account) as a secret and `CLOUDFLARE_ACCOUNT_ID`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` as variables. Tokens are not required in the shipped app. Direct Upload projects are deployed through upload/CLI rather than Git integration.

## Verify production

- HTTPS loads and Explore 250 lists the catalog.
- GitHub login redirects back to the same production origin.
- Enroll a question, rate a card, and reload; status becomes Synced.
- Sign out: guest practice is separate. Sign in again: account progress returns.
- A second browser/device restores account progress.
- Anonymous REST requests cannot read/write the study table. Cross-account tests must not see another user's row.
- Conflicting offline edits require a choice instead of silently overwriting progress.

Only static content is public. Never upload `.env`, `node_modules`, source credentials, or database backups to Pages.

## Cost boundaries

[Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/) and [Supabase pricing](https://supabase.com/pricing) are authoritative. The initial architecture fits free plans, but quotas and inactivity pausing apply. A custom domain is optional and may cost extra. No paid code-execution service or SMTP is needed for GitHub login.

Official references: [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [GitHub login](https://supabase.com/docs/guides/auth/social-login/auth-github), [email sender limits](https://supabase.com/docs/guides/auth/auth-smtp), [redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls), [Pages direct upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).

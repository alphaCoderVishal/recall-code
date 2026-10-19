import { signInButtons } from "./auth-options.js";
const escape = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

export function leaderboardView(board, signedIn, configured, localScore) {
  const intro = `<div class="page-heading"><div><div class="eyebrow">LEARN TOGETHER</div><h1>A little practice adds up.</h1><p class="muted">Ranked by distinct flashcards whose latest self-rating is Good or Easy.</p></div><button data-action="leaderboard-refresh" ${!signedIn || board.loading ? "disabled" : ""}>Refresh rankings</button></div>`;
  const summary = `<section class="progress-stats"><article><strong>${localScore}</strong><span>Your strong-recall cards on this device</span></article><article><strong>1 card = 1 point</strong><span>Repeat reviews never add duplicate points</span></article></section><p class="muted">Self-reported recall, not verified correct code. Again or Hard removes a card’s point until you recall it well again. Custom cards and paused cards count too. Rankings use your last synced cloud copy.</p>`;
  if (!signedIn)
    return (
      intro +
      summary +
      `<section class="account-panel"><h2>Join the practice community</h2><p>Your guest progress stays private. Sign in to view rankings and choose whether to share a display name and score.</p>${configured ? signInButtons() : "<p>Cloud login is not configured in this build.</p>"}</section>`
    );
  if (board.loading)
    return intro + summary + '<p role="status">Loading leaderboard…</p>';
  if (board.error)
    return (
      intro +
      summary +
      '<div class="warning" role="alert">Leaderboard unavailable. Your practice is still saved. Try Refresh rankings; the server may need the leaderboard migration.</div>'
    );
  const profile = board.profile;
  return (
    intro +
    summary +
    `<section class="settings-panel"><h2>${profile?.participating ? "You’re on the board" : "Choose to participate"}</h2><p>Other signed-in users can see your chosen name and score. Your email, questions and notes stay private. You can leave at any time.</p><label>Leaderboard display name<input id="leaderboard-name" maxlength="30" minlength="2" value="${escape(profile?.display_name || "")}" placeholder="Choose a nickname" autocomplete="off"></label><div class="actions"><button class="primary" data-action="leaderboard-join">${profile?.participating ? "Save display name" : "Join leaderboard"}</button>${profile?.participating ? '<button data-action="leaderboard-leave">Leave leaderboard</button>' : ""}</div></section><section class="leaderboard-list" aria-label="Community rankings"><div class="leaderboard-row leaderboard-heading"><span>Rank</span><span>Learner</span><span>Strong cards</span></div>${board.rows.length ? board.rows.map((row) => `<article class="leaderboard-row ${row.is_me ? "leaderboard-me" : ""}"><strong>#${escape(row.rank)}</strong><span>${escape(row.display_name)}${row.is_me ? ' <span class="badge">You</span>' : ""}</span><strong>${escape(row.correct_cards)}</strong></article>`).join("") : '<div class="empty"><h2>Be the first to join.</h2><p>Practice together, one remembered idea at a time.</p></div>'}</section><p class="small muted">Top 100 learners and your own entry. Equal scores share a rank; names need not be unique.</p>`
  );
}

export async function fetchLeaderboard(client) {
  const [ranking, profile] = await Promise.all([
    client.rpc("get_leaderboard"),
    client
      .from("leaderboard_profiles")
      .select("display_name,participating")
      .maybeSingle(),
  ]);
  if (ranking.error || profile.error) throw ranking.error || profile.error;
  return {
    rows: ranking.data || [],
    profile: profile.data,
    error: false,
    loading: false,
  };
}

const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

export function profileView(user, summary, questionCount, accountControls) {
  if (!user)
    return `<div class="page-heading"><div><div class="eyebrow">YOUR PROFILE</div><h1>Your account, your practice.</h1><p class="muted">Sign in to view your profile and keep your progress across devices.</p></div></div>${accountControls}`;
  const name =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.user_metadata?.user_name ||
    "Learner";
  const initials = String(name)
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => Array.from(p)[0] || "")
    .join("")
    .toUpperCase();
  const providers = [
    ...new Set(
      (user.identities || [])
        .map((i) => i.provider)
        .concat(user.app_metadata?.providers || []),
    ),
  ];
  const labels = { google: "Google", github: "GitHub", email: "Email" };
  const joined = new Date(user.created_at);
  return `<div class="page-heading"><div><div class="eyebrow">YOUR PROFILE</div><h1>Your account, your practice.</h1><p class="muted">Manage your account and see your learning progress.</p></div><button data-action="navigate" data-value="settings">Practice settings & backup</button></div><section class="profile-identity"><div class="profile-avatar" aria-hidden="true">${esc(initials || "L")}</div><div><h2>${esc(name)}</h2><p class="profile-email">${esc(user.email || "No email available")}</p><div class="profile-details">${providers.map((p) => `<span class="badge">${esc(labels[p] || p)}</span>`).join(" ")}${Number.isNaN(joined.getTime()) ? "" : `<span class="muted small">Member since ${esc(joined.toLocaleDateString(undefined, { month: "long", year: "numeric" }))}</span>`}</div></div></section><section class="progress-stats" aria-label="Your practice statistics">${[
    [questionCount, "Questions in practice"],
    [summary.reviewed, "Flashcards reviewed"],
    [summary.strong, "Strong-recall cards"],
    [summary.attempts, "Total review attempts"],
  ]
    .map(
      ([count, label]) =>
        `<article><strong>${count}</strong><span>${label}</span></article>`,
    )
    .join(
      "",
    )}</section><div class="profile-links"><section class="settings-panel"><h2>Your learning progress</h2><p>See which questions are sticking and which need another review.</p><button data-action="navigate" data-value="progress">View progress</button></section><section class="settings-panel"><h2>Your leaderboard identity</h2><p>Choose a public nickname, join the rankings or leave. Your account email stays private.</p><button data-action="navigate" data-value="leaderboard">Manage leaderboard profile</button></section></div>${accountControls}<p class="small muted">Your name and email come from your sign-in account. Your public leaderboard nickname is managed separately. Strong recall reflects self-ratings, not verified correct code.</p>`;
}

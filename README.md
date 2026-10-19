# RecallCode

Interview practice built around reasoning, spaced recall, and a question context panel.

## Run

Node.js 22 or newer:

```sh
npm ci
npm start
```

Open http://127.0.0.1:4173. The build works without cloud credentials in guest mode. Copy `.env.example` to `.env` to configure Supabase. Only a public project URL and publishable (or legacy anon) key belong in the frontend. Never use a service-role/secret key.

## Features

- 250 curated questions across arrays, search, sliding windows, linked lists, trees, heaps, graphs, backtracking, dynamic programming and bits.
- Each question has original context, examples, reasoning, complexity, pitfalls, an interview follow-up, full Java code and multiple recall cards.
- Search/filter the catalog, inspect a study guide, and add selected questions to practice. Enrollment preserves existing edits and schedules.
- Problem, Notes, Solution and Full code side tabs; question/card CRUD; keyboard review; pause/resume; history; JSON backups.
- Daily new-card budget (default 10) and independent SM-2-inspired schedules. This is not FSRS or Anki-compatible scheduling.
- Optional Supabase GitHub login and account-scoped cloud progress. Guest practice stays separate; importing it into an account requires explicit replacement confirmation.
- Offline edits, optimistic revision checks, explicit conflict choices, and a local recovery copy before conflict resolution.
- Responsive desktop/mobile interface. No in-browser Java execution or LeetCode submission service.

## Hosting

Cloudflare Pages serves the static app and catalog. Supabase Free stores user progress and custom content. See [deployment instructions](docs/deployment.md). Free tiers have quotas and can change; no paid upgrade is needed for this initial setup. Supabase Free projects can pause after inactivity.

GitHub login is the default because Supabase's default email sender is restricted to project-team addresses. Public email/password signup needs an external SMTP service. OAuth credentials live only in Supabase, never in the repository or frontend bundle.

## Research and quality

See [research methodology](docs/research.md) and the three topic-specific research logs. This is a curated curriculum inspired by public study plans, not a verified frequency ranking or an exact copy of a named list. Descriptions and explanations are original; problem links lead to LeetCode. Representative pages were inspected live, and the logs distinguish these from additional reference links.

All 250 Java solutions have executable example/edge-case programs. Passing local cases is not proof of acceptance against LeetCode's hidden tests. Some stateful solutions document required class-name changes for that platform.

## Verification

```sh
npm test
npm run test:java
npm run build
npx playwright install chromium
npm run test:e2e
```

Java verification requires JDK 17+. Tests cover scheduler/data invariants, enrollment/compact snapshots, concurrent sync, account separation, actual PostgreSQL row-level security via PGlite, and browser workflows. `docs/java-verification.json` records the Java check. CI repeats checks on Linux.

## Data

Browser storage is scoped to origin and account. Signed-in documents are protected by owner-only RLS and server-side revision checks. Static catalog content is not duplicated per account; snapshots store references plus edits. Backup export expands those references into complete portable content. Export before clearing browser data or replacing a dataset. Cloud sync uses whole-document conflict resolution, not automatic merging or realtime collaboration.

Clearing local storage removes cached progress and login state. Supabase stores signed-in progress; guest data stays in the browser. Google Fonts may be requested for typography. No analytics or AI service is included.

RecallCode is independent and is not affiliated with LeetCode or Anki.

## Progress, sounds, and daily push reminders

The Progress tab counts distinct cards reviewed, latest Good/Easy cards, latest Again cards, total attempts, and today's attempts. Green questions have Good/Easy on every active card; red means at least one latest Again; amber is partial/Hard; gray is unreviewed. Paused cards are excluded from question colors, but included in overall card totals. Self-ratings are not automatic answer grading or permanent mastery.

Data & backup contains device-local sound/mute/volume controls and daily push settings. Sounds are original synthesized tones, not Duolingo assets. Notifications use a service worker plus a scheduled Cloudflare Worker/D1 backend and can arrive when the app tab is closed. Browser/device support, notification permissions, battery restrictions, Do Not Disturb, and connectivity affect delivery. iOS/iPadOS users must install the site to the Home Screen. No email or login is required for reminders. Reminders are device-wide, continue after sign-out, and can be turned off in settings or browser permissions.

The server stores a push subscription and local reminder time/timezone under a hashed random device capability, separate from study content. It follows daylight-saving changes, claims each due send before delivery, retries failures with limits, and removes expired endpoints. Initial capacity is 1,000 subscriptions and 10 deliveries per minute; delivery time is approximate. Clearing browser data loses the device capability; revoke notification permission if you want to stop reminders before clearing data.

Backend configuration: `worker/wrangler.toml`, schema: `worker/schema.sql`. Deploy using `wrangler deploy --config worker/wrangler.toml`. `VAPID_PRIVATE_KEY` is a Cloudflare secret; do not rotate it casually because existing subscriptions use its public key. `scripts/setup-push-keys.mjs` refuses to replace existing keys. Frontend `REMINDERS_URL` is a public Worker origin. Scheduled Worker changes and static Pages changes are separate deployments.

References: [MDN Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API), [MDN notifications](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API), [WebCrypto Web Push](https://github.com/block65/webcrypto-web-push), [Cloudflare free-plan limits](https://developers.cloudflare.com/workers/platform/limits/).

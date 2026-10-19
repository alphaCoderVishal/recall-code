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

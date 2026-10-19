# RecallCode

A focused web app for remembering the reasoning behind coding interview problems. Save a question once, break it into small flashcards, and review each idea on its own schedule.

## Run locally

Requires Node.js 20 or newer. No runtime packages, API keys, database, or paid services are needed.

```sh
npm ci
npm start
```

Open http://127.0.0.1:4173. Use this same address and browser to keep accessing the same saved study data. `npm start` serves the source; `npm run build` produces a static `dist/` directory. To serve that build locally:

```sh
npm run build
node scripts/serve.mjs --dist
```

The server binds to loopback and is intended for local use. To host the app, upload the contents of `dist/` to a static HTTPS host. All asset paths are relative, including support for hosting under a repository subpath. Hosting is separate from uploading the source to GitHub.

## What works

- Question library with title/tag search and difficulty filters.
- Add, edit, and delete questions with problem context, notes, explanation, language, source link, and full solution code.
- Multiple cards per question: pattern recognition, insight, steps, complexity, edge cases, or code recall.
- Add/edit/delete/pause/resume cards, preserving the schedule when editing.
- Due-card review queue, reveal answer, Again/Hard/Good/Easy ratings, keyboard shortcuts, and saved review history.
- Side context panel with Problem, Notes, Solution, and Full code tabs. Code can be copied. Tabs reset to Problem after rating so a previous solution does not leak into the next card.
- Independent adaptive schedules; question siblings are interleaved when other questions are available.
- Persistent browser storage, cross-tab updates, and JSON export/restore with validation and explicit replacement confirmation.
- Corrupt saved data is not silently overwritten. The backup screen can export the original stored text for recovery.
- Responsive desktop/mobile UI, native dialogs, labeled inputs, visible focus, and reduced-motion support.
- Two starter questions and six editable sample cards. Problem descriptions are original summaries; source links open LeetCode.

## Storage and scope

This is a single-user, local-first release. Data lives in this browser's `localStorage` for the current origin (scheme, hostname, and port). It does **not** include sign-in, cloud synchronization, a remote database, code execution, AI generation, or automatic scraping/import from LeetCode. GitHub stores the application source, not your question data. Clearing browser data removes the local copy; export backups regularly. Import replaces the full dataset after confirmation, rather than merging it.

Google Fonts improves typography when reachable; system font fallbacks work without it. No study data is sent to an API. Original-problem links open external sites only when clicked.

## Scheduler

The scheduler is deterministic and SM-2-inspired, not FSRS or an exact Anki implementation:

| Rating | New card | Existing interval |
| --- | --- | --- |
| Again | 1 minute | Reset interval; retry in 1 minute |
| Hard | 1 day | × 1.2, rounded |
| Good | 1 day | × ease, with at least 1 day growth |
| Easy | 4 days | × ease × 1.3, with at least 1 day growth |

Ease starts at 2.5, decreases for Again/Hard, increases for Easy, and is bounded between 1.3 and 3.5. Each rating stores a history event. A session is a snapshot of due cards: a failed card is eligible again after one minute via **Check for due cards** or a new session, not immediately appended to the active session. Paused cards stay out of the queue. All cards can be reviewed from Card studio without changing their schedules.

## Verify

```sh
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Unit tests cover scheduling, sibling ordering, data validation, serialization, deletion cascades, and storage failures. Browser tests cover reviews/reload persistence, the full-code panel, question/card CRUD, pause, backup restore, invalid/corrupt data, and mobile overflow. GitHub Actions runs both suites and builds the static output.

## Structure

```text
src/app.js          UI, forms, persistence, session state
src/model.js        Validation and scheduling logic
src/seed.js         Editable starter content
src/styles.css     Responsive product design
scripts/serve.mjs   Local static server
scripts/build.mjs   Static build
tests/             Unit and browser coverage
```

RecallCode is an independent study tool and is not affiliated with LeetCode or Anki.

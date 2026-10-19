import { profileView } from "./profile.js";
import { signInButtons } from "./auth-options.js";
import {
  STORAGE_KEY,
  TYPES,
  RATINGS,
  DAY,
  id,
  newCard,
  schedule,
  dueCards,
  removeQuestion,
  validateData,
  saveData,
} from "./model.js";
import { leaderboardView, fetchLeaderboard } from "./leaderboard.js";
import { progressSummary, questionProgress } from "./progress.js";
import { seedData } from "./seed.js";
import {
  catalog,
  catalogById,
  catalogQuestion,
  enrolledQuestion,
  enrollQuestion,
  packData,
  unpackData,
} from "./catalog.js";
import { createCloud, cloudConfigured, cloudAuthMode } from "./cloud.js";

import {
  readFeedback,
  saveFeedback,
  playFeedback,
  feedbackMessage,
} from "./feedback.js";
import {
  reminderState,
  pushSupported,
  remindersConfigured,
  enableReminders,
  disableReminders,
  testReminder,
} from "./reminders.js";
let feedback = readFeedback();
function practicePreferences() {
  const r = reminderState();
  return `<section class="settings-panel"><h2>Make practice a habit</h2><p>Sounds and reminders are optional and apply to this browser, for both guest and signed-in practice.</p><label class="preference-toggle"><input id="sound-enabled" type="checkbox" ${feedback.sound ? "checked" : ""}> Play recall sounds</label><label>Sound volume<input id="sound-volume" type="range" min="0" max="100" value="${Math.round(feedback.volume * 100)}"></label><div class="actions"><button data-action="preview-sound" data-value="good">Preview success</button><button data-action="preview-sound" data-value="again">Preview try again</button></div><p class="small muted">Good/Easy: a bright chime. Hard: a gentle cue. Again: a soft retry sound. These reflect your self-rating; answers are not automatically graded.</p><hr><h2>Daily reminder</h2><p id="reminder-setup-status" aria-live="polite"></p><p>A friendly nudge even when the app is closed. No email needed. Delivery depends on your browser, device notification settings, and connection.</p><label>Reminder time<input id="reminder-time" type="time" value="${esc(r.time || "20:00")}"></label><p class="small muted">Time zone: ${esc(r.zone || Intl.DateTimeFormat().resolvedOptions().timeZone)}. Delivery is approximate. On iPhone/iPad, install to your Home Screen first.</p><p>${r.enabled ? "Daily reminder enabled on this browser." : "Daily reminders are off."}${typeof Notification !== "undefined" && Notification.permission === "denied" ? " Notifications are blocked in browser settings." : ""}</p><div class="actions"><button data-action="enable-reminders" ${!remindersConfigured || !pushSupported() ? "disabled" : ""}>${r.enabled ? "Save reminder time" : "Enable daily reminders"}</button>${r.enabled ? '<button data-action="test-reminder">Send test notification</button><button data-action="disable-reminders">Turn off reminders</button>' : ""}</div>${!remindersConfigured ? '<p class="small muted">The reminder backend has not been connected to this build.</p>' : !pushSupported() ? '<p class="small muted">Push notifications are unavailable in this browser context.</p>' : ""}${r.pendingRemoval ? '<button data-action="disable-reminders">Retry server removal</button>' : ""}<p class="small muted">Enabling stores this device’s push subscription, time, and time zone on our reminder service. Turning off removes it. Reminders are device-wide and continue after sign-out until disabled.</p></section>`;
}
const app = document.querySelector("#app"),
  modal = document.querySelector("#modal");
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const date = (n) =>
  new Date(n).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
const options = (values, selected) =>
  values
    .map(
      (v) => `<option ${v === selected ? "selected" : ""}>${esc(v)}</option>`,
    )
    .join("");
let data,
  blocked = false,
  cloud = null,
  cloudUser = null,
  cloudStatus = cloudConfigured ? "checking" : "unconfigured",
  cloudMessage = "";
let board = { rows: [], profile: null, loading: false, error: false };
let boardRequest = 0;
async function loadLeaderboard() {
  if (!cloudUser || !cloud) return;
  const request = ++boardRequest;
  board = { ...board, loading: true, error: false };
  render();
  try {
    const result = await fetchLeaderboard(cloud.client);
    if (request === boardRequest) board = result;
  } catch {
    if (request === boardRequest)
      board = { ...board, loading: false, error: true };
  }
  if (request === boardRequest && screen === "leaderboard") render();
}
let catalogSearch = "",
  catalogDifficulty = "",
  catalogTopic = "",
  catalogPage = 0;
try {
  const stored = localStorage.getItem(STORAGE_KEY);
  data = stored ? validateData(JSON.parse(stored)) : seedData();
  if (!stored) saveData(localStorage, data);
} catch {
  data = { version: 1, questions: [], cards: [], history: [] };
  blocked = true;
}
let screen = "review",
  selected = data.questions[0]?.id,
  query = "",
  difficulty = "",
  contextOpen = true,
  contextTab = "problem",
  revealed = false;
let queue = dueCards(data).map((c) => c.id),
  completed = 0,
  sessionTotal = queue.length;
let noticeTimer;
function notify(message) {
  const el = document.querySelector("#notice");
  el.textContent = message;
  el.hidden = false;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => {
    el.hidden = true;
  }, 6500);
}
function commit(next) {
  if (blocked) {
    notify(
      "Restore a valid backup from Data & backup before editing. Existing data has not been overwritten.",
    );
    return false;
  }
  try {
    if (cloudUser) cloud.store.save(next);
    else saveData(localStorage, next);
    data = next;
    return true;
  } catch {
    notify(
      "Could not save. Browser storage may be full or unavailable. Export a backup before continuing.",
    );
    return false;
  }
}
const activeCard = () => data.cards.find((c) => c.id === queue[0]);
function resetSession() {
  queue = dueCards(data).map((c) => c.id);
  completed = 0;
  sessionTotal = queue.length;
  revealed = false;
}
function refreshQueue() {
  queue = queue.filter((cid) =>
    data.cards.some((c) => c.id === cid && !c.suspended),
  );
  if (!activeCard()) revealed = false;
}
function contextPanel(question) {
  if (!contextOpen) return "";
  let content = "";
  if (contextTab === "code")
    content = `<div class="code-head"><span>${esc(question.language || "Code")}</span><button data-action="copy-code" class="quiet">Copy code</button></div><pre class="code"><code>${esc(question.code || "No code saved yet. Add a solution in Edit question.")}</code></pre>`;
  else
    content = `<div class="prose">${esc(question[contextTab === "problem" ? "context" : contextTab] || "Nothing here yet. Add it in Edit question.")}</div>`;
  return `<aside class="context"><div class="eyebrow context-head">QUESTION CONTEXT <button class="quiet" data-action="context" aria-label="Close question context">×</button></div><h2>${esc(question.title)}</h2><span class="badge ${question.difficulty.toLowerCase()}">${esc(question.difficulty)}</span> <span class="muted small">${esc(question.tags)}</span><div class="tabs" role="group" aria-label="Question context sections">${[
    ["problem", "Problem"],
    ["notes", "Notes"],
    ["solution", "Solution"],
    ["code", "Full code"],
  ]
    .map(
      ([key, label]) =>
        `<button data-action="context-tab" data-value="${key}" aria-pressed="${contextTab === key}" class="${contextTab === key ? "active" : ""}">${label}</button>`,
    )
    .join(
      "",
    )}</div>${content}<div class="context-bottom">${question.url ? `<a href="${esc(question.url)}" target="_blank" rel="noopener noreferrer">Open original problem ↗</a>` : ""}<button class="quiet" data-action="edit-question" data-id="${question.id}">Edit question</button></div></aside>`;
}
function reviewView() {
  const card = activeCard(),
    question = card && data.questions.find((q) => q.id === card.questionId);
  if (!card || !question)
    return `<div class="page-heading"><div><div class="eyebrow">DAILY REVIEW</div><h1>${completed ? "A little stronger than before." : "You’re all caught up."}</h1><p class="muted">${completed ? `${completed} cards reviewed this session.` : "No cards are due right now."}</p></div></div><section class="empty"><div class="empty-icon">✓</div><h2>${data.cards.length ? "Give your memory some breathing room." : "Start with a question you’ve solved."}</h2><p>${nextDue()}</p><div class="actions"><button class="primary" data-action="check-due">Check for due cards</button><button data-action="navigate" data-value="library">Browse questions</button></div></section>`;
  return `<div class="page-heading"><div><div class="eyebrow">YOUR DAILY PRACTICE</div><h1>A little recall. A stronger intuition.</h1><p class="muted">Focus on the reasoning, one idea at a time.</p></div><button data-action="context" aria-expanded="${contextOpen}">${contextOpen ? "Hide context" : "Open question context"}</button></div><div class="workspace ${!contextOpen ? "closed" : ""} ${contextTab === "code" ? "code-open" : ""}"><section class="review"><div class="flash"><div class="flash-meta"><span class="badge">${esc(card.type)}</span><span class="muted small">${completed + 1} / ${sessionTotal}</span></div><div class="question-label">${esc(question.title)} <span class="dot">·</span> ${esc(question.difficulty)}</div><h2 class="prompt">${esc(card.front)}</h2>${revealed ? `<div class="answer"><div class="eyebrow">THE IDEA</div><div class="prose">${esc(card.back)}</div></div>` : '<div class="recall-space"><span>Take a moment. Explain it in your own words.</span></div>'}<div class="flash-footer"><span class="small muted">${revealed ? "How well did you recall it?" : "Space to reveal · 1–4 to rate"}</span><button class="${revealed ? "" : "primary"}" data-action="reveal">${revealed ? "Hide answer" : "Reveal answer"}</button></div></div>${revealed ? `<div class="ratings">${RATINGS.map((rating, i) => `<button data-action="rate" data-value="${rating}"><span><kbd>${i + 1}</kbd> ${rating}</span><small>${intervalLabel(schedule(card, rating).due - Date.now())}</small></button>`).join("")}</div>` : ""}<div class="progress" role="progressbar" aria-label="Session progress" aria-valuemin="0" aria-valuemax="${sessionTotal}" aria-valuenow="${completed}"><div style="width:${sessionTotal ? (completed / sessionTotal) * 100 : 0}%"></div></div><div class="review-bottom muted small"><span>${completed} of ${sessionTotal} reviewed</span><button class="quiet" data-action="edit-card" data-id="${card.id}">Edit this card</button></div></section>${contextPanel(question)}</div>`;
}
function intervalLabel(ms) {
  return ms < 120000
    ? "1 minute"
    : `${Math.max(1, Math.round(ms / DAY))} day${Math.round(ms / DAY) === 1 ? "" : "s"}`;
}
function nextDue() {
  const next = data.cards
    .filter((c) => !c.suspended)
    .sort((a, b) => a.due - b.due)[0];
  return next
    ? `Next review: ${date(next.due)}. You can also add a new question.`
    : "Add your question context, then create a few focused flashcards.";
}
function questionRows() {
  const matches = data.questions.filter(
    (q) =>
      `${q.title} ${q.tags}`.toLowerCase().includes(query.toLowerCase()) &&
      (!difficulty || q.difficulty === difficulty),
  );
  return matches.length
    ? matches
        .map((q) => {
          const cards = data.cards.filter((c) => c.questionId === q.id),
            due = cards.filter(
              (c) => !c.suspended && c.due <= Date.now(),
            ).length;
          return `<article class="question-row progress-${questionProgress(data, q.id).state}"><div class="question-main"><div class="question-title">${esc(q.title)}</div>${progressBadge(q.id)}<div class="muted small">${esc(q.tags || "No tags yet")}</div></div><span class="badge ${q.difficulty.toLowerCase()}">${esc(q.difficulty)}</span><div class="counts">${cards.length} cards<span class="small muted">${due} due</span></div><button data-action="manage" data-id="${q.id}">Manage cards →</button><button class="quiet" data-action="edit-question" data-id="${q.id}" aria-label="Edit ${esc(q.title)}">Edit</button></article>`;
        })
        .join("")
    : '<div class="empty"><h2>No questions found</h2><p>Add a question or change your filters.</p></div>';
}
function libraryView() {
  return `<div class="page-heading"><div><div class="eyebrow">QUESTION LIBRARY</div><h1>One problem. Several insights.</h1><p class="muted">Save the context once. Recall each idea separately.</p></div><button class="primary" data-action="new-question">+ Add question</button></div><div class="filters"><label class="search-label">Search questions<input id="search" type="search" placeholder="Search titles or tags…" value="${esc(query)}"></label><label>Difficulty<select id="difficulty"><option value="">All difficulties</option>${options(["Easy", "Medium", "Hard"], difficulty)}</select></label></div><div class="list" id="question-list">${questionRows()}</div>`;
}
function catalogMatches() {
  return catalog.filter(
    (q) =>
      `${q.title} ${q.tags} ${q.number}`
        .toLowerCase()
        .includes(catalogSearch.toLowerCase()) &&
      (!catalogDifficulty || q.difficulty === catalogDifficulty) &&
      (!catalogTopic ||
        q.tags
          .split(",")
          .map((t) => t.trim())
          .includes(catalogTopic)),
  );
}
function catalogResults() {
  const matches = catalogMatches(),
    pages = Math.max(1, Math.ceil(matches.length / 20));
  catalogPage = Math.min(catalogPage, pages - 1);
  return `<div class="catalog-summary muted small">${matches.length} questions · Page ${catalogPage + 1} of ${pages}</div><div class="list">${
    matches
      .slice(catalogPage * 20, catalogPage * 20 + 20)
      .map((q) => {
        const enrolled = enrolledQuestion(data, q);
        return `<article class="question-row"><div class="question-main"><div class="question-title"><span class="small muted">${q.number}.</span> ${esc(q.title)}</div>${enrolled ? progressBadge(enrolled.id) : '<span class="recall-badge new">Not in practice</span>'}<div class="muted small">${esc(q.tags)}</div></div><span class="badge ${q.difficulty.toLowerCase()}">${q.difficulty}</span><span class="small muted">${q.cards.length} cards</span><button data-action="preview-catalog" data-id="${q.id}">Study guide</button><button class="${enrolled ? "quiet" : "primary"}" data-action="${enrolled ? "manage" : "enroll"}" data-id="${enrolled?.id || q.id}">${enrolled ? "In my practice" : "Add to practice"}</button></article>`;
      })
      .join("") ||
    '<div class="empty">No matches. Try a different topic or search.</div>'
  }</div><div class="pagination"><button data-action="catalog-page" data-value="-1" ${catalogPage === 0 ? "disabled" : ""}>Previous</button><button data-action="catalog-page" data-value="1" ${catalogPage >= pages - 1 ? "disabled" : ""}>Next</button></div>`;
}
function catalogView() {
  const topics = [
    ...new Set(catalog.flatMap((q) => q.tags.split(",").map((t) => t.trim()))),
  ].sort();
  return `<div class="page-heading"><div><div class="eyebrow">RESEARCHED INTERVIEW COLLECTION</div><h1>${catalog.length} problems. Learn the patterns.</h1><p class="muted">Original study guides, complete Java solutions, and focused recall cards.</p></div></div><div class="catalog-intro"><p>Start with Easy foundations, build breadth with Medium problems, then use Hard problems for stretch practice. Add only what you want to study; new cards are limited to ${data.settings?.newCardsPerDay ?? 10} per day.</p><details><summary>How this collection was selected</summary><p>Topic coverage informed by LeetCode’s <a href="https://leetcode.com/studyplan/top-interview-150/" target="_blank" rel="noopener">Top Interview 150</a>, <a href="https://leetcode.com/studyplan/leetcode-75/" target="_blank" rel="noopener">LeetCode 75</a>, and the <a href="https://www.techinterviewhandbook.org/algorithms/study-cheatsheet/" target="_blank" rel="noopener">Tech Interview Handbook</a>. This is our curated collection, not an official frequency ranking. Each guide links to its original problem. Solve it yourself before using the explanation and cards.</p></details></div><div class="filters"><label class="search-label">Search collection<input type="search" id="catalog-search" value="${esc(catalogSearch)}" placeholder="Title, pattern, or problem number"></label><label>Difficulty<select id="catalog-difficulty" aria-label="Catalog difficulty"><option value="">All difficulties</option>${options(["Easy", "Medium", "Hard"], catalogDifficulty)}</select></label><label>Topic<select id="catalog-topic" aria-label="Catalog topic"><option value="">All topics</option>${options(topics, catalogTopic)}</select></label></div><div id="catalog-results">${catalogResults()}</div>`;
}
function previewCatalog(catalogId) {
  const q = catalogById.get(catalogId);
  if (!q) return;
  openModal(
    `${q.number}. ${esc(q.title)}`,
    `<span class="badge">${esc(q.difficulty)}</span> <span class="small muted">${esc(q.tags)}</span><h3>Understand the task</h3><div class="prose">${esc(q.context)}</div><h3>Worked example</h3><div class="prose">${esc(q.examples)}</div><details class="guide-section"><summary>Reveal approach & reasoning</summary><div class="prose">${esc(q.solution)}</div><p><strong>Time:</strong> ${esc(q.timeComplexity)}<br><strong>Space:</strong> ${esc(q.spaceComplexity)}</p><h3>Common mistake</h3><div class="prose">${esc(q.pitfall)}</div><h3>Follow-up to explain aloud</h3><div class="prose">${esc(q.followUp)}</div></details><details class="guide-section"><summary>Reveal full Java solution</summary><pre class="code"><code>${esc(q.code)}</code></pre></details><details class="guide-section"><summary>${q.cards.length} recall prompts</summary><ol>${q.cards.map((c) => `<li>${esc(c.front)}</li>`).join("")}</ol></details><p class="small"><a href="https://leetcode.com/problems/${q.slug}/" target="_blank" rel="noopener">Open original problem ↗</a></p>`,
    () => {
      const existing = enrolledQuestion(data, q);
      if (existing) {
        selected = existing.id;
        screen = "studio";
        modal.close();
        render();
        return;
      }
      if (commit(enrollQuestion(data, catalogId))) {
        modal.close();
        resetSession();
        render();
        notify("Added to your practice.");
      }
    },
  );
  modal.querySelector('[type="submit"]').textContent = enrolledQuestion(data, q)
    ? "View my cards"
    : "Add to practice";
}
function accountSection() {
  if (!cloudConfigured)
    return '<section class="account-panel"><h2>Login & sync</h2><p>Cloud login is not configured on this local build. Your browser-only practice still works.</p></section>';
  if (!cloudUser)
    return (
      '<section class="account-panel"><h2>Take your progress with you.</h2><p>Sign in to keep your study progress available on your other devices. Your guest practice stays separate until you choose to import it.</p>' +
      signInButtons() +
      (cloudAuthMode === "email"
        ? '<button data-action="email-login">Email sign in</button>'
        : "") +
      "</section>"
    );
  return `<section class="account-panel"><h2>Account & sync</h2><p>Signed in as ${esc(cloudUser.email || cloudUser.user_metadata?.user_name || "your account")}</p><p class="sync-label">${esc(syncLabel())}${cloudMessage ? ` · ${esc(cloudMessage)}` : ""}</p><div class="actions"><button data-action="sync">Sync now</button><button data-action="import-guest">Import guest practice</button><button data-action="signout">Sign out</button></div>${cloudStatus === "conflict" ? '<div class="warning"><p>Both copies have changes. Export a backup before choosing.</p><button data-action="resolve-sync" data-value="remote">Use cloud copy</button> <button data-action="resolve-sync" data-value="local">Keep this device’s copy</button></div>' : ""}</section>`;
}
function syncLabel() {
  return (
    {
      checking: "Checking login…",
      syncing: "Syncing…",
      saved: "Synced",
      offline: "Saved on device · sync pending",
      conflict: "Sync conflict",
      error: "Account needs attention",
      signedout: "Guest · saved on device",
      unconfigured: "Local mode",
    }[cloudStatus] || "Saved on device"
  );
}
function studioView() {
  const question =
    data.questions.find((q) => q.id === selected) || data.questions[0];
  if (!question)
    return `<div class="empty"><h1>Your card studio starts with a question.</h1><button class="primary" data-action="new-question">+ Add question</button></div>`;
  selected = question.id;
  const cards = data.cards.filter((c) => c.questionId === selected);
  return `<div class="page-heading"><div><div class="eyebrow">CARD STUDIO</div><h1>Break the solution into ideas.</h1><p class="muted">Each card has its own review schedule.</p></div><button class="primary" data-action="new-card">+ New flashcard</button></div><div class="studio-toolbar"><label>Question<select id="question-select" aria-label="Question">${data.questions.map((q) => `<option value="${q.id}" ${q.id === selected ? "selected" : ""}>${esc(q.title)}</option>`).join("")}</select></label><button data-action="edit-question" data-id="${selected}">Edit question & code</button><button class="danger quiet" data-action="delete-question" data-id="${selected}">Delete question</button></div><div class="card-grid">${cards.length ? cards.map((c) => `<article class="study-card"><div class="flash-meta"><span class="badge">${esc(c.type)}</span><span class="small muted">${c.suspended ? "Paused" : c.due <= Date.now() ? "Due now" : "Scheduled"}</span></div><h2>${esc(c.front)}</h2><details><summary>Show answer</summary><div class="prose">${esc(c.back)}</div></details><div class="small muted card-schedule">${c.reviews} reviews · ${c.lapses} lapses<br>Next: ${date(c.due)}</div><div class="actions"><button data-action="edit-card" data-id="${c.id}">Edit</button><button data-action="suspend-card" data-id="${c.id}">${c.suspended ? "Resume" : "Pause"}</button><button class="quiet danger" data-action="delete-card" data-id="${c.id}">Delete</button></div></article>`).join("") : '<div class="empty"><h2>No flashcards yet</h2><p>Start with the key insight that made this problem click.</p></div>'}</div>`;
}
function historyView() {
  const history = data.history.slice().reverse();
  return `<div class="page-heading"><div><div class="eyebrow">YOUR PROGRESS</div><h1>Small steps, remembered.</h1><p class="muted">${history.length} reviews recorded · ${dueCards(data).length} cards due now</p></div></div><div class="list">${
    history.length
      ? history
          .slice(0, 100)
          .map((r) => {
            const c = data.cards.find((c) => c.id === r.cardId),
              q = data.questions.find((q) => q.id === c.questionId);
            return `<div class="history-row"><div><strong>${esc(q.title)}</strong><div class="muted small">${esc(c.front)}</div></div><span class="badge">${r.rating}</span><time class="muted small">${date(r.at)}</time></div>`;
          })
          .join("")
      : '<div class="empty"><h2>Your first review starts here.</h2><p>Reveal an answer and rate your recall to record progress.</p></div>'
  }</div>${history.length > 100 ? '<p class="muted small">Showing the latest 100 reviews. Export includes your complete history.</p>' : ""}`;
}
function progressBadge(questionId) {
  const p = questionProgress(data, questionId);
  return `<span class="recall-badge ${p.state}">${p.label} · ${p.reviewed}/${p.total} cards reviewed</span>`;
}
function progressView() {
  const p = progressSummary(data),
    percent = p.total ? Math.round((p.reviewed / p.total) * 100) : 0;
  return `<div class="page-heading"><div><div class="eyebrow">YOUR PROGRESS</div><h1>See how far you’ve come.</h1><p class="muted">Your latest self-ratings show what is sticking and what needs another pass.</p></div></div><section class="progress-stats">${[
    [p.reviewed + "/" + p.total, "Cards reviewed at least once"],
    [p.strong, "Cards with strong recall"],
    [p.retry, "Cards needing another try"],
    [p.attempts, "Total review attempts"],
    [p.today, "Review attempts today"],
  ]
    .map(
      ([n, label]) =>
        `<article><strong>${n}</strong><span>${label}</span></article>`,
    )
    .join(
      "",
    )}</section><section class="settings-panel"><h2>${percent}% of your flashcards reviewed</h2><progress max="${p.total || 1}" value="${p.reviewed}" aria-label="Flashcards reviewed"></progress><p class="small muted">Reviewed means you rated a card at least once. Strong recall means its latest rating is Good or Easy—not permanent mastery. Spaced reviews still become due.</p></section><div class="progress-legend"><span class="recall-badge strong">Green: all active cards Good/Easy</span><span class="recall-badge retry">Red: at least one Again</span><span class="recall-badge learning">Amber: partial recall or Hard</span><span class="recall-badge new">Gray: unreviewed</span></div><div class="list">${p.questions.map((q) => `<article class="question-row progress-${q.state}"><div class="question-main"><div class="question-title">${esc(q.title)}</div>${progressBadge(q.id)}</div><button data-action="manage" data-id="${q.id}">Practice cards</button></article>`).join("") || '<div class="empty">Add questions from Explore 250 to start tracking progress.</div>'}</div><p class="small muted">Question colors exclude paused cards. Overall card totals include them.</p>`;
}
function settingsView() {
  return `<div class="page-heading"><div><div class="eyebrow">DATA & BACKUP</div><h1>Your practice, under your control.</h1><p class="muted">${esc(syncLabel())}. Export a backup whenever you want.</p></div></div>${accountSection()}${practicePreferences()}<section class="settings-panel"><h2>Keep a copy of your progress</h2><p>Export includes your questions, code, flashcards, schedules, and review history. Clearing browser data removes the local copy.</p><div class="actions"><button class="primary" data-action="export">Export backup</button><button data-action="import">Restore backup</button></div><input id="import-file" type="file" accept="application/json,.json" hidden><hr><h2>Review scheduling</h2><label>New cards per day<input id="daily-limit" type="number" min="0" max="100" value="${data.settings?.newCardsPerDay ?? 10}"></label><p class="small muted">Due reviews come first. Set 0 to pause introducing new cards.</p><p>Again: retry after 1 minute. Hard: a short interval. Good: a normal interval. Easy: a longer interval. Each card’s interval adapts independently to your ratings.</p><p class="muted small">This app uses a simple SM-2-inspired scheduler. It does not claim Anki or FSRS compatibility. Question siblings are interleaved when possible. Solutions and full code are hidden behind their tabs.</p><hr><h2>Keyboard shortcuts</h2><p><kbd>Space</kbd> Reveal answer &nbsp; <kbd>1</kbd> Again &nbsp; <kbd>2</kbd> Hard &nbsp; <kbd>3</kbd> Good &nbsp; <kbd>4</kbd> Easy</p></section>`;
}
function render() {
  refreshQueue();
  const due = dueCards(data).length;
  app.innerHTML = `<header class="app-header"><a class="brand" href="#" data-action="navigate" data-value="review"><span class="brand-mark">&lt;/&gt;</span>recall<span>code</span></a><nav aria-label="Main navigation">${[
    ["review", "Daily review"],
    ["catalog", "Explore 250"],
    ["library", "Questions"],
    ["studio", "Card studio"],
    ["history", "History"],
    ["progress", "Progress"],
    ["leaderboard", "Leaderboard"],
  ]
    .map(
      ([key, label]) =>
        `<button class="nav-button ${screen === key ? "active" : ""}" data-action="navigate" data-value="${key}" ${screen === key ? 'aria-current="page"' : ""}>${label}${key === "review" ? `<span class="nav-count">${due}</span>` : ""}</button>`,
    )
    .join(
      "",
    )}</nav><button class="quiet account-button" data-action="navigate" data-value="profile" ${screen === "profile" ? 'aria-current="page"' : ""}>${cloudUser ? "Profile" : "Login"}</button><button class="quiet backup-button" data-action="navigate" data-value="settings">Data & backup</button></header><main id="main">${blocked ? '<div class="warning" role="alert">Saved data could not be loaded. It has not been overwritten. Open Data & backup to export the original data or restore a valid backup.</div>' : ""}${screen === "profile" ? profileView(cloudUser, progressSummary(data), data.questions.length, accountSection()) : screen === "review" ? reviewView() : screen === "catalog" ? catalogView() : screen === "library" ? libraryView() : screen === "studio" ? studioView() : screen === "history" ? historyView() : screen === "progress" ? progressView() : screen === "leaderboard" ? leaderboardView(board, Boolean(cloudUser), cloudConfigured, progressSummary(data).strong) : settingsView()}</main><footer><span>Remember the reasoning.</span><span>${esc(syncLabel())} · ${data.questions.length} questions · ${data.cards.length} cards</span></footer>`;
}
function openModal(title, body, onSubmit) {
  modal.innerHTML = `<form id="modal-form"><div class="modal-header"><h2 id="modal-title">${title}</h2><button type="button" class="quiet" data-close aria-label="Close dialog">×</button></div>${body}<p class="form-error" role="alert" id="form-error"></p><div class="modal-footer"><button type="button" data-close>Cancel</button><button type="submit" class="primary">Save</button></div></form>`;
  modal
    .querySelectorAll("[data-close]")
    .forEach((b) => (b.onclick = () => modal.close()));
  modal.querySelector("form").onsubmit = (e) => {
    e.preventDefault();
    try {
      onSubmit(new FormData(e.currentTarget));
    } catch (error) {
      modal.querySelector("#form-error").textContent = error.message;
    }
  };
  modal.showModal();
}
function field(
  label,
  name,
  value = "",
  { area = false, required = false, type = "text", max = 100000 } = {},
) {
  return `<label>${label}${area ? `<textarea name="${name}" ${required ? "required" : ""} maxlength="${max}" ${name === "code" ? 'class="code-input" spellcheck="false"' : ""}>${esc(value)}</textarea>` : `<input name="${name}" type="${type}" value="${esc(value)}" ${required ? "required" : ""} maxlength="${max}">`}</label>`;
}
function editQuestion(questionId) {
  const q = data.questions.find((q) => q.id === questionId) || {
    id: id(),
    title: "",
    difficulty: "Easy",
    tags: "",
    url: "",
    context: "",
    notes: "",
    solution: "",
    code: "",
    language: "Java",
  };
  openModal(
    questionId ? "Edit question" : "Add question",
    `<div class="form-grid">${field("Question title", "title", q.title, { required: true, max: 200 })}<label>Difficulty<select name="difficulty">${options(["Easy", "Medium", "Hard"], q.difficulty)}</select></label>${field("Topics / tags", "tags", q.tags, { max: 500 })}${field("Original problem URL (optional)", "url", q.url, { type: "url", max: 2000 })}</div>${field("Problem context · examples & constraints", "context", q.context, { area: true, required: true })}${field("Personal notes", "notes", q.notes, { area: true })}${field("Solution explanation", "solution", q.solution, { area: true })}${field("Code language", "language", q.language, { max: 30 })}${field("Full solution code", "code", q.code, { area: true })}`,
    (form) => {
      const updated = { ...q, ...Object.fromEntries(form.entries()) };
      for (const k of Object.keys(updated))
        if (typeof updated[k] === "string") updated[k] = updated[k].trim();
      if (!updated.title || !updated.context)
        throw new Error("Add a title and question context.");
      if (
        updated.url &&
        !["http:", "https:"].includes(new URL(updated.url).protocol)
      )
        throw new Error("Use an http or https URL.");
      const questions = questionId
        ? data.questions.map((x) => (x.id === q.id ? updated : x))
        : [...data.questions, updated];
      if (commit({ ...data, questions })) {
        selected = q.id;
        modal.close();
        if (!questionId) screen = "studio";
        render();
        notify("Question saved.");
      }
    },
  );
}
function editCard(cardId) {
  const card = data.cards.find((c) => c.id === cardId),
    questionId = card?.questionId || selected;
  if (!questionId) return editQuestion();
  openModal(
    card ? "Edit flashcard" : "New flashcard",
    `<p class="muted">Linked to ${esc(data.questions.find((q) => q.id === questionId).title)}</p><label>Card type<select name="type">${options(TYPES, card?.type || "Key insight")}</select></label>${field("Front · recall prompt", "front", card?.front, { area: true, required: true })}${field("Back · explanation", "back", card?.back, { area: true, required: true })}`,
    (form) => {
      const front = String(form.get("front")).trim(),
        back = String(form.get("back")).trim(),
        type = String(form.get("type"));
      if (!front || !back) throw new Error("Add both a prompt and an answer.");
      const updated = card
        ? { ...card, front, back, type }
        : newCard(questionId, front, back, type);
      if (
        commit({
          ...data,
          cards: card
            ? data.cards.map((c) => (c.id === cardId ? updated : c))
            : [...data.cards, updated],
        })
      ) {
        modal.close();
        if (!card) resetSession();
        render();
        notify("Flashcard saved.");
      }
    },
  );
}
function confirmAction(title, text, action, label = "Delete") {
  openModal(title, `<p>${esc(text)}</p>`, () => {
    if (action() !== false) {
      modal.close();
      render();
    }
  });
  modal.querySelector('[type="submit"]').textContent = label;
}
function rate(rating) {
  const card = activeCard();
  if (!revealed || !card) return;
  const now = Date.now(),
    updated = schedule(card, rating, now);
  if (
    commit({
      ...data,
      cards: data.cards.map((c) => (c.id === card.id ? updated : c)),
      history: [...data.history, { cardId: card.id, rating, at: now }],
    })
  ) {
    void playFeedback(rating.toLowerCase(), feedback);
    notify(feedbackMessage(rating));
    queue.shift();
    completed++;
    revealed = false;
    contextTab = "problem";
    render();
  }
}
async function action(name, value, targetId) {
  if (name === "leaderboard-refresh") return loadLeaderboard();
  if (name === "leaderboard-join" || name === "leaderboard-leave") {
    if (!cloudUser || !cloud) return;
    const displayName =
      name === "leaderboard-leave"
        ? board.profile?.display_name
        : document.querySelector("#leaderboard-name").value.trim();
    if (!displayName || displayName.length < 2 || displayName.length > 30)
      return notify("Choose a display name between 2 and 30 characters.");
    const account = cloudUser.id;
    document
      .querySelectorAll('[data-action^="leaderboard-"]')
      .forEach((b) => (b.disabled = true));
    try {
      const { error } = await cloud.client.rpc("set_leaderboard_profile", {
        p_display_name: displayName,
        p_participating: name === "leaderboard-join",
      });
      if (error) throw error;
      if (cloudUser?.id !== account) return;
      await loadLeaderboard();
      notify(
        name === "leaderboard-leave"
          ? "You left the leaderboard."
          : "Leaderboard profile saved.",
      );
    } catch {
      if (cloudUser?.id === account) {
        render();
        notify("Could not save leaderboard preferences. Please try again.");
      }
    }
    return;
  }
  if (name === "navigate" && value === "leaderboard") {
    screen = "leaderboard";
    render();
    return loadLeaderboard();
  }
  if (name === "preview-sound") {
    const played = await playFeedback(value, { ...feedback, sound: true });
    if (!played) notify("Audio is unavailable in this browser.");
  }
  if (
    name === "enable-reminders" ||
    name === "disable-reminders" ||
    name === "test-reminder"
  ) {
    const button = document.querySelector(`[data-action="${name}"]`);
    if (button) button.disabled = true;
    try {
      if (name === "enable-reminders") {
        await enableReminders(
          document.querySelector("#reminder-time").value,
          (message) => {
            const status = document.querySelector("#reminder-setup-status");
            if (status) status.textContent = message;
          },
        );
        notify("Daily reminder saved.");
      } else if (name === "disable-reminders") {
        await disableReminders();
        notify("Daily reminders turned off.");
      } else {
        await testReminder();
        notify("Test notification sent. Check your device notifications.");
      }
    } catch (error) {
      notify(error.message);
    } finally {
      render();
    }
  }
  if (name === "preview-catalog") previewCatalog(targetId);
  if (name === "enroll") {
    if (commit(enrollQuestion(data, targetId))) {
      resetSession();
      render();
      notify("Added to your practice.");
    }
  }
  if (name === "catalog-page") {
    catalogPage += Number(value);
    document.querySelector("#catalog-results").innerHTML = catalogResults();
  }
  if (name === "login") {
    if (cloud) await cloud.login(value || "github");
    else notify("Cloud login is not configured yet.");
  }
  if (name === "sync") {
    await cloud?.store.sync();
    render();
  }
  if (name === "signout") {
    if (cloud.store.envelope?.dirty) {
      notify(
        "You have unsynced changes. Sync or export them before signing out.",
      );
      return;
    }
    await cloud.signout();
  }
  if (name === "resolve-sync")
    confirmAction(
      "Resolve sync conflict?",
      value === "remote"
        ? "Replace this device’s progress with the cloud copy? A local recovery copy is kept."
        : "Replace cloud progress with this device’s copy? Export first if you need both copies.",
      () => {
        void cloud.store.resolve(value).catch((e) => notify(e.message));
      },
      "Use selected copy",
    );
  if (name === "import-guest") {
    let guest;
    try {
      guest = validateData(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    } catch {
      notify("No valid guest practice to import.");
      return;
    }
    confirmAction(
      "Import guest practice?",
      `Replace your account’s current practice with ${guest.questions.length} guest questions? Export account progress first if you need both.`,
      () => {
        const saved = commit(guest);
        if (saved) resetSession();
        return saved;
      },
      "Import & sync",
    );
  }
  if (name === "email-login") {
    openModal(
      "Email sign in",
      `${field("Email", "email", "", { type: "email", required: true, max: 254 })}${field("Password", "password", "", { type: "password", required: true, max: 128 })}<label><input type="checkbox" name="signup" class="inline-check"> Create a new account</label><p class="small muted">New accounts may require email confirmation. Email delivery must be configured by the site owner.</p>`,
      (form) => {
        void cloud
          .password(
            String(form.get("email")),
            String(form.get("password")),
            form.has("signup"),
          )
          .then((result) => {
            modal.close();
            notify(
              result.data.session
                ? "Signed in."
                : "Check your email to confirm your account.",
            );
          })
          .catch((error) => {
            modal.querySelector("#form-error").textContent = error.message;
          });
      },
    );
    modal.querySelector('[type="submit"]').textContent = "Continue";
  }
  if (name === "navigate") {
    screen = value;
    if (screen === "review" && !queue.length) resetSession();
    render();
  }
  if (name === "context") {
    contextOpen = !contextOpen;
    render();
  }
  if (name === "context-tab") {
    contextTab = value;
    render();
  }
  if (name === "reveal") {
    revealed = !revealed;
    render();
  }
  if (name === "rate") rate(value);
  if (name === "check-due") {
    resetSession();
    render();
  }
  if (name === "new-question") editQuestion();
  if (name === "edit-question") editQuestion(targetId);
  if (name === "manage") {
    selected = targetId;
    screen = "studio";
    render();
  }
  if (name === "new-card") editCard();
  if (name === "edit-card") editCard(targetId);
  if (name === "suspend-card") {
    if (
      commit({
        ...data,
        cards: data.cards.map((c) =>
          c.id === targetId ? { ...c, suspended: !c.suspended } : c,
        ),
      })
    ) {
      resetSession();
      render();
    }
  }
  if (name === "delete-question")
    confirmAction(
      "Delete question?",
      "This removes the question, its flashcards, and their review history. Export a backup first if you need to keep a copy.",
      () => {
        if (!commit(removeQuestion(data, targetId))) return false;
        resetSession();
      },
    );
  if (name === "delete-card")
    confirmAction(
      "Delete flashcard?",
      "This removes the card and its review history.",
      () => {
        if (
          !commit({
            ...data,
            cards: data.cards.filter((c) => c.id !== targetId),
            history: data.history.filter((r) => r.cardId !== targetId),
          })
        )
          return false;
        resetSession();
      },
    );
  if (name === "copy-code") {
    const c = activeCard(),
      q = data.questions.find((q) => q.id === c?.questionId);
    try {
      await navigator.clipboard.writeText(q?.code || "");
      notify("Code copied.");
    } catch {
      notify("Clipboard unavailable. Select the code to copy it.");
    }
  }
  if (name === "export") {
    let raw;
    try {
      raw = blocked
        ? localStorage.getItem(cloudUser ? cloud.store.key() : STORAGE_KEY)
        : JSON.stringify(data, null, 2);
    } catch {
      notify("Browser storage cannot be read.");
      return;
    }
    if (!raw) {
      notify("No stored data available to export.");
      return;
    }
    const url = URL.createObjectURL(
        new Blob([raw], { type: "application/json" }),
      ),
      a = document.createElement("a");
    a.href = url;
    a.download = `recallcode-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  if (name === "import") document.querySelector("#import-file").click();
}
app.addEventListener("click", (e) => {
  const b = e.target.closest("[data-action]");
  if (!b) return;
  e.preventDefault();
  action(b.dataset.action, b.dataset.value, b.dataset.id).catch(() =>
    notify("That action could not be completed. Your saved data is unchanged."),
  );
});
app.addEventListener("input", (e) => {
  if (e.target.id === "search") {
    query = e.target.value;
    document.querySelector("#question-list").innerHTML = questionRows();
  }
  if (e.target.id === "catalog-search") {
    catalogSearch = e.target.value;
    catalogPage = 0;
    document.querySelector("#catalog-results").innerHTML = catalogResults();
  }
});
app.addEventListener("change", async (e) => {
  if (e.target.id === "sound-enabled" || e.target.id === "sound-volume") {
    const next = {
      ...feedback,
      ...(e.target.id === "sound-enabled"
        ? { sound: e.target.checked }
        : { volume: Number(e.target.value) / 100 }),
    };
    try {
      saveFeedback(next);
      feedback = next;
      if (feedback.sound) void playFeedback("good", feedback);
    } catch {
      notify("Could not save sound preferences.");
      render();
    }
  }
  if (e.target.id === "catalog-difficulty") {
    catalogDifficulty = e.target.value;
    catalogPage = 0;
    document.querySelector("#catalog-results").innerHTML = catalogResults();
  }
  if (e.target.id === "catalog-topic") {
    catalogTopic = e.target.value;
    catalogPage = 0;
    document.querySelector("#catalog-results").innerHTML = catalogResults();
  }
  if (e.target.id === "daily-limit") {
    const limit = Number(e.target.value);
    if (!Number.isInteger(limit) || limit < 0 || limit > 100) {
      notify("Choose a whole number from 0 to 100.");
      return;
    }
    if (
      commit({ ...data, settings: { ...data.settings, newCardsPerDay: limit } })
    ) {
      resetSession();
      notify("Daily limit saved.");
    }
  }
  if (e.target.id === "difficulty") {
    difficulty = e.target.value;
    document.querySelector("#question-list").innerHTML = questionRows();
  }
  if (e.target.id === "question-select") {
    selected = e.target.value;
    render();
  }
  if (e.target.id === "import-file") {
    const file = e.target.files[0];
    if (!file) return;
    try {
      if (file.size > 20 * 1024 * 1024)
        throw new Error("Backup is too large (maximum 20 MB).");
      const incoming = validateData(JSON.parse(await file.text()));
      confirmAction(
        "Restore this backup?",
        `Replace current data with ${incoming.questions.length} questions and ${incoming.cards.length} cards? Export your current data first if needed.`,
        () => {
          try {
            if (cloudUser) {
              cloud.store.save(incoming);
            } else {
              saveData(localStorage, incoming);
            }
            data = incoming;
            blocked = false;
            selected = data.questions[0]?.id;
            resetSession();
            notify("Backup restored.");
          } catch {
            notify("Restore failed. Existing data is unchanged.");
            return false;
          }
        },
        "Replace & restore",
      );
    } catch (error) {
      notify(
        error instanceof SyntaxError
          ? "This file is not valid JSON. No data was changed."
          : error.message,
      );
    } finally {
      e.target.value = "";
    }
  }
});
document.addEventListener("keydown", (e) => {
  if (
    modal.open ||
    screen !== "review" ||
    /INPUT|TEXTAREA|SELECT|BUTTON|A/.test(e.target.tagName) ||
    e.ctrlKey ||
    e.altKey ||
    e.metaKey
  )
    return;
  if (e.code === "Space" && activeCard()) {
    e.preventDefault();
    revealed = !revealed;
    render();
  }
  if (revealed && ["1", "2", "3", "4"].includes(e.key))
    rate(RATINGS[Number(e.key) - 1]);
});
window.addEventListener("storage", (e) => {
  if (cloudUser || e.key !== STORAGE_KEY) return;
  try {
    if (!e.newValue) throw new Error();
    data = validateData(JSON.parse(e.newValue));
    blocked = false;
    resetSession();
    render();
    notify("Updated from another tab.");
  } catch {
    blocked = true;
    render();
    notify(
      "Stored data changed unexpectedly. Restore a valid backup before editing.",
    );
  }
});
render();
cloud = createCloud({
  pack: packData,
  unpack: unpackData,
  onUser(user) {
    cloudUser = user;
    ++boardRequest;
    board = { rows: [], profile: null, loading: false, error: false };
    if (user) {
      data = { version: 1, questions: [], cards: [], history: [] };
      blocked = true;
    } else {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        data = raw ? validateData(JSON.parse(raw)) : seedData();
        blocked = false;
      } catch {
        data = { version: 1, questions: [], cards: [], history: [] };
        blocked = true;
      }
    }
    selected = data.questions[0]?.id;
    resetSession();
    render();
  },
  onData(next) {
    data = next;
    blocked = false;
    selected = data.questions[0]?.id;
    resetSession();
    render();
  },
  onStatus(status, message) {
    cloudStatus = status;
    cloudMessage = message;
    render();
    if (screen === "leaderboard" && status === "saved") void loadLeaderboard();
  },
});
window.addEventListener("online", () => void cloud?.store.sync());
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") void cloud?.store.sync();
});

export const STORAGE_KEY = "recallcode.v1";
export const DAY = 86400000;
export const TYPES = [
  "Pattern recognition",
  "Key insight",
  "Algorithm steps",
  "Complexity",
  "Edge case",
  "Code recall",
];
export const RATINGS = ["Again", "Hard", "Good", "Easy"];
export const id = () => crypto.randomUUID();
export function newCard(
  questionId,
  front,
  back,
  type = "Key insight",
  now = Date.now(),
) {
  return {
    id: id(),
    questionId,
    front,
    back,
    type,
    due: now,
    interval: 0,
    ease: 2.5,
    reviews: 0,
    lapses: 0,
    suspended: false,
  };
}
// Transparent, deterministic SM-2-inspired scheduler. Not FSRS or Anki-compatible.
export function schedule(card, rating, now = Date.now()) {
  if (!RATINGS.includes(rating)) throw new Error("Unknown review rating");
  let interval = card.interval,
    ease = card.ease,
    delay;
  if (rating === "Again") {
    interval = 0;
    ease = Math.max(1.3, ease - 0.2);
    delay = 60000;
  }
  if (rating === "Hard") {
    interval = interval < 1 ? 1 : Math.max(1, Math.round(interval * 1.2));
    ease = Math.max(1.3, ease - 0.15);
  }
  if (rating === "Good")
    interval =
      interval < 1 ? 1 : Math.max(interval + 1, Math.round(interval * ease));
  if (rating === "Easy") {
    interval =
      interval < 1
        ? 4
        : Math.max(interval + 1, Math.round(interval * ease * 1.3));
    ease = Math.min(3.5, ease + 0.15);
  }
  return {
    ...card,
    interval,
    ease,
    due: now + (delay ?? interval * DAY),
    reviews: card.reviews + 1,
    lapses: card.lapses + (rating === "Again" ? 1 : 0),
  };
}
export function dueCards(data, now = Date.now()) {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const firstReview = new Map();
  for (const event of data.history)
    firstReview.set(
      event.cardId,
      Math.min(firstReview.get(event.cardId) ?? Infinity, event.at),
    );
  const introducedToday = [...firstReview.values()].filter(
    (at) => at >= today.getTime(),
  ).length;
  let newBudget = Math.max(
    0,
    (data.settings?.newCardsPerDay ?? 10) - introducedToday,
  );
  // Interleave question siblings where possible; each card retains its own schedule.
  const pending = data.cards
    .filter((c) => !c.suspended && c.due <= now)
    .sort((a, b) => (b.reviews > 0) - (a.reviews > 0) || a.due - b.due)
    .filter((c) => c.reviews > 0 || newBudget-- > 0);
  const result = [];
  let last;
  while (pending.length) {
    let i = pending.findIndex((c) => c.questionId !== last);
    if (i < 0) i = 0;
    const [card] = pending.splice(i, 1);
    result.push(card);
    last = card.questionId;
  }
  return result;
}
export function removeQuestion(data, questionId) {
  const ids = new Set(
    data.cards.filter((c) => c.questionId === questionId).map((c) => c.id),
  );
  return {
    ...data,
    questions: data.questions.filter((q) => q.id !== questionId),
    cards: data.cards.filter((c) => !ids.has(c.id)),
    history: data.history.filter((r) => !ids.has(r.cardId)),
  };
}
export function validateData(data) {
  const fail = () => {
    throw new Error(
      "Invalid backup. Expected a RecallCode v1 export with valid questions, cards, and review history.",
    );
  };
  const text = (s, max = 100000) => typeof s === "string" && s.length <= max;
  const num = (n) => typeof n === "number" && Number.isFinite(n) && n >= 0;
  if (
    !data ||
    data.version !== 1 ||
    !Array.isArray(data.questions) ||
    !Array.isArray(data.cards) ||
    !Array.isArray(data.history)
  )
    fail();
  if (
    data.questions.length > 10000 ||
    data.cards.length > 100000 ||
    data.history.length > 200000
  )
    fail();
  if (
    data.settings &&
    (!Number.isInteger(data.settings.newCardsPerDay) ||
      data.settings.newCardsPerDay < 0 ||
      data.settings.newCardsPerDay > 100)
  )
    fail();
  const qids = new Set(),
    cids = new Set();
  for (const q of data.questions) {
    if (
      !q ||
      !text(q.id, 100) ||
      !q.id ||
      qids.has(q.id) ||
      !text(q.title, 200) ||
      !q.title.trim() ||
      !["Easy", "Medium", "Hard"].includes(q.difficulty) ||
      !text(q.url, 2000) ||
      !text(q.tags, 500) ||
      !text(q.context) ||
      !text(q.notes) ||
      !text(q.solution) ||
      !text(q.code) ||
      !text(q.language, 30)
    )
      fail();
    if (q.url) {
      try {
        if (!["http:", "https:"].includes(new URL(q.url).protocol)) fail();
      } catch {
        fail();
      }
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(q.id)) fail();
    if (
      q.catalogId !== undefined &&
      (!text(q.catalogId, 100) || !/^lc-\d+$/.test(q.catalogId))
    )
      fail();
    qids.add(q.id);
  }
  for (const c of data.cards) {
    if (
      !c ||
      !text(c.id, 100) ||
      !c.id ||
      cids.has(c.id) ||
      !qids.has(c.questionId) ||
      !text(c.front) ||
      !c.front.trim() ||
      !text(c.back) ||
      !c.back.trim() ||
      !TYPES.includes(c.type) ||
      !num(c.due) ||
      c.due > 8640000000000000 ||
      !num(c.interval) ||
      !num(c.ease) ||
      c.ease < 1.3 ||
      c.ease > 3.5 ||
      !Number.isInteger(c.reviews) ||
      c.reviews < 0 ||
      !Number.isInteger(c.lapses) ||
      c.lapses < 0 ||
      typeof c.suspended !== "boolean"
    )
      fail();
    if (!/^[a-zA-Z0-9_-]+$/.test(c.id)) fail();
    if (
      c.catalogCard !== undefined &&
      (!text(c.catalogCard, 100) || !/^lc-\d+:\d+$/.test(c.catalogCard))
    )
      fail();
    cids.add(c.id);
  }
  for (const r of data.history)
    if (
      !r ||
      !cids.has(r.cardId) ||
      !RATINGS.includes(r.rating) ||
      !num(r.at) ||
      r.at > 8640000000000000
    )
      fail();
  return data;
}
export function saveData(storage, data) {
  validateData(data);
  storage.setItem(STORAGE_KEY, JSON.stringify(data));
}

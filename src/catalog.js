import catalogData from "./catalog-data.js";
import { newCard, validateData } from "./model.js";
export const CATALOG_VERSION = "2026-10-20";
export const catalog = catalogData;
export const catalogById = new Map(catalog.map((q) => [q.id, q]));
export function catalogQuestion(entry) {
  return {
    id: entry.id,
    catalogId: entry.id,
    catalogVersion: CATALOG_VERSION,
    title: entry.title,
    difficulty: entry.difficulty,
    tags: entry.tags,
    url: `https://leetcode.com/problems/${entry.slug}/`,
    language: "Java",
    context: `${entry.context}\n\nWorked example\n${entry.examples}`,
    notes: "",
    solution: `${entry.solution}\n\nTime: ${entry.timeComplexity}\nSpace: ${entry.spaceComplexity}\n\nCommon mistake\n${entry.pitfall}\n\nInterview follow-up\n${entry.followUp}`,
    code: entry.code,
  };
}
export function enrolledQuestion(data, entry) {
  return data.questions.find(
    (q) =>
      q.catalogId === entry.id ||
      q.id === entry.id ||
      q.url?.replace(/\/$/, "") ===
        `https://leetcode.com/problems/${entry.slug}`,
  );
}
export function enrollQuestion(data, catalogId, now = Date.now()) {
  const entry = catalogById.get(catalogId);
  if (!entry) throw new Error("Question not found.");
  if (enrolledQuestion(data, entry)) return data;
  const cards = entry.cards.map((c, i) => ({
    ...newCard(entry.id, c.front, c.back, c.type, now),
    id: `${entry.id}-card-${i}`,
    catalogCard: `${entry.id}:${i}`,
  }));
  return {
    ...data,
    questions: [...data.questions, catalogQuestion(entry)],
    cards: [...data.cards, ...cards],
  };
}
// Store references to unchanged curriculum content; preserve every personal override.
export function packData(data) {
  const questions = data.questions.map((q) => {
    const entry = catalogById.get(q.catalogId);
    if (!entry) return q;
    const base = catalogQuestion(entry),
      changes = {};
    for (const [key, value] of Object.entries(q))
      if (JSON.stringify(value) !== JSON.stringify(base[key]))
        changes[key] = value;
    return { $catalog: q.catalogId, ...changes };
  });
  const cards = data.cards.map((c) => {
    const [questionId, index] = c.catalogCard?.split(":") || [],
      base = catalogById.get(questionId)?.cards[Number(index)];
    if (!base) return c;
    const compact = { ...c };
    for (const key of ["front", "back", "type"])
      if (compact[key] === base[key]) delete compact[key];
    return compact;
  });
  return {
    ...data,
    questions,
    cards,
    format: "catalog-snapshot-v1",
    catalogVersion: CATALOG_VERSION,
  };
}
export function unpackData(snapshot) {
  if (snapshot.format !== "catalog-snapshot-v1") return validateData(snapshot);
  if (snapshot.catalogVersion !== CATALOG_VERSION)
    throw new Error("Refresh the app to load this curriculum version.");
  const questions = snapshot.questions.map((q) => {
    if (!q.$catalog) return q;
    const entry = catalogById.get(q.$catalog);
    if (!entry) throw new Error("Unknown catalog reference.");
    const { $catalog, ...changes } = q;
    return { ...catalogQuestion(entry), ...changes };
  });
  const cards = snapshot.cards.map((c) => {
    if (!c.catalogCard) return c;
    const [questionId, index] = c.catalogCard.split(":"),
      base = catalogById.get(questionId)?.cards[Number(index)];
    if (!base) throw new Error("Unknown catalog card.");
    return { ...base, ...c };
  });
  return validateData({ ...snapshot, questions, cards });
}

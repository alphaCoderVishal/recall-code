export function latestRatings(data) {
  const latest = new Map();
  for (const event of data.history) {
    const old = latest.get(event.cardId);
    if (!old || event.at >= old.at) latest.set(event.cardId, event);
  }
  return latest;
}
export function questionProgress(
  data,
  questionId,
  latest = latestRatings(data),
) {
  const cards = data.cards.filter(
    (c) => c.questionId === questionId && !c.suspended,
  );
  const reviewed = cards.filter((c) => c.reviews > 0).length;
  const retry = cards.some((c) => latest.get(c.id)?.rating === "Again");
  const strong = cards.filter((c) =>
    ["Good", "Easy"].includes(latest.get(c.id)?.rating),
  ).length;
  const state = !cards.length
    ? "paused"
    : retry
      ? "retry"
      : strong === cards.length
        ? "strong"
        : reviewed
          ? "learning"
          : "new";
  return {
    state,
    reviewed,
    strong,
    total: cards.length,
    label: {
      paused: "No active cards",
      retry: "Needs another try",
      strong: "Strong recall",
      learning: "In progress",
      new: "Not reviewed",
    }[state],
  };
}
export function progressSummary(data, now = Date.now()) {
  const latest = latestRatings(data),
    start = new Date(now);
  start.setHours(0, 0, 0, 0);
  return {
    total: data.cards.length,
    reviewed: data.cards.filter((c) => c.reviews > 0).length,
    strong: data.cards.filter((c) =>
      ["Good", "Easy"].includes(latest.get(c.id)?.rating),
    ).length,
    retry: data.cards.filter((c) => latest.get(c.id)?.rating === "Again")
      .length,
    attempts: data.history.length,
    today: data.history.filter((e) => e.at >= start.getTime() && e.at <= now)
      .length,
    questions: data.questions.map((q) => ({
      ...q,
      ...questionProgress(data, q.id, latest),
    })),
  };
}

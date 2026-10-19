const KEY = "recallcode.feedback.v1";
export function readFeedback(storage = localStorage) {
  try {
    const p = JSON.parse(storage.getItem(KEY));
    return {
      sound: p?.sound === true,
      volume: Number.isFinite(p?.volume)
        ? Math.max(0, Math.min(1, p.volume))
        : 0.3,
    };
  } catch {
    return { sound: false, volume: 0.3 };
  }
}
export function saveFeedback(p, storage = localStorage) {
  storage.setItem(KEY, JSON.stringify(p));
}
let context;
export async function playFeedback(kind, preferences) {
  if (!preferences.sound || preferences.volume === 0) return false;
  try {
    const Audio = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!Audio) return false;
    context ??= new Audio();
    if (context.state === "suspended") await context.resume();
    const notes =
      kind === "again"
        ? [330, 262]
        : kind === "hard"
          ? [392, 440]
          : [523, 659, 784];
    const start = context.currentTime;
    notes.forEach((frequency, i) => {
      const oscillator = context.createOscillator(),
        gain = context.createGain(),
        at = start + i * 0.1;
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, at);
      gain.gain.linearRampToValueAtTime(preferences.volume * 0.16, at + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.18);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(at);
      oscillator.stop(at + 0.2);
      oscillator.onended = () => {
        oscillator.disconnect();
        gain.disconnect();
      };
    });
    return true;
  } catch {
    return false;
  }
}
export const feedbackMessage = (rating) =>
  rating === "Again"
    ? "Keep going—this idea will come back for another try."
    : rating === "Hard"
      ? "Good effort. A shorter review interval will help."
      : "Nice recall! Your progress is saved.";

import test from "node:test";
import assert from "node:assert/strict";
import { labs, renderLesson } from "../src/learning.js";
import { readCatalog } from "../scripts/catalog.mjs";

test("all 250 guides include their own example, reasoning, complexity and safe markup", async () => {
  const catalog = await readCatalog();
  assert.equal(catalog.length, 250);
  for (const q of catalog) {
    const html = renderLesson(q);
    assert.ok(html.includes("Concrete example"));
    assert.ok(html.includes("Where this idea is useful"));
    assert.ok(html.includes("Walk through this solution"));
    assert.ok(html.includes("Extra space"));
    assert.ok(q.examples.length > 0);
  }
  const html = renderLesson({
    ...catalog[0],
    context: "<img src=x onerror=alert(1)>",
  });
  assert.ok(!html.includes("<img"));
  assert.ok(html.includes("&lt;img"));
});
test("interactive traces reach expected results and do not mutate examples", () => {
  const results = {
    "lc-1": ["return [0, 2]", "return [0, 1]", "return [0, 2]"],
    "lc-42": ["answer = 7", "answer = 0", "answer = 2"],
    "lc-20": ["return true", "return false", "return false"],
    "lc-704": ["mid = 4", "left = 2, right = 1"],
    "lc-121": ["best profit = 5", "best profit = 0"],
    "lc-70": ["answer = 5", "answer = 13", "answer = 1"],
    "lc-206": ["3 → 2 → 1 → null", "7 → null", "8 → 6 → 4 → 2 → null"],
    "lc-200": ["answer = 3", "answer = 1"],
    "lc-3": ["best length = 3", "best length = 1", "best length = 2"],
    "lc-53": ["best overall = 6", "best overall = -1"],
    "lc-322": ["answer = 2", "answer = -1"],
    "lc-56": ["[[1,6],[8,10],[15,18]]", "[[1,5]]"],
  };
  for (const [id, lab] of Object.entries(labs))
    for (const [i, c] of lab.cases.entries()) {
      const before = JSON.stringify(c),
        frames = lab.trace(c);
      assert.ok(
        frames.at(-1).state.includes(results[id][i]),
        id + " " + i + " " + frames.at(-1).state,
      );
      assert.equal(JSON.stringify(c), before);
      for (const f of frames) {
        assert.ok(f.explanation);
        assert.ok(f.active.every((n) => n >= 0 && n < f.cells.length));
      }
    }
});

import { existsSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";
export async function readCatalog() {
  const questions = [];
  for (const name of ["arrays", "structures", "graph-dp"]) {
    if (!existsSync(new URL(`../src/catalog/${name}.js`, import.meta.url)))
      continue;
    questions.push(...(await import(`../src/catalog/${name}.js`)).default);
  }
  return questions;
}
export async function buildCatalog({ allowPartial = false } = {}) {
  const questions = await readCatalog();
  if (!allowPartial && questions.length !== 250)
    throw new Error(`Expected 250 questions, found ${questions.length}`);
  if (new Set(questions.map((q) => q.id)).size !== questions.length)
    throw new Error("Duplicate catalog ID");
  const publicQuestions = questions.map(
    ({ testCode, ...question }) => question,
  );
  await mkdir("src", { recursive: true });
  await writeFile(
    "src/catalog-data.js",
    `// Generated from the researched catalog. Do not edit.\nexport default ${JSON.stringify(publicQuestions)};\n`,
  );
  return questions;
}

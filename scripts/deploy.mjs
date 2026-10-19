import { spawnSync } from "node:child_process";
const result = spawnSync(process.execPath, ["scripts/build.mjs"], {
  stdio: "inherit",
  env: { ...process.env, REQUIRE_CLOUD: "1" },
});
if (result.status !== 0) process.exit(result.status || 1);
const deploy = spawnSync(
  process.execPath,
  [
    "node_modules/wrangler/bin/wrangler.js",
    "pages",
    "deploy",
    "dist",
    "--project-name",
    "recall-code",
    "--branch",
    "main",
  ],
  { stdio: "inherit" },
);
process.exit(deploy.status || 0);

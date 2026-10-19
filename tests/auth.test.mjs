import test from "node:test";
import assert from "node:assert/strict";
import { oauthOptions, signInButtons } from "../src/auth-options.js";

test("Google OAuth uses identity scopes and account selection, GitHub preserves its scopes", () => {
  const redirect = "https://recall-code.pages.dev/";
  assert.deepEqual(oauthOptions("google", redirect), {
    provider: "google",
    options: {
      redirectTo: redirect,
      scopes: "openid email profile",
      queryParams: { prompt: "select_account" },
    },
  });
  assert.equal(
    oauthOptions("github", redirect).options.scopes,
    "read:user user:email",
  );
  assert.throws(() => oauthOptions("untrusted", redirect), /Unsupported/);
  assert.ok(signInButtons().includes('data-value="google"'));
  assert.ok(signInButtons().includes('data-value="github"'));
});

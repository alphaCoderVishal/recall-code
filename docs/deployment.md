# Cloudflare Pages + Supabase Free

For architecture diagrams, the reminder Worker/D1 deployment runbook, configuration details and troubleshooting, see the [system and codebase guide](system-guide.md).

## Database and login

1. Create a Supabase Free project near your users.
2. Run `supabase/migrations/202610200001_study_sync.sql` once in its SQL editor. This creates the owner-protected table and revision-checked RPC.
3. Create a GitHub OAuth application for RecallCode. Its callback is `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`. Put its client ID and secret only in Supabase Authentication > Providers > GitHub and enable that provider.
4. Set Supabase Authentication > URL Configuration > Site URL to the production Pages URL. Add that exact URL as an allowed redirect. Add localhost only if needed for local testing.
5. Put the project URL and publishable key in `.env` (ignored by Git) using `.env.example`. No database password or secret/service-role key goes in the build.

GitHub OAuth is the default. Optional `AUTH_MODE=email` adds email/password, but public email delivery requires configured SMTP; Supabase's built-in sender is restricted to team addresses.

## Google / Gmail sign-in

The app offers **Sign in with Google** alongside GitHub. Google sign-in uses only `openid email profile` identity scopes, not access to Gmail messages. Both providers use the same Supabase account storage and PKCE flow.

1. In a Google Cloud project you control, configure the Google Auth Platform branding/audience and create an OAuth client of type **Web application**.
2. Add the JavaScript origin `https://recall-code.pages.dev` and authorized redirect URI `https://iqmndsdtwcuhycwxyvpg.supabase.co/auth/v1/callback` (substitute the project reference for another environment).
3. Enter that client's ID and secret in Supabase Authentication > Sign In / Providers > Google, enable the provider, and save. Keep nonce verification enabled. These are OAuth credentials, not your Google email/password; do not put them in `.env`, GitHub or the browser bundle.
4. Keep the production app URL in Supabase's allowed redirects. If Google's audience is in testing mode, configure the intended test accounts; follow Google's publishing requirements before public launch.
5. Test the live Google button, account selection, redirect back, synced account status and reload. A deployed button does not mean the provider is activated. Guest practice remains separate and can be imported explicitly after login.

Official setup reference: [Supabase Google sign-in](https://supabase.com/docs/guides/auth/social-login/auth-google). Account identity/linking follows Supabase configuration; do not assume switching providers with different emails shares progress.

## Static deployment

Run `npm ci`, `npm test`, `npm run test:java`, `npm run build`, then browser checks. Create a Cloudflare Pages Direct Upload project named `recall-code` and upload only `dist/` (or a ZIP of its contents). Alternatively, authenticate Wrangler and run `npm run deploy`; that command refuses to deploy an unconfigured login build.

For deployment through GitHub Actions, configure the repository's manually dispatched Pages workflow with `CLOUDFLARE_API_TOKEN` (Pages edit for the deployment account) as a secret and `CLOUDFLARE_ACCOUNT_ID`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `REMINDERS_URL` as variables. Merging a PR does not automatically deploy. Tokens are not required in the shipped app. Direct Upload projects are deployed through upload/CLI rather than Git integration. The reminder Worker and D1 schema are deployed separately.

## Verify production

- HTTPS loads and Explore 250 lists the catalog.
- GitHub login redirects back to the same production origin.
- Enroll a question, rate a card, and reload; status becomes Synced.
- Sign out: guest practice is separate. Sign in again: account progress returns.
- A second browser/device restores account progress.
- Anonymous REST requests cannot read/write the study table. Cross-account tests must not see another user's row.
- Conflicting offline edits require a choice instead of silently overwriting progress.

Only static content is public. Never upload `.env`, `node_modules`, source credentials, or database backups to Pages.

## Cost boundaries

[Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/) and [Supabase pricing](https://supabase.com/pricing) are authoritative. The initial architecture fits free plans, but quotas and inactivity pausing apply. A custom domain is optional and may cost extra. No paid code-execution service or SMTP is needed for GitHub login.

Official references: [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [GitHub login](https://supabase.com/docs/guides/auth/social-login/auth-github), [email sender limits](https://supabase.com/docs/guides/auth/auth-smtp), [redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls), [Pages direct upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).

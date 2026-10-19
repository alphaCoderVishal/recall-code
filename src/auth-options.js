export function oauthOptions(provider, redirectTo) {
  if (!["github", "google"].includes(provider))
    throw new Error("Unsupported sign-in provider.");
  return {
    provider,
    options: {
      redirectTo,
      ...(provider === "github"
        ? { scopes: "read:user user:email" }
        : {
            scopes: "openid email profile",
            queryParams: { prompt: "select_account" },
          }),
    },
  };
}

export function signInButtons() {
  return '<div class="actions"><button class="primary" data-action="login" data-value="google">Sign in with Google</button><button data-action="login" data-value="github">Sign in with GitHub</button></div>';
}

import { createClient } from "@supabase/supabase-js";
import { SyncStore } from "./sync-store.js";
import { validateData } from "./model.js";
import { oauthOptions } from "./auth-options.js";

const url = typeof __SUPABASE_URL__ === "undefined" ? "" : __SUPABASE_URL__;
const key = typeof __SUPABASE_KEY__ === "undefined" ? "" : __SUPABASE_KEY__;
export const cloudConfigured = Boolean(url && key);
export const cloudAuthMode =
  typeof __AUTH_MODE__ === "undefined" ? "github" : __AUTH_MODE__;
export function createCloud({ onData, onStatus, onUser, pack, unpack }) {
  if (!cloudConfigured) return null;
  const client = createClient(url, key, {
    auth: {
      flowType: "pkce",
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  const store = new SyncStore({
    storage: localStorage,
    validate: validateData,
    pack,
    unpack,
    onData,
    onStatus,
    remote: {
      async read(userId) {
        const { data, error } = await client
          .from("study_snapshots")
          .select("document,revision")
          .eq("user_id", userId)
          .maybeSingle();
        if (error) throw error;
        return data;
      },
      async write(_userId, document, revision) {
        const { data, error } = await client.rpc("save_study_snapshot", {
          p_document: document,
          p_expected_revision: revision,
        });
        if (error) throw error;
        return data;
      },
    },
  });
  let currentId;
  client.auth.onAuthStateChange((event, session) => {
    // SDK callbacks must stay synchronous; do not call Supabase APIs under its auth lock.
    if ((session?.user.id ?? null) === currentId) return;
    currentId = session?.user.id ?? null;
    queueMicrotask(() => {
      onUser(session?.user ?? null);
      if (session?.user)
        void store
          .connect(session.user.id, {
            version: 1,
            questions: [],
            cards: [],
            history: [],
            settings: { newCardsPerDay: 10 },
          })
          .catch(() => onStatus("error", "Unable to read account storage."));
      else store.disconnect();
    });
  });
  return {
    store,
    client,
    async login(provider = "github") {
      const { error } = await client.auth.signInWithOAuth(
        oauthOptions(provider, location.origin + location.pathname),
      );
      if (error) throw error;
    },
    async signout() {
      const { error } = await client.auth.signOut({ scope: "local" });
      if (error) throw error;
    },
    async password(email, password, signup = false) {
      const result = signup
        ? await client.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: location.origin + location.pathname },
          })
        : await client.auth.signInWithPassword({ email, password });
      if (result.error) throw result.error;
      return result;
    },
  };
}

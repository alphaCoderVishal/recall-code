// Account-scoped snapshots with optimistic concurrency. Never silently overwrite another device.
export class SyncStore {
  constructor({
    storage,
    remote,
    validate,
    pack = (x) => x,
    unpack = (x) => x,
    onData = () => {},
    onStatus = () => {},
  }) {
    Object.assign(this, {
      storage,
      remote,
      validate,
      pack,
      unpack,
      onData,
      onStatus,
    });
    this.userId = null;
    this.epoch = 0;
    this.envelope = null;
    this.running = null;
    this.status = "signedout";
  }
  key() {
    return `recallcode.account.${this.userId}`;
  }
  setStatus(status, message = "") {
    this.status = status;
    this.onStatus(status, message);
  }
  persist() {
    this.storage.setItem(this.key(), JSON.stringify(this.envelope));
  }
  async connect(userId, initial) {
    const epoch = ++this.epoch;
    this.userId = userId;
    this.running = null;
    const raw = this.storage.getItem(this.key());
    try {
      this.envelope = raw
        ? JSON.parse(raw)
        : { revision: 0, dirty: false, data: initial };
      this.validate(this.envelope.data);
      if (
        !Number.isInteger(this.envelope.revision) ||
        this.envelope.revision < 0 ||
        typeof this.envelope.dirty !== "boolean"
      )
        throw new Error();
    } catch {
      this.envelope = null;
      this.setStatus(
        "error",
        "Account cache is invalid. Export it before recovery.",
      );
      return;
    }
    this.onData(this.envelope.data, "account");
    await this.sync(epoch);
  }
  disconnect() {
    ++this.epoch;
    this.userId = null;
    this.envelope = null;
    this.running = null;
    this.setStatus("signedout");
  }
  save(data) {
    this.validate(data);
    if (!this.userId || !this.envelope || this.status === "error")
      throw new Error("Account storage is unavailable.");
    const next = { ...this.envelope, data, dirty: true };
    this.storage.setItem(this.key(), JSON.stringify(next));
    this.envelope = next;
    if (this.status !== "conflict") void this.sync();
  }
  async sync(epoch = this.epoch) {
    if (!this.userId || !this.envelope || this.status === "conflict") return;
    if (this.running) return this.running;
    const task = this.performSync(epoch);
    this.running = task;
    try {
      await task;
    } finally {
      if (epoch === this.epoch) this.running = null;
    }
  }
  async performSync(epoch) {
    const userId = this.userId;
    this.setStatus("syncing");
    try {
      const remote = await this.remote.read(userId);
      if (epoch !== this.epoch) return;
      const remoteRevision = remote?.revision ?? 0;
      if (this.envelope.dirty && remoteRevision !== this.envelope.revision) {
        this.setStatus(
          "conflict",
          "Another device has changed your progress. Choose which copy to keep.",
        );
        return;
      }
      if (!this.envelope.dirty && remote) {
        const restored = this.validate(this.unpack(remote.document));
        this.envelope = {
          revision: remoteRevision,
          dirty: false,
          data: restored,
        };
        this.persist();
        this.onData(restored, "remote");
      }
      if (!remote && !this.envelope.dirty) {
        this.envelope.dirty = true;
        this.persist();
      }
      while (this.envelope.dirty && epoch === this.epoch) {
        const snapshot = this.envelope.data;
        const revision = await this.remote.write(
          userId,
          this.pack(snapshot),
          this.envelope.revision,
        );
        if (epoch !== this.epoch) return;
        const changedDuringSave = snapshot !== this.envelope.data;
        this.envelope = {
          ...this.envelope,
          revision,
          dirty: changedDuringSave,
        };
        this.persist();
      }
      if (epoch === this.epoch) this.setStatus("saved");
    } catch (error) {
      if (epoch !== this.epoch) return;
      this.setStatus(
        error.code === "40001" ? "conflict" : "offline",
        error.code === "40001"
          ? "Another device saved first. Resolve the conflict before uploading."
          : "Cloud sync is unavailable. Changes remain saved on this device.",
      );
    }
  }
  async resolve(choice) {
    if (!["local", "remote"].includes(choice))
      throw new Error("Invalid conflict resolution");
    const epoch = this.epoch;
    const remote = await this.remote.read(this.userId);
    if (epoch !== this.epoch) return;
    // Keep a recoverable account-local copy before either direction replaces a snapshot.
    this.storage.setItem(
      `${this.key()}.recovery`,
      JSON.stringify(this.envelope),
    );
    if (choice === "remote") {
      if (!remote) throw new Error("No cloud copy is available.");
      this.envelope = {
        revision: remote.revision,
        dirty: false,
        data: this.validate(this.unpack(remote.document)),
      };
      this.persist();
      this.onData(this.envelope.data, "remote");
      this.setStatus("saved");
    } else {
      this.envelope = {
        ...this.envelope,
        revision: remote?.revision ?? 0,
        dirty: true,
      };
      this.persist();
      this.setStatus("offline");
      await this.sync();
    }
  }
}

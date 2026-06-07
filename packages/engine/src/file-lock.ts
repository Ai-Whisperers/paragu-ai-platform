export const fileLock = {
  busy: false,
  queue: [] as Array<() => Promise<void>>,
  async run(task: () => Promise<void>) {
    if (!this.busy) {
      this.busy = true
      await task()
      this.busy = false
      this.runNext()
      return
    }
    this.queue.push(task)
  },
  async runNext() {
    if (this.busy || this.queue.length === 0) return
    const next = this.queue.shift()!
    this.busy = true
    await next()
    this.busy = false
    this.runNext()
  },
}

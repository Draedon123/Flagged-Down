type LoopSettings = {
  deltaTime_ms: number;
};

type LoopCallback = () => unknown;

class Loop {
  public deltaTime_ms: number;
  private nextFrame: number;
  private handle: NodeJS.Timeout | null;
  private readonly callbacks: LoopCallback[];

  constructor(settings: Partial<LoopSettings> = {}) {
    this.callbacks = [];
    this.deltaTime_ms = settings.deltaTime_ms ?? 1000 / 60;
    this.nextFrame = 0;
    this.handle = null;
  }

  public addCallback(callback: LoopCallback): void {
    this.callbacks.push(callback);
  }

  public start(immediateTick: boolean = true): void {
    if (this.handle !== null) {
      this.stop();
    }

    if (immediateTick) {
      this.nextFrame = performance.now();
      this.tick();
    } else {
      this.nextFrame = performance.now() + this.deltaTime_ms;
      this.handle = setTimeout(this.tick.bind(this), this.deltaTime_ms);
    }
  }

  private tick(): void {
    const now = performance.now();
    const drift = now - this.nextFrame;
    if (drift > this.deltaTime_ms) {
      this.nextFrame = now;
    }

    this.nextFrame += this.deltaTime_ms;

    for (const callback of this.callbacks) {
      callback();
    }

    this.handle = setTimeout(
      this.tick.bind(this),
      Math.max(0, this.deltaTime_ms - drift)
    );
  }

  public stop(): void {
    if (this.handle === null) {
      return;
    }

    clearTimeout(this.handle);
    this.handle = null;
  }

  public get running(): boolean {
    return this.handle !== null;
  }
}

export { Loop };
export type { LoopSettings };

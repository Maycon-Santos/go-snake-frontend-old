import animate from 'transition-engine'

type RenderFn = (ctx: CanvasRenderingContext2D) => void
type TickFn = () => void

export class Engine {
  private $canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private gameLoop = animate({
    from: 0,
    to: 1,
    duration: 1000,
    iterationCount: Infinity,
    transition: () => this.render(),
    iterationChange: () => this.tick(),
  })

  private renderStack: RenderFn[] = []
  private tickStack: TickFn[] = []

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.$canvas = ctx.canvas
  }

  private tick(): void {
    this.tickStack.forEach((tick) => tick())
  }

  private render(): void {
    this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height)

    this.renderStack.forEach((render) => render(this.ctx))
  }

  public start(): void {
    this.gameLoop.start()
  }

  public stop(): void {
    this.gameLoop.stop()
  }

  public addRender(
    render: RenderFn,
    index: number = this.renderStack.length,
  ): void {
    this.renderStack[index] = render
  }

  public addTick(tick: TickFn, index: number = this.tickStack.length): void {
    this.tickStack[index] = tick
  }
}

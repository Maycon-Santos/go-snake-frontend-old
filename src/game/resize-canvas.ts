export function resizeCanvas(ctx: CanvasRenderingContext2D): () => void {
  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight

  return () => resizeCanvas(ctx)
}

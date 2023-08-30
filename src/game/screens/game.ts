import { Engine } from '../engine'
import type { ScreenBuilder } from '../navigation'
import { resizeCanvas } from '../resize-canvas'

export const gameScreen: ScreenBuilder = () => {
  const $canvas = document.querySelector<HTMLCanvasElement>('#game')
  if (!$canvas) {
    console.error('missing canvas game')
    return
  }

  const ctx = $canvas.getContext('2d')
  if (!ctx) {
    console.error('error when trying to get canvas context')
    return
  }

  window.addEventListener('resize', resizeCanvas(ctx))

  const gameEngine = new Engine(ctx)

  gameEngine.addRender((ctx) => {
    ctx.fillRect(20, 20, 150, 100)
  })

  gameEngine.start()

  return {
    onEnter(data): void {
      console.log(data?.roomId)
    },
  }
}

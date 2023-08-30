import animate, { easingFunctions } from 'transition-engine'
import type { ScreenBuilder } from '../navigation'

export const loadingScreen: ScreenBuilder = ($screen, navigation) => {
  const $progressBar = $screen.querySelector<HTMLProgressElement>(
    '#loading-progress-bar',
  )

  if (!$progressBar) {
    console.error('missing progress element')
    return
  }

  let progress = 0
  const startingAnimation = animate({
    from: 0,
    to: 80,
    duration: 5000,
    timingFunction: easingFunctions.easeInOutCubic,
    transition({ value }) {
      $progressBar.value = value
      progress = value
    },
  })

  startingAnimation.start()

  window.addEventListener('load', () => {
    startingAnimation.pause()

    const endAnimation = animate({
      from: progress,
      to: 100,
      duration: 1000,
      timingFunction: easingFunctions.easeInOutCubic,
      transition({ value }) {
        $progressBar.value = value
      },
      done() {
        navigation.goTo('login')
      },
    })

    endAnimation.start()
  })
}

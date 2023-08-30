type onEnterData = {
  [k: string]: unknown
}

interface ScreenEvents {
  onEnter?: (data?: onEnterData) => void
  onExit?: () => void
}

export type ScreenBuilder = (
  $screen: HTMLElement,
  navigation: Navigation,
) => ScreenEvents | void

interface ScreenInit {
  $element: HTMLElement
  builder?: ScreenBuilder
}

interface Screen extends Omit<ScreenInit, 'builder'> {
  events: ScreenEvents
}

type ScreensInit = {
  [k: string]: ScreenInit
}

type Screens = {
  [k: string]: Screen
}

export default class Navigation {
  private currentScreen: string = ''
  private screens: Screens = {}

  constructor(screens: ScreensInit) {
    for (const key in screens) {
      const screen = screens[key]

      this.screens[key] = {
        $element: screen.$element,
        events: screen.builder?.(screen.$element, this) || {},
      }
    }
  }

  public goTo(screenName: string, data?: onEnterData): void {
    if (this.screens[this.currentScreen]) {
      this.screens[this.currentScreen].events.onExit?.()
      this.screens[this.currentScreen].$element.style.display = 'none'
    }

    this.screens[screenName].$element.style.display = 'block'
    this.screens[screenName].events.onEnter?.(data)

    this.currentScreen = screenName
  }

  public back(): void {}
}

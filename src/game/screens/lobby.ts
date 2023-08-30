import type { ScreenBuilder } from '../navigation'

export const lobbyScreen: ScreenBuilder = ($screen, navigation) => {
  const $form = $screen.querySelector<HTMLFormElement>('#lobby-form')
  const $roomIdInput =
    $screen.querySelector<HTMLInputElement>('#lobby-room-input')

  if (!$form) {
    console.error('missing form element')
    return
  }

  if (!$roomIdInput) {
    console.error('missing room id input element')
    return
  }

  $form.addEventListener('submit', (e) => {
    e.preventDefault()

    navigation.goTo('game')
  })
}

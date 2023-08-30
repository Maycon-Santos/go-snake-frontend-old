import type { ScreenBuilder } from '../navigation'

export const recoverPassword: ScreenBuilder = ($screen, navigation) => {
  const $form = $screen.querySelector<HTMLFormElement>('#recover-password-form')
  const $usernameInput = $screen.querySelector<HTMLInputElement>(
    '#recover-password-username-input',
  )
  const $gotoLoginButton = $screen.querySelector<HTMLButtonElement>(
    '#recover-password-goto-login',
  )

  if (!$form) {
    console.error('missing form element')
    return
  }

  if (!$usernameInput) {
    console.error('missing username input element')
    return
  }

  $gotoLoginButton?.addEventListener('click', () => {
    navigation.goTo('login')
  })

  return {
    onEnter(data): void {
      if (typeof data?.username === 'string') {
        $usernameInput.value = data.username
      }
    },
  }
}

import api from '../api'
import { onSubmit, printFieldMessage } from '../form'
import type { ScreenBuilder } from '../navigation'

export const registerScreen: ScreenBuilder = ($screen, navigation) => {
  const $form = $screen.querySelector<HTMLFormElement>('#register-form')
  const $usernameInput = $screen.querySelector<HTMLInputElement>(
    '#register-username-input',
  )
  const $passwordInput = $screen.querySelector<HTMLInputElement>(
    '#register-password-input',
  )
  const $gotoLoginButton = $screen.querySelector<HTMLButtonElement>(
    '#register-goto-login',
  )
  const $usernameErrorMessage = $screen.querySelector<HTMLSpanElement>(
    '#register-username-error-message',
  )
  const $passwordErrorMessage = $screen.querySelector<HTMLSpanElement>(
    '#register-password-error-message',
  )
  const $submitButton =
    $screen.querySelector<HTMLButtonElement>('#register-submit')

  if (!$form) {
    console.error('missing form element')
    return
  }

  if (!$usernameInput) {
    console.error('missing username input element')
    return
  }

  if (!$passwordInput) {
    console.error('missing password input element')
    return
  }

  onSubmit($form, $submitButton, async () => {
    const username = $usernameInput.value
    const password = $passwordInput.value

    const { success, type } = await api.signUp({ username, password })

    printFieldMessage($usernameErrorMessage, type, {
      USERNAME_MISSING: 'Missing username',
      ACCOUNT_USERNAME_EXISTS: 'Username already exists',
      USERNAME_BELOW_MIN_LEN: 'Username must be more than 4 characters',
      USERNAME_ABOVE_MAX_LEN: 'Username must be less than 15 characters',
    })

    printFieldMessage($passwordErrorMessage, type, {
      PASSWORD_MISSING: 'Missing password',
      PASSWORD_BELOW_MIN_LEN: 'Password must be more than 6 characters',
      PASSWORD_ABOVE_MAX_LEN: 'Password must be less than 25 characters',
    })

    if (success) {
      navigation.goTo('lobby')
    }
  })

  $gotoLoginButton?.addEventListener('click', () => {
    navigation.goTo('login')
  })

  return {
    onExit(): void {
      $usernameInput.value = ''
      $passwordInput.value = ''
    },
  }
}

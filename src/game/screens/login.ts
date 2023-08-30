import api from '../api'
import { onSubmit, printFieldMessage } from '../form'
import type { ScreenBuilder } from '../navigation'

export const loginScreen: ScreenBuilder = ($screen, navigation) => {
  const $form = $screen.querySelector<HTMLFormElement>('#login-form')
  const $forgotPasswordLink = $screen.querySelector<HTMLAnchorElement>(
    '#login-forgot-password',
  )
  const $usernameInput = $screen.querySelector<HTMLInputElement>(
    '#login-username-input',
  )
  const $passwordInput = $screen.querySelector<HTMLInputElement>(
    '#login-password-input',
  )
  const $gotoRegisterButton = $screen.querySelector<HTMLButtonElement>(
    '#login-goto-register',
  )
  const $usernameErrorMessage = $screen.querySelector<HTMLSpanElement>(
    '#login-username-error-message',
  )
  const $passwordErrorMessage = $screen.querySelector<HTMLSpanElement>(
    '#login-password-error-message',
  )
  const $submitButton =
    $screen.querySelector<HTMLButtonElement>('#login-submit')

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

    const { success, type } = await api.signIn({ username, password })

    printFieldMessage($usernameErrorMessage, type, {
      USERNAME_MISSING: 'Missing username',
      ACCOUNT_NOT_FOUND: 'Username does not exist',
      USERNAME_INVALID_CHAR: 'Username contains invalid character',
      USERNAME_BELOW_MIN_LEN: 'Username must be more than 4 characters',
      USERNAME_ABOVE_MAX_LEN: 'Username must be less than 15 characters',
    })

    printFieldMessage($passwordErrorMessage, type, {
      PASSWORD_MISSING: 'Missing password',
      ACCOUNT_PASSWORD_WRONG: 'The password is incorrect',
      PASSWORD_BELOW_MIN_LEN: 'Password must be more than 6 characters',
      PASSWORD_ABOVE_MAX_LEN: 'Password must be less than 25 characters',
    })

    if (success) {
      navigation.goTo('lobby')
    }
  })

  $forgotPasswordLink?.addEventListener('click', (e) => {
    e.preventDefault()
    navigation.goTo('recoverPassword', { username: $usernameInput.value })
  })

  $gotoRegisterButton?.addEventListener('click', () => {
    navigation.goTo('register')
  })

  return {
    onExit(): void {
      $passwordInput.value = ''
    },
  }
}

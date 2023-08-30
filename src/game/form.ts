type Map = {
  [type: string]: string
}

export function printFieldMessage(
  $element: HTMLElement | null,
  type?: string,
  map?: Map,
): void {
  const message = type ? map?.[type] : null
  const hasMessage = typeof message === 'string'

  if ($element && hasMessage) {
    if (message) {
      $element.style.removeProperty('display')
      $element.innerText = message
    }
  }
}

export function onSubmit(
  $form: HTMLFormElement,
  $submitButton: HTMLButtonElement | null,
  callback: () => Promise<void>,
): void {
  $form.addEventListener('submit', async (e) => {
    e.preventDefault()

    document
      .querySelectorAll<HTMLElement>('.field-message')
      .forEach(($element) => {
        $element.style.display = 'none'
      })

    if ($submitButton) {
      $submitButton.classList.add('is-loading')
      $submitButton.disabled = true
    }

    await callback()

    if ($submitButton) {
      $submitButton.classList.remove('is-loading')
      $submitButton.disabled = false
    }
  })
}

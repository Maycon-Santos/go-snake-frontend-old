import Navigation from './game/navigation'
import { gameScreen } from './game/screens/game'
import { loadingScreen } from './game/screens/loading'
import { lobbyScreen } from './game/screens/lobby'
import { loginScreen } from './game/screens/login'
import { recoverPassword } from './game/screens/recover-password'
import { registerScreen } from './game/screens/register'

main()

function main(): void {
  const navigation = new Navigation({
    loading: {
      $element: document.getElementById('screen-loading') as HTMLElement,
      builder: loadingScreen,
    },
    login: {
      $element: document.getElementById('screen-login') as HTMLElement,
      builder: loginScreen,
    },
    recoverPassword: {
      $element: document.getElementById(
        'screen-recover-password',
      ) as HTMLElement,
      builder: recoverPassword,
    },
    register: {
      $element: document.getElementById('screen-register') as HTMLElement,
      builder: registerScreen,
    },
    lobby: {
      $element: document.getElementById('screen-lobby') as HTMLElement,
      builder: lobbyScreen,
    },
    game: {
      $element: document.getElementById('screen-game') as HTMLElement,
      builder: gameScreen,
    },
  })

  navigation.goTo('loading')
}

import { resetGame } from './components'
export { Game, Map, List, RenderSection, ManyMap, Link, FromInventory, AllButSelection, NextChapter } from './components'
export { startGame } from './app'
export { showNextSection, showNextChapter, updateInventory, updateStateCounter } from './actions'

window.resetGame = resetGame

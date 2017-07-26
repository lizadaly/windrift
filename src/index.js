export { Map, List, RenderSection, ManyMap, Link, FromInventory, AllButSelection, NextChapter, NestedList } from './components'
export { Game, startGame } from './app'
export { showNextSection, showNextChapter, updateInventory, updateStateCounter } from './actions'
import { resetGame } from './components'

window.resetGame = resetGame

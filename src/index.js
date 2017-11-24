export { Map, List, RenderSection, ManyMap, Link, FromInventory, AllButSelection, NextChapter, NestedList, wordFromInventory } from './components'
export { Game, startGame } from './app'
export { showNextSection, showNextChapter, updateInventory, replaceInventory, setExpansions, updateStateCounter } from './actions'
import { resetGame } from './components'

window.resetGame = resetGame

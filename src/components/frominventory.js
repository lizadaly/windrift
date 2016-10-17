const React = require('react')

import {wordFromInventory} from './util'

/* Return a word from an inventory list. By default, returns the last word. Otherwise,
return the offset word, as a zero-indexed value into the array */
const FromInventory = ({inventory, offset=-1}) => (
  <span key={inventory}>{wordFromInventory(inventory, offset)}</span>
)
FromInventory.propTypes = {
  inventory: React.PropTypes.string,
  offset: React.PropTypes.number
}

export default FromInventory

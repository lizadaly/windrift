const React = require('react')

import {wordFromInventory} from './util'

/* Return a word from an inventory list. By default, returns the last word. Otherwise,
return the offset word, as a zero-indexed value into the array.

If offset is null, returns the entire original inventory value (but still fires)
any onLoad event.

If passed an optional onLoad, run that function on the value returned from
`wordFromInventory.` This is safe to run even if inventory is undefined.
 */
const FromInventory = ({inventory, onLoad, offset=-1}) => {
  let word = wordFromInventory(inventory, offset)
  if (onLoad && word) {
    word = onLoad(word)
  }
  return <span key={inventory}>{word}</span>
}

FromInventory.propTypes = {
  inventory: React.PropTypes.string,
  offset: React.PropTypes.number,
  onLoad: React.PropTypes.func
}

export default FromInventory

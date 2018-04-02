import React from 'react'

import PropTypes from 'prop-types'
import { wordFromInventory } from './util'

/* Return a word from an inventory list. By default, returns the last word. Otherwise,
return the offset word, as a zero-indexed value into the array.

If offset is null, returns the entire original inventory value (but still fires)
any onLoad event.

If passed an optional onLoad, run that function on the value returned from
`wordFromInventory.` This is safe to run even if inventory is undefined.
 */
const FromInventory = ({ from, onLoad, offset = -1 }) => {
  let word = wordFromInventory(from, offset)
  if (onLoad && word) {
    word = onLoad(word)
  }
  return <span key={from}>{word}</span>
}

FromInventory.propTypes = {
  from: PropTypes.string,
  offset: PropTypes.number,
  onLoad: PropTypes.func,
}

export default FromInventory

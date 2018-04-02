const React = require('react')

import Link from './link'

/* A function that returns the most-significant word from a phrase,
typically in the inventory list (e.g. "a tired-looking cap"). Nothing
magic here, just returns the last word, typically the noun, unless `offset`
is deliberately set to a value.

If offset is explicitly set to `null` (versus undefined), return the
entire inventory value unmodified.

If `offset` exceeds the length of the string, the default offset value
will be used.
 */

export const wordFromInventory = (inventory, offset=-1) => {
  if (offset === null) {
    return inventory
  }
  let inv = inventory ? inventory.split(" ") : ""

  if (offset > inv.length - 1) {
    console.warn("Offset ", offset, " exceeded the length of the string ", inv)
    offset = -1
  }
  let out = offset === -1 ? inv[inv.length - 1] : inv[offset]
  return out
}


/* For a list of items, return a JSX node of markup with links and appropriate
`conjunctions, divided by `separator` */
export const iteratedList = (items, handler=null, conjunction="and", separator=", ") => {
  if (typeof items === 'string') {
    items = [items]
  }
  if (conjunction.length > 0) {
    conjunction = ' ' + conjunction + ' '
  }
  return <span>{
    [...items].map((t, i) =>
      <span key={i}>
        { items.length > 1 && i === items.length -1 ? conjunction: "" }
        <Link handler={handler} text={t}/>
        { i < items.length - 1 && items.length > 2 ? separator: "" }
      </span>
  )}
  </span>
}

const resetMessage = "Restart the story from the beginning?"

/* Reset the game and remove the local storage */
export const resetGame = (e, message=resetMessage) => {
  e.preventDefault();
  var conf = confirm(message)
  if (conf) {
      localStorage.clear();
      location.replace(window.location.href);
  }
}

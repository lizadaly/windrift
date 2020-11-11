import React from 'react'
import Link from './components/link'

/* A function that returns the most-significant word from a phrase,
typically in the inventory list (e.g. "a tired-looking cap"). Nothing
magic here, just returns the last word, typically the noun, unless `offset`
is deliberately set to a value.

If offset is explicitly set to `null` (versus undefined), return the
entire inventory value unmodified.

If `offset` exceeds the length of the string, the default offset value
will be used.
 */

export const wordFromInventory = (inventory, offset = -1) => {
    if (offset === null) {
        return inventory
    }
    const inv = inventory ? inventory.split(' ') : ''
    const out = offset === -1 ? inv[inv.length - 1] : inv[offset]
    return out
}


/* For a list of items, return a JSX node of markup with links and appropriate
`conjunctions, divided by `separator` */
export const iteratedList = (items, handler = null, conjunction = 'and', separator = ', ') => {
    if (typeof items === 'string') {
        items = [items] // eslint-disable-line no-param-reassign
    }
    if (conjunction.length > 0) {
        conjunction = ` ${conjunction} ` // eslint-disable-line no-param-reassign
    }
    return (
        <span>{
            [...items].map((t, i) =>
                (
                    <span key={t} >
                        {items.length > 1 && i === items.length - 1 ? conjunction : ''}
                        < Link handler={handler} text={t} />
                        {i < items.length - 1 && items.length > 2 ? separator : ''}
                    </span>
                ))
        }
        </span>)
}

const resetMessage = 'Restart the story from the beginning?'

/* Reset the game and remove the local storage */
export const resetGame = (e, message = resetMessage) => {
    e.preventDefault()
    const conf = window.confirm(message) // eslint-disable-line no-alert
    if (conf) {
        localStorage.clear()
        window.location.replace(window.location.href)
    }
}

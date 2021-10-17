import { Toc, TocItem } from 'core/types'
import { Selection } from 'core/reducers/inventory'

const OFFSET_DEFAULT = -1

/* A function that returns the most-significant word from a
phrase, typically an inventory selection.

Just returns the last word, typically the noun, unless `offset`
is deliberately set to a value.


If `offset` exceeds the length of the string, the default offset value
will be used.

If the English-language default value is undesirable, wrap this in a language-specific
function that overrides the default.
 */

export const wordFromInventory = (selection: Selection, offset = OFFSET_DEFAULT): Selection => {
    if (offset === null) {
        return selection
    }
    if (selection) {
        const words = selection.split(' ')
        return words.slice(offset)[0]
    }
    return null
}

export const getChapter = (toc: Toc, filename: string): TocItem =>
    Object.values(toc).filter((c) => c.filename === filename)[0]

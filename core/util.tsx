import { Toc, TocItem, Option } from 'core/types'

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

export const wordFromInventory = (option: Option, offset = OFFSET_DEFAULT): Option => {
    if (offset === null) {
        return option
    }
    if (option) {
        const words = option.split(' ')
        return words.slice(offset)[0]
    }
    return null
}

export const getChapter = (toc: Toc, filename: string): TocItem =>
    Object.values(toc).filter((c) => c.filename === filename)[0]

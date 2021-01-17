import { Toc, TocItem } from 'core/types'

/* A function that returns the most-significant word from a phrase,
typically in the inventory list (e.g. "a tired-looking cap"). Nothing
magic here, just returns the last word, typically the noun, unless `offset`
is deliberately set to a value.

If offset is explicitly set to `null` (versus undefined), return the
entire inventory value unmodified.

If `offset` exceeds the length of the string, the default offset value
will be used.
 */

export const wordFromInventory = (inventory: string, offset = -1): string => {
    if (offset === null) {
        return inventory
    }
    const inv = inventory ? inventory.split(' ') : ''
    const out = offset === -1 ? inv[inv.length - 1] : inv[offset]
    return out
}

export const getChapter = (toc: Toc, filename: string): TocItem =>
    Object.values(toc).filter((c) => c.filename === filename)[0]

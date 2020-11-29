import { Selection, Tag, UpdateInventoryTypes, UPDATE_INVENTORY } from 'core/types'

// Update the user's inventory list
// Data is a mapping of key/values based on the user selection
export const updateInventory = (tag: Tag, sel: Selection): UpdateInventoryTypes => ({
    type: UPDATE_INVENTORY,
    tag: tag,
    sel: sel,
})
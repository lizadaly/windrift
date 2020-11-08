import { Selection, Tag, UpdateInventoryTypes, UPDATE_INVENTORY } from '../types'

// Update the user's inventory list
// Data is a mapping of key/values based on the user selection
export function updateInventory(tag: Tag, sel: Selection): UpdateInventoryTypes {
    return {
        type: UPDATE_INVENTORY,
        tag: tag,
        sel: sel,
    }
}
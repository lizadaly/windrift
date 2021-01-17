import { Tag } from 'core/types'

export const UPDATE_INVENTORY = 'UPDATE_INVENTORY'
export const CLEAR_INVENTORY = 'CLEAR_INVENTORY'

export type Selection = string

export interface Inventory {
    [tag: string]: string
}

interface UpdateInventoryAction {
    type: typeof UPDATE_INVENTORY
    tag: Tag
    sel: Selection
}
export type UpdateInventoryTypes = UpdateInventoryAction

interface ClearInventoryAction {
    type: typeof CLEAR_INVENTORY
}
export type ClearInventoryTypes = ClearInventoryAction

// Update the user's inventory list
// Data is a mapping of key/values based on the user selection
export const updateInventory = (tag: Tag, sel: Selection): UpdateInventoryTypes => ({
    type: UPDATE_INVENTORY,
    tag: tag,
    sel: sel
})

export const clearInventory = (): ClearInventoryTypes => ({
    type: CLEAR_INVENTORY
})

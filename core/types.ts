export const UPDATE_INVENTORY = 'UPDATE_INVENTORY'


export type Selection = string
export type Tag = string

export interface Inventory {
    [tag: string]: string
}


interface UpdateInventoryAction {
    type: typeof UPDATE_INVENTORY
    tag: Tag,
    sel: Selection,
}
export type UpdateInventoryTypes = UpdateInventoryAction
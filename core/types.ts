export const UPDATE_INVENTORY = 'UPDATE_INVENTORY'
export const SET_EXPANSIONS = 'SET_EXPANSIONS'

/* Inventory */
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

/* Expansions */
export type Expansion = string
export type Expansions = Array<Expansion>

interface SetExpansionsAction {
    type: typeof SET_EXPANSIONS
    expansions: Expansions
}
export type SetExpansionsType = SetExpansionsAction

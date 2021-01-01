// Call this type to re-initialize the entire state history, as in a reset

export const INIT_STATE = 'INIT_STATE'

export interface InitStateType {
    type: typeof INIT_STATE

}
export const initState = (): InitStateType => ({
    type: INIT_STATE,
})

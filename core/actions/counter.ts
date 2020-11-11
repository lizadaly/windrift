import { UPDATE_STATE_COUNTER, UpdateStateCounterType } from '../types'


// Update the atomic counter for the current state change

export const updateStateCounter = (counter?: number): UpdateStateCounterType => ({
    type: UPDATE_STATE_COUNTER,
    counter,
})
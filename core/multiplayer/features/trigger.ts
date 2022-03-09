// Simple incrementing counter that is used to trigger polling changes?
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Trigger {
    counter: number
}

const initialState: Trigger = { counter: 0 }

export const instanceSlice = createSlice({
    name: 'multiplayer/trigger',
    initialState,
    reducers: {
        notify: (state) => {
            state.counter += 1
        }
    }
})
export const { notify } = instanceSlice.actions

export default instanceSlice.reducer

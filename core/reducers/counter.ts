import undoable from 'redux-undo'
import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    value: number
}

const initialState: CounterState = { value: 0 }

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        }
    }
})
export const { increment } = counterSlice.actions
export default undoable(counterSlice.reducer)

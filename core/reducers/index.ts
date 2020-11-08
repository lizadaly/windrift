import { combineReducers } from 'redux'
import inventory from './inventory'

const rootReducer = combineReducers({
    inventory,
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
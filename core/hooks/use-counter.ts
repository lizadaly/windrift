import { useSelector } from 'react-redux'

import { CounterState, RootState } from 'core/types'

/**
 * Retrieve the current value of the global turn counter.
 * (This tends not to be useful to story authors as
 * internal events may advance the counter unexpectedly.)
 * @returns the list of selected options, which may be undefined
 */
const useCounter = (): CounterState => {
    return useSelector((state: RootState) => {
        return state.counter.present
    })
}
export default useCounter

import * as React from "react"
import { useDispatch } from "react-redux"
import { initState } from 'core/actions/init'

const Reset: React.FC = () => {

    const dispatch = useDispatch()
    const resetButton = () => {
        dispatch(initState())
    }
    return <div>
        <button onClick={resetButton}>
            Reset
        </button>
    </div>
}

export default Reset
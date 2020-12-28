import { RootState } from "core/reducers"
import * as React from "react"
import { useSelector } from "react-redux"


const Log: React.FC = () => {
    const { player } = useSelector((state: RootState) =>
        state.multiplayer)
    const log = useSelector((state: RootState) =>
        state.log
    )
    return <div>
        {
            log.map((entry, i) =>
                <div key={i}>{entry.tag} {entry.selection} played by { }
                    {entry.player} on {entry.timestamp.toString()}</div>
            )
        }
    </div>
}

export default Log
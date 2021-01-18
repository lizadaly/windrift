import { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Multiplayer, initMultiplayer } from 'core/actions/multiplayer'
import { Config } from 'core/types'
import { populateMultiplayer } from 'core/multiplayer'
import { RootState } from 'core/reducers'
type Props = {
    multiplayer: Multiplayer
    config: Config
}

const JoinStory: React.FC<Props> = ({ multiplayer, config }) => {
    const [channel, setChannel] = useState('')
    const player = useSelector((state: RootState) => state.config.players[1])

    const dispatch = useDispatch()

    const handler = (e: FormEvent) => {
        if (channel.startsWith('presence-')) {
            populateMultiplayer(player.name, multiplayer, config, channel)
            dispatch(initMultiplayer(multiplayer))
        } else {
            alert("Story code names start with 'presence-")
        }
        e.preventDefault()
    }
    return (
        <>
            <form onSubmit={handler}>
                <label>
                    <input
                        type="text"
                        placeholder={'Channel name'}
                        value={channel}
                        onChange={(e) => setChannel(e.target.value)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}
export default JoinStory

import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import { populateMultiplayer } from 'core/multiplayer'
import { initMultiplayer } from 'core/actions'
import { Multiplayer, Config } from 'core/types'

type Props = {
    multiplayer: Multiplayer
    config: Config
}

const JoinStory: React.FC<Props> = ({ multiplayer, config }) => {
    const [channel, setChannel] = useState('')
    const dispatch = useDispatch()

    const handler = (e: FormEvent) => {
        if (channel.startsWith('presence-')) {
            populateMultiplayer(2, multiplayer, config, channel)
            dispatch(initMultiplayer(multiplayer))
        } else {
            alert("Multiplayer channel names start with 'presence-`")
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

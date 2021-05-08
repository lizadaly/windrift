import { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Multiplayer, initMultiplayer } from 'core/actions/multiplayer'
import { Config } from 'core/types'
import axios from 'axios'
type Props = {
    multiplayer: Multiplayer
    config: Config
}

const JoinStory: React.FC<Props> = ({ multiplayer, config }) => {
    const [instanceId, setInstanceId] = useState('')

    const dispatch = useDispatch()

    const handler = (e: FormEvent) => {
        e.preventDefault()

        axios(`/api/core/story/${config.identifier}/${instanceId}/get`, {}).then((res) => {
            const { instance, player2 } = res.data
            multiplayer.instanceId = instance.id
            multiplayer.currentPlayer = player2
            multiplayer.ready = true
            dispatch(initMultiplayer(multiplayer))
        })
    }
    return (
        <>
            <form onSubmit={handler}>
                <label>
                    <input
                        type="text"
                        placeholder={'Channel name'}
                        value={instanceId}
                        onChange={(e) => setInstanceId(e.target.value)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}
export default JoinStory

import React from 'react'

import { useRouter } from 'next/router'
import axios from 'axios'
import { Config } from 'core/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'core/reducers'
import { initMultiplayer } from 'core/actions'

const useMultiplayer = (config: Config): void => {
    const dispatch = useDispatch()
    const router = useRouter()
    const multiplayer = useSelector((state: RootState) => state.multiplayer)

    React.useEffect(() => {
        const { instance, playerId } = router.query
        if (instance && playerId) {
            axios(`/api/core/story/${config.identifier}/${instance}/get`, {}).then((res) => {
                const { instance, player1, player2 } = res.data
                multiplayer.instanceId = instance.id
                if (playerId === player1.id) {
                    multiplayer.currentPlayer = player1
                    multiplayer.otherPlayer = player2
                }
                if (playerId === player2.id) {
                    multiplayer.currentPlayer = player2
                    multiplayer.otherPlayer = player1
                }
                multiplayer.ready = true
                dispatch(initMultiplayer(multiplayer))
            })
        }
    }, [dispatch])
}
export default useMultiplayer

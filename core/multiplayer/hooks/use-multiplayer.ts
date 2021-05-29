import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { Config } from 'core/types'
import { RootState } from 'core/reducers'
import { getStoryInstance } from 'core/multiplayer/api-client'

const useMultiplayer = (config: Config): void => {
    const dispatch = useDispatch()
    const router = useRouter()
    const multiplayer = useSelector((state: RootState) => state.multiplayer)

    React.useEffect(() => {
        const { instance, playerId } = router.query

        if (instance && playerId) {
            getStoryInstance(
                config.identifier,
                instance as string,
                multiplayer,
                playerId as string,
                dispatch
            )
        }
    }, [dispatch])
}
export default useMultiplayer

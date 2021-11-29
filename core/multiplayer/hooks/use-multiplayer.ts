import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { RootState } from 'core/types'
import { getStoryInstance } from 'core/multiplayer/api-client'
import { StoryContext } from 'pages/[story]/[[...chapter]]'

const useMultiplayer = (): void => {
    const dispatch = useDispatch()
    const { config } = React.useContext(StoryContext)
    const router = useRouter()
    const { multiplayer } = useSelector((state: RootState) => state.multiplayer)

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

import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'core/reducers'
import { emitNavChange } from 'core/multiplayer/api-client'
import { usePresenceChannel } from '@harelpls/use-pusher'

const useNavEmitter = (): void => {
    const { currentPlayer, channelName } = useSelector((state: RootState) => state.multiplayer)
    usePresenceChannel(channelName)

    const chapterName = useSelector((state: RootState) => {
        const item = Object.values(state.toc.present).filter((t) => t.visible)[0]
        if (item) {
            return item.filename
        }
    })

    useEffect(() => {
        if (chapterName) {
            emitNavChange(chapterName, channelName, currentPlayer)
        }
    }, [chapterName])
}
export default useNavEmitter

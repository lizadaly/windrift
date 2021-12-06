import * as React from 'react'

import useChapter from 'core/hooks/use-chapter'
import { PlayerContext } from 'core/multiplayer/components/multiplayer-init'

import debug from 'public/styles/multiplayer/Debug.module.scss'
import { StoryContext } from 'pages/[story]/[[...chapter]]'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'core/types'
import { emitNavChange, emitPresence, pollForPresence } from '../api-client'

/**
 * Display debugging info and allow for specific events to be triggered via the API.
 */
export const Debug: React.FC = ({ children }) => {
    const context = React.useContext(PlayerContext).presenceApiResponse
    const dispatch = useDispatch()
    const multiplayer = useSelector((state: RootState) => state.multiplayer.multiplayer)
    const thisPlayerLocation = useChapter()?.filename
    const { config } = React.useContext(StoryContext)
    const otherPlayerIsActive = !!context

    const [posting, setPosting] = React.useState(false)

    return (
        <div className={debug.content}>
            <h3>Debug toolbar</h3>
            {multiplayer.otherPlayer.name} location:{' '}
            {otherPlayerIsActive ? (
                context.nav?.chapterName
            ) : (
                <>
                    Not online;{' '}
                    <button
                        onClick={() => {
                            const start = config.players.filter(
                                (p) => p.name == multiplayer.otherPlayer.name
                            )[0].start
                            console.log(
                                `Will post ${config.identifier} ${multiplayer.instanceId} ${multiplayer.otherPlayer.name} to ${start}`
                            )
                            emitNavChange(
                                config.identifier,
                                start,
                                multiplayer.instanceId,
                                multiplayer.otherPlayer.id
                            )
                            setPosting(true)
                        }}>
                        {posting ? 'posting...' : 'activate'}
                    </button>
                </>
            )}
        </div>
    )
}

const DebugContainer: React.FC = ({ children }) => {
    const [isOpen, setOpen] = React.useState(true)
    const multiplayer = useSelector((state: RootState) => state.multiplayer.multiplayer)

    return (
        process.env.NODE_ENV === 'development' &&
        multiplayer && (
            <div className={`${debug.toolbar} ${isOpen ? debug.open : debug.closed}`}>
                {isOpen ? (
                    <>
                        <Debug />
                        <button className={debug.toggle} onClick={() => setOpen(false)}>
                            Close
                        </button>
                    </>
                ) : (
                    <>
                        <button className={debug.toggle} onClick={() => setOpen(true)}>
                            Show debug info
                        </button>
                    </>
                )}
            </div>
        )
    )
}

export default DebugContainer

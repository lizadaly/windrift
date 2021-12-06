import * as React from 'react'

import useChapter from 'core/hooks/use-chapter'
import { PlayerContext } from 'core/multiplayer/components/multiplayer-init'
import { v4 as uuidv4 } from 'uuid'

import debug from 'public/styles/multiplayer/Debug.module.scss'
import { StoryContext } from 'pages/[story]/[[...chapter]]'
import { useDispatch, useSelector } from 'react-redux'
import { Config, RootState, Toc } from 'core/types'
import {
    emitChoice,
    emitNavChange,
    emitPresence,
    getStoryUrl,
    pollForPresence,
    resumeStoryInstance
} from '../api-client'
import { Player } from '.prisma/client'
import { Multiplayer } from 'core/features/multiplayer'
import { PresenceApiResponse } from 'pages/api/core/story/[story]/[instance]/presence'
import { Persistor } from 'redux-persist'

/**
 * Display debugging info and allow for specific events to be triggered via the API.
 */
const Debug = (): JSX.Element => {
    const context = React.useContext(PlayerContext).presenceApiResponse
    const multiplayer = useSelector((state: RootState) => state.multiplayer.multiplayer)
    const { config, persistor } = React.useContext(StoryContext)
    return (
        <div className={debug.content}>
            <LocationSwitcher config={config} multiplayer={multiplayer} context={context} />
            <UserSwitcher config={config} multiplayer={multiplayer} persistor={persistor} />
        </div>
    )
}

interface UserSwitcherProps {
    config: Config
    multiplayer: Multiplayer
    persistor: Persistor
}

const UserSwitcher = ({ config, multiplayer, persistor }: UserSwitcherProps): JSX.Element => {
    return (
        <div>
            Switch user to{' '}
            <button
                onClick={() => {
                    persistor.flush().then(() => {
                        persistor.pause()
                        persistor.purge().then(() => {
                            localStorage.clear()
                            persistor.persist()
                            location.assign(
                                getStoryUrl(multiplayer.instanceId) +
                                    '&playerId=' +
                                    multiplayer.otherPlayer.id
                            )
                        })
                    })
                }}>
                {multiplayer.otherPlayer.name}
            </button>
        </div>
    )
}
interface LocationSwitcherProps {
    config: Config
    multiplayer: Multiplayer
    context: PresenceApiResponse
}

const LocationSwitcher = ({ config, multiplayer, context }: LocationSwitcherProps): JSX.Element => {
    const otherPlayerIsActive = !!context
    const thisPlayerLocation = useChapter()?.filename
    const start = config.players.filter((p) => p.name == multiplayer.otherPlayer.name)[0].start

    return (
        <div className={debug.location}>
            {multiplayer.otherPlayer.name} location:{' '}
            {otherPlayerIsActive ? (
                <>
                    {context.nav?.chapterName}
                    <div>
                        <RelocateButton
                            identifier={config.identifier}
                            instanceId={multiplayer.instanceId}
                            player={multiplayer.otherPlayer}
                        />
                    </div>
                </>
            ) : (
                <>
                    Not online, activate in{' '}
                    <MoveButton
                        identifier={config.identifier}
                        instanceId={multiplayer.instanceId}
                        player={multiplayer.otherPlayer}
                        location={start}
                    />
                </>
            )}
        </div>
    )
}
interface RelocateButtonProps {
    identifier: string
    instanceId: string
    player: Player
}
const RelocateButton = ({ identifier, instanceId, player }: RelocateButtonProps): JSX.Element => {
    const { toc } = useSelector((state: RootState) => state.navigation.present)
    return (
        <>
            Move {player.name} to location:
            {Object.values(toc).map((t) => (
                <MoveButton
                    key={t.filename}
                    identifier={identifier}
                    instanceId={instanceId}
                    player={player}
                    location={t.filename}
                />
            ))}
        </>
    )
}

interface MoveButtonProps {
    identifier: string
    instanceId: string
    player: Player
    location: string
}
const MoveButton = ({ identifier, instanceId, player, location }: MoveButtonProps) => {
    const [posting, setPosting] = React.useState(false)
    React.useEffect(() => {
        const timeout = setTimeout(() => setPosting(false), 5000)
        return () => clearTimeout(timeout)
    })

    return (
        <button
            onClick={() => {
                console.log(`Will post ${identifier} ${instanceId} ${player.name} to ${location}`)
                emitNavChange(identifier, location, instanceId, player.id)
                setPosting(true)
            }}>
            {posting ? 'posting...' : location}
        </button>
    )
}
const DebugToolbar = (): JSX.Element => {
    const [isOpen, setOpen] = React.useState(true)
    const multiplayer = useSelector((state: RootState) => state.multiplayer.multiplayer)
    return (
        <>
            {process.env.NODE_ENV === 'development' && multiplayer && (
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
            )}
        </>
    )
}

export default DebugToolbar

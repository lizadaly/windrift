import * as React from 'react'
import { useSelector } from 'react-redux'

import { Player } from '@prisma/client'

import { Config, RootState } from 'core/types'
import { StoryContext } from 'core/containers/store-container'
import { emitNavChange, getStoryUrl, useSync, usePresencePoll } from 'core/multiplayer/api-client'

import useLocation from '../hooks/use-location'

import debug from 'public/styles/multiplayer/Debug.module.scss'
import { MultiplayerContext, Multiplayer } from './multiplayer'
import Log from './examples/log'

/**
 * Display debugging info and allow for specific events to be triggered via the API.
 */
const Debug = (): JSX.Element => {
    const { multiplayer } = React.useContext(MultiplayerContext)
    const { config } = React.useContext(StoryContext)
    return (
        <div className={debug.content}>
            <div>
                <LocationSwitcher config={config} multiplayer={multiplayer} />
                <UserSwitcher multiplayer={multiplayer} />
                <SyncButton multiplayer={multiplayer} />
            </div>
            <div className={debug.log}>
                <Log />
            </div>
        </div>
    )
}
interface SyncProps {
    multiplayer: Multiplayer
}
const SyncButton = ({ multiplayer }: SyncProps): JSX.Element => {
    const doSync = useSync(multiplayer.identifier, multiplayer.instanceId)
    return (
        <div>
            <button onClick={() => doSync(true)}>Sync now</button>
        </div>
    )
}

interface UserSwitcherProps {
    multiplayer: Multiplayer
}

const UserSwitcher = ({ multiplayer }: UserSwitcherProps): JSX.Element => {
    return (
        <div>
            Switch user to{' '}
            <button
                onClick={() => {
                    location.assign(
                        getStoryUrl(multiplayer.instanceId) +
                            '&playerId=' +
                            multiplayer.otherPlayer.id
                    )
                }}>
                {multiplayer.otherPlayer.name}
            </button>
        </div>
    )
}
interface LocationSwitcherProps {
    config: Config
    multiplayer: Multiplayer
}

const LocationSwitcher = ({ config, multiplayer }: LocationSwitcherProps): JSX.Element => {
    const otherPlayerIsActive = usePresencePoll(
        multiplayer.identifier,
        multiplayer.instanceId,
        multiplayer.otherPlayer
    )

    const { other } = useLocation()
    const start = config.players.filter((p) => p.name == multiplayer.otherPlayer.name)[0].start

    return (
        <div className={debug.location}>
            {multiplayer.otherPlayer.name} location:{' '}
            {otherPlayerIsActive && other ? (
                <>
                    {other.chapterName}
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
                emitNavChange(identifier, location, instanceId, player.id, null)
                setPosting(true)
            }}>
            {posting ? 'posting...' : location}
        </button>
    )
}
const DebugToolbar = (): JSX.Element => {
    const [isOpen, setOpen] = React.useState(false)
    const { multiplayer } = React.useContext(MultiplayerContext)
    return (
        <>
            {process.env.NODE_ENV === 'development' && multiplayer.ready && (
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

import * as React from 'react'

import useChapter from 'core/hooks/use-chapter'
import { PlayerContext } from 'core/multiplayer/components/multiplayer-init'

import debug from 'public/styles/multiplayer/Debug.module.scss'
import { StoryContext } from 'pages/[story]/[[...chapter]]'
import { useDispatch, useSelector } from 'react-redux'
import { Config, RootState, Toc } from 'core/types'
import { emitNavChange, emitPresence, pollForPresence } from '../api-client'
import { Player } from '.prisma/client'
import { Multiplayer } from 'core/features/multiplayer'
import { PresenceApiResponse } from 'pages/api/core/story/[story]/[instance]/presence'

/**
 * Display debugging info and allow for specific events to be triggered via the API.
 */
const Debug = (): JSX.Element => {
    const context = React.useContext(PlayerContext).presenceApiResponse
    const multiplayer = useSelector((state: RootState) => state.multiplayer.multiplayer)
    const { config } = React.useContext(StoryContext)
    console.log('Debug')
    return (
        <div className={debug.content}>
            <h3>Debug toolbar</h3>
            <LocationSwitcher config={config} multiplayer={multiplayer} context={context} />
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
                            otherPlayer={multiplayer.otherPlayer}
                        />
                    </div>
                </>
            ) : (
                <>
                    Not online, activate in{' '}
                    <MoveButton
                        identifier={config.identifier}
                        instanceId={multiplayer.instanceId}
                        otherPlayer={multiplayer.otherPlayer}
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
    otherPlayer: Player
}
const RelocateButton = ({
    identifier,
    instanceId,
    otherPlayer
}: RelocateButtonProps): JSX.Element => {
    const { toc } = useSelector((state: RootState) => state.navigation.present)
    return (
        <>
            Move to location:
            {Object.values(toc).map((t) => (
                <MoveButton
                    key={t.filename}
                    identifier={identifier}
                    instanceId={instanceId}
                    otherPlayer={otherPlayer}
                    location={t.filename}
                />
            ))}
        </>
    )
}

interface MoveButtonProps {
    identifier: string
    instanceId: string
    otherPlayer: Player
    location: string
}
const MoveButton = ({ identifier, instanceId, otherPlayer, location }: MoveButtonProps) => {
    const [posting, setPosting] = React.useState(false)

    return (
        <button
            onClick={() => {
                console.log(
                    `Will post ${identifier} ${instanceId} ${otherPlayer.name} to ${location}`
                )
                emitNavChange(identifier, location, instanceId, otherPlayer.id)
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

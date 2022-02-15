import * as React from 'react'

import Image from 'next/image'

import styles from 'public/styles/multiplayer/ShareButton.module.scss'
import { MultiplayerContext } from 'core/multiplayer/components/multiplayer'
import { usePresence } from '../hooks/use-presence'

const ShareButton = (): JSX.Element => {
    const { storyUrl, otherPlayer } = React.useContext(MultiplayerContext).multiplayer
    const { isActive } = usePresence()
    const [clicked, isClicked] = React.useState(false)

    return (
        <>
            <button
                className={`${styles.clipboard} ${isActive ? '' : styles.offline}`}
                onClick={() => {
                    navigator.clipboard.writeText(storyUrl + `&playerId=${otherPlayer.id}`)
                    isClicked(true)
                    setTimeout(() => isClicked(false), 5000)
                }}>
                <span>
                    {clicked ? 'Copied to clipboard!' : 'Share story link with the other player'}{' '}
                </span>
                <Image src="/images/clipboard.svg" width={25} height={25} alt="Copy to clipboard" />
            </button>
        </>
    )
}

export default ShareButton

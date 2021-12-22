import * as React from 'react'

import Image from 'next/image'

import styles from 'public/styles/multiplayer/ShareButton.module.scss'
import { MultiplayerContext } from 'core/multiplayer/components/multiplayer'

const ShareButton = (): JSX.Element => {
    const { storyUrl, otherPlayer } = React.useContext(MultiplayerContext).multiplayer
    return (
        <>
            <button
                className={styles.clipboard}
                onClick={() =>
                    navigator.clipboard.writeText(storyUrl + `&playerId=${otherPlayer.id}`)
                }>
                <span>Share story URL with {otherPlayer.name}</span>
                <Image src="/images/clipboard.svg" width={25} height={25} alt="Copy to clipboard" />
            </button>
        </>
    )
}

export default ShareButton

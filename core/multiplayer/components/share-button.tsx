import Image from 'next/image'

import { Multiplayer } from 'core/features/multiplayer'
import styles from 'public/styles/multiplayer/ShareButton.module.scss'
import { Player } from '@prisma/client'

type ShareButtonProps = {
    multiplayer: Multiplayer
    otherPlayer: Player
}

const ShareButton: React.FC<ShareButtonProps> = ({ multiplayer, otherPlayer }) => {
    return (
        <>
            <button
                className={styles.clipboard}
                onClick={() => navigator.clipboard.writeText(multiplayer.storyUrl)}>
                <span>Share story URL with {otherPlayer.name}</span>
                <Image src="/images/clipboard.svg" width={25} height={25} alt="Copy to clipboard" />
            </button>
        </>
    )
}

export default ShareButton

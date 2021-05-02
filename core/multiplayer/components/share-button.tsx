import Image from 'next/image'

import { Multiplayer } from 'core/actions/multiplayer'
import styles from 'public/styles/multiplayer/ShareButton.module.scss'

type ShareButtonProps = {
    multiplayer: Multiplayer
    otherPlayer: string
}

const ShareButton: React.FC<ShareButtonProps> = ({ multiplayer, otherPlayer }) => {
    return (
        <>
            <button
                className={styles.clipboard}
                onClick={() => navigator.clipboard.writeText(multiplayer.storyUrl)}>
                <span>Share story URL with {otherPlayer}</span>
                <Image src="/images/clipboard.svg" width={25} height={25} alt="Copy to clipboard" />
            </button>
        </>
    )
}

export default ShareButton

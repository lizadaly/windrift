import Image from 'next/image'

import { Multiplayer } from 'core/types'
import styles from 'public/styles/multiplayer/ShareButton.module.scss'

type ShareButtonProps = {
    multiplayer: Multiplayer
    otherPlayer: number
}

const ShareButton: React.FC<ShareButtonProps> = ({ multiplayer, otherPlayer }) => <>
    <button className={styles.clipboard} onClick={() =>
        navigator.clipboard.writeText(multiplayer.channelName)}>
        <span>Share channel with player {otherPlayer}</span>
        <Image src="/images/clipboard.svg"
            width={25}
            height={25}
            alt="Copy to clipboard"
        />
    </button>
</>

export default ShareButton
import { useSelector } from 'react-redux'

import Image from 'next/image'

import { Multiplayer } from 'core/actions/multiplayer'
import { RootState } from 'core/reducers'
import styles from 'public/styles/multiplayer/ShareButton.module.scss'

type ShareButtonProps = {
    multiplayer: Multiplayer
    otherPlayer: number
}

const ShareButton: React.FC<ShareButtonProps> = ({ multiplayer, otherPlayer }) => {
    const { channelLabel } = useSelector((state: RootState) => state.config.multiplayer)
    return (
        <>
            <button
                className={styles.clipboard}
                onClick={() => navigator.clipboard.writeText(multiplayer.channelName)}>
                <span>
                    Share {channelLabel} with player {otherPlayer}
                </span>
                <Image src="/images/clipboard.svg" width={25} height={25} alt="Copy to clipboard" />
            </button>
        </>
    )
}

export default ShareButton

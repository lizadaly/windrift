import * as React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'core/reducers'
import MultiplayerInit from 'core/multiplayer/components/multiplayer-init'

type Props = {
    ready: React.ReactNode
    setup: React.ReactNode
}
const TitleScreen: React.FC<Props> = ({ ready, setup }) => {
    const multiplayer = useSelector((state: RootState) => state.multiplayer)
    return <>{multiplayer.ready ? <MultiplayerInit>{ready}</MultiplayerInit> : <>{setup}</>}</>
}

export default TitleScreen

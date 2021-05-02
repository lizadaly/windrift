import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'

import { RootState } from 'core/reducers'
import TitleScreen from 'core/multiplayer/components/title-screen'

import UI from './ui'
import NewGame from './components/new-game'
import { useRouter } from 'next/router'
import axios from 'axios'
import { initMultiplayer } from 'core/actions'

const Index: React.FC = ({ children }) => {
    const config = useSelector((state: RootState) => state.config)
    const multiplayer = useSelector((state: RootState) => state.multiplayer)
    const dispatch = useDispatch()
    const router = useRouter()
    React.useEffect(() => {
        const { instance, playerId } = router.query
        if (instance && playerId) {
            axios(`/api/core/story/${config.identifier}/${instance}/get`, {}).then((res) => {
                const { instance, player1, player2 } = res.data
                multiplayer.instanceId = instance.id
                if (playerId === player1.id) {
                    multiplayer.currentPlayer = player1.name
                }
                if (playerId === player2.id) {
                    multiplayer.currentPlayer = player2.name
                }
                multiplayer.ready = true
                dispatch(initMultiplayer(multiplayer))
            })
        }
    }, [dispatch])

    // Component tree to render for an active story
    const ready = <UI>{children}</UI>

    // // Render tree for setting up the game
    const setup = (
        <UI>
            <NewGame multiplayer={multiplayer} config={config} />
        </UI>
    )

    return (
        <>
            <Head>
                <title>{config.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <style>
                    @import
                    url(https://fonts.googleapis.com/css2?family=EB+Garamond&family=Elsie&display=swap);
                </style>
            </Head>
            {multiplayer.ready}
            <TitleScreen ready={ready} setup={setup} />
        </>
    )
}

export default Index

import * as React from 'react'
import { Persistor } from 'redux-persist'
import { NextRouter, useRouter } from 'next/router'

import { Config } from 'core/types'
import { StoryContext } from 'core/containers/store-container'

/* Reset the story and remove the local storage */
export const resetStory = (
    userInitiated: boolean,
    config: Config,
    persistor: Persistor,
    router: NextRouter,
    message = 'Restart story from the beginning?'
): void => {
    // Drop any chapter-level path info
    const url = '/' + router.basePath + config.identifier
    if (userInitiated) {
        if (confirm(message)) {
            persistor.flush().then(() => {
                persistor.pause()
                localStorage.clear()
                window.location.replace(url)
            })
        }
    } else {
        persistor.flush().then(() => {
            persistor.pause()
            localStorage.clear()
            window.location.reload()
        })
    }
}
type ResetType = {
    message?: string
    children?: React.ReactNode
}
const ResetButton = ({ children = 'Reset', message }: ResetType): JSX.Element => {
    const { persistor, config } = React.useContext(StoryContext)
    const router = useRouter()
    return (
        <>
            <button onClick={() => resetStory(true, config, persistor, router, message)}>
                {children}
            </button>
        </>
    )
}

export default ResetButton

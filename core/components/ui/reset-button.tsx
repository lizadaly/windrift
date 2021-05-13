import * as React from 'react'
import { Persistor } from 'redux-persist'
import { StoryContext } from 'pages/[story]'

/* Reset the game and remove the local storage */
export const resetGame = (
    userInitiated: boolean,
    persistor: Persistor,
    message = 'Restart story from the beginning?'
): void => {
    if (userInitiated) {
        if (confirm(message)) {
            persistor.flush().then(() => {
                persistor.pause()
                localStorage.clear()
                window.location.replace(window.location.pathname)
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
}
const ResetButton: React.FC<ResetType> = ({ children = 'Reset', message }) => {
    const { persistor } = React.useContext(StoryContext)

    return (
        <>
            <button onClick={() => resetGame(true, persistor, message)}>{children}</button>
        </>
    )
}

export default ResetButton

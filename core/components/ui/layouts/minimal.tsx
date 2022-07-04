import * as React from 'react'

import { StoryContext } from 'core/containers/store-container'

/**
 * A minimal HTML layout for non-traditional UIs or heavily customized layout.
 * Will automatically pull in the {@link Config} from {@link StoryContext} to provide
 * access to story-level details.
 *
 * Does not take a @param head as that can always be injected by a child component in NextJS.
 * @see {@link https://nextjs.org/docs/api-reference/next/head}
 *
 * Does not inject any styles properties; assumes they are all defined externally.
 */
type Props = {
    children: React.ReactNode
}
const Minimal = ({ children }: Props): JSX.Element => {
    const { config } = React.useContext(StoryContext)
    return (
        <>
            <main lang={config.language}>{children}</main>
        </>
    )
}

export default Minimal

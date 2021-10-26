/**
 * A custom NextJS App that pulls in the default (system-level) CSS.
 *
 * @see {@link https://nextjs.org/docs/advanced-features/custom-app}
 *
 * Story authors should not need to modify this file, but if you need to make any changes
 * that can only be supported by a custom App, know that these will apply to all stories
 * hosted in this Windrift installation.
 */
import 'public/global.scss'

import type { AppProps } from 'next/app'

function WindriftApp({ Component, pageProps }: AppProps): JSX.Element {
    return <Component {...pageProps} />
}

export default WindriftApp

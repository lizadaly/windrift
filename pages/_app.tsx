import '../public/styles.scss'

import type { AppProps } from 'next/app'

function WindriftApp({ Component, pageProps }: AppProps): JSX.Element {
    return <Component {...pageProps} />
}

export default WindriftApp
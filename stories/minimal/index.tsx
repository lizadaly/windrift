import * as React from 'react'
import Head from 'next/head'

import Minimal from 'core/components/ui/layouts/minimal'

const Index: React.FC = ({ children }) => {
    return (
        <Minimal>
            <Head>
                <title>A minimal example</title>
            </Head>
            {children}
        </Minimal>
    )
}

export default Index

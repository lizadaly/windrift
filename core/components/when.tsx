import * as React from 'react'

interface WhenProps {
    condition: any
    otherwise?: React.ReactNode
    children?: React.ReactNode
}

const When = ({ children, condition, otherwise }: WhenProps): JSX.Element => {
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!condition) {
        return <>{children}</>
    }
    if (otherwise) {
        return <>{otherwise}</>
    }
    return null
}

export default When

import * as React from 'react'

interface WhenProps {
    condition: any
    otherwise?: React.ReactNode
}

const When: React.FC<WhenProps> = ({ children, condition, otherwise }): JSX.Element => {
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

import * as React from 'react'

type SectionProps = {
    visible?: boolean
}
const Section: React.FC<SectionProps> = ({ visible = false, children }) => {
    return visible ? <>{children}</> : null
}
export default Section

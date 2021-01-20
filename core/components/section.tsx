import * as React from 'react'

type SectionProps = {
    visible?: boolean // Auto-computed by toc
}
const Section: React.FC<SectionProps> = ({ visible = false, children }) => {
    return visible ? <>{children}</> : null
}
export default Section

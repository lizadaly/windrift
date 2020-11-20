import * as React from "react"

interface SectionProps {
    visible: boolean
    children: React.ReactNode
}
const Section: React.FC = (props: SectionProps) => {
    const { visible = false, children } = props
    return visible ? <>
        {children}
    </> : null
}
export default Section
import * as React from "react"

interface SectionProps {
    visible: boolean
    children: React.ReactNode
}
const Section: React.FC = ({ visible = false, children }: SectionProps) => {
    return visible ? <>
        {children}
    </> : null
}
export default Section
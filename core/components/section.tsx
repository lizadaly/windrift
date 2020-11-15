import * as React from "react"

interface SectionProps {
    visible: false
    children: React.ReactNode
}
const Section: React.FC = (props: SectionProps) => (

    props.visible ? <>
        {props.children}
    </> : null
)
export default Section
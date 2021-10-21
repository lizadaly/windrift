import * as React from 'react'

export type SectionType = {
    className?: string
}
const Section: React.FC<SectionType> = ({ children, className = '' }) => {
    return <section className={`windrift--section ${className}`}>{children}</section>
}
export default Section

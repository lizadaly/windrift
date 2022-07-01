import * as React from 'react'

export type SectionType = {
    className?: string
    children: React.ReactNode
}
const Section: React.FC<SectionType> = ({ children, className = '' }) => {
    return <section className={`windrift--section ${className}`}>{children}</section>
}
Section.displayName = 'Section'
export default Section

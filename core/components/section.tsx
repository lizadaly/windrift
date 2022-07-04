import { ReactFCC } from 'core/types'
import * as React from 'react'

export type SectionType = {
    className?: string
    children: React.ReactNode
}
const Section: ReactFCC<SectionType> = ({ children, className = '' }) => {
    return <section className={`windrift--section ${className}`}>{children}</section>
}
Section.displayName = 'Section'
export default Section

/**
 * A special case of a Choice that provides navigation between chapters.
 *
 * Use a full Choice component if you want the name of the link to change
 * after clicking.
 */
import React, { useContext } from 'react'

import { BaseList } from 'core/components/widgets'
import { Choice } from 'core/components'
import { Tag, Next } from 'core/types'
import { ChapterContext } from 'core/components/chapter'

export interface NavProps {
    /** The displayed text for the link */
    text: string
    /** The chapter name or section */
    next: string
    /** Whether to continue to display the hyperlink or not */
    persist?: boolean
    /** Tag to be supplied if the text string is non-unique */
    tag?: Tag
    /** Class name to based to the widget */
    className?: string
}
const Nav = ({
    text = 'More...',
    next = Next.Section,
    persist = true,
    tag = undefined,
    className = undefined
}: NavProps): JSX.Element => {
    const { filename } = useContext(ChapterContext)

    return (
        <Choice
            options={[[text]]}
            widget={BaseList}
            tag={tag || `${filename || 'story'}-${next}-${text.replaceAll(' ', '-').toLowerCase()}`}
            next={next}
            persist={persist}
            className={className}
        />
    )
}
export default Nav

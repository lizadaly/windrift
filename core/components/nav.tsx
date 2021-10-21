/**
 * A special case of a Choice that provides navigation between chapters.
 *
 * Use a full Choice component if you want the name of the link to change
 * after clicking.
 */
import React, { useContext } from 'react'
import { BaseList } from './widgets'
import { Choice } from 'core/components'
import { Next } from 'core/reducers/navigation'
import { Tag } from 'core/types'
import { ChapterContext } from './chapter'

interface Props {
    /** The displayed text for the link */
    text: string
    /** The chapter name or section */
    next: string
    /** Whether to continue to display the hyperlink or not */
    persist?: boolean
    /** Tag to be supplied if the text string is non-unique */
    tag?: Tag
}
const Nav = ({
    text = 'More...',
    next = Next.Section,
    persist = false,
    tag = undefined
}: Props): JSX.Element => {
    const { filename } = useContext(ChapterContext)

    return (
        <Choice
            options={[text, null]}
            widget={BaseList}
            tag={tag || `${filename}-${next}-${text.replace(' ', '-').toLowerCase()}`}
            next={next}
            persist={persist}
        />
    )
}
export default Nav

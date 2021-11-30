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
    /** For Multiplayer only, has no effect in single-player: whether to sync this choice to the remote player.
     * Player location is always available via the presence response, but this allows responding to location changes instantly.
     * You will probably want to set a specific tag in this case. */
    sync?: boolean
}
const Nav = ({
    text = 'More...',
    next = Next.Section,
    persist = true,
    tag = undefined,
    className = undefined,
    sync = false
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
            sync={sync}
        />
    )
}
export default Nav

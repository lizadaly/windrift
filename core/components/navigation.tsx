/**
 * A special case of a Choice that provides navigation between chapters.
 *
 * Use a full Choice component if you want the name of the link to change
 * after clicking.
 */
import React from 'react'
import { useId } from 'react-id-generator'
import { BaseList } from './widgets'
import { Choice } from 'core/components'

interface Props {
    /** The displayed text for the link */
    text: string
    /** The chapter name */
    next: string
}
const Nav = ({ text, next }: Props): JSX.Element => {
    const tag = useId(1, 'nav-link-')[0]
    return (
        <Choice options={[[text, null]]} widget={BaseList} tag={tag} next={next} persist={true} />
    )
}
export default Nav

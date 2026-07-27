/**
 * A bulleted list presentation where the unpicked items remain in the list
 * @example will produce "<ul><li>Item 1</li><li>Item 2</li></ul>"
 *
 * It's recommended to implement your own custom version of this component to match
 * the desired HTML.
 */

import * as React from 'react'

import Link from 'core/components/link'
import { WidgetProps } from '.'

type BulletedListType = (props: WidgetProps) => React.ReactElement

// Passing initialChoices means you can leave the existing ones there
const InlineList: BulletedListType = ({
    group = [],
    handler = null,
    tag = null,
    initialOptions = [],
    className = null
}: WidgetProps): React.ReactElement => {
    // Once the player has picked something, the remaining group no longer matches the
    // original list, and the picked entries get marked as selected
    const narrowed =
        initialOptions[0].length !== group.length ||
        group.some((g, i) => g !== initialOptions[0][i])

    return (
        <ul>
            {[...initialOptions[0]].map((t, i) => (
                <li key={i} className={className}>
                    <Link handler={handler} text={t} tag={tag} />
                    {narrowed && group.includes(t) ? ' (selected)' : null}
                </li>
            ))}
        </ul>
    )
}

export default InlineList

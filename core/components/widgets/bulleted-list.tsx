// A bulleted list presentation where the unpicked items remain in the list

import React from 'react'
import { WidgetProps } from '.'
import Link from '../link'
import { isEqual } from 'lodash'
interface BulletedListProps extends WidgetProps {
    separator: string
    conjunction: string
}
declare function BulletedListType(props: BulletedListProps): JSX.Element

// Passing initialChoices means you can leave the existing ones there
const InlineList: typeof BulletedListType = ({
    group = [],
    handler = null,
    tag = null,
    initialOptions = [],
    className = null
}: BulletedListProps): JSX.Element => {
    return (
        <ul>
            {[...initialOptions[0]].map((t, i) => (
                <li key={i} className={className}>
                    <Link handler={handler} text={t} tag={tag} />
                    {group.map((g) => {
                        if (!isEqual(initialOptions[0], group) && g === t) {
                            return ' (selected)'
                        }
                    })}
                </li>
            ))}
        </ul>
    )
}

export default InlineList

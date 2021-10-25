// An inline list of items, the default

import React from 'react'
import { WidgetProps } from '.'
import Link from '../link'

interface InlineListProps extends WidgetProps {
    separator: string
    conjunction: string
}
declare function InlineListType(props: InlineListProps): JSX.Element

export const InlineList: typeof InlineListType = ({
    separator = ', ',
    conjunction = 'or',
    group = null,
    handler = null,
    tag = null,
    className = null
}: InlineListProps): JSX.Element => {
    if (conjunction.length > 0) {
        conjunction = ` ${conjunction} `
    }

    return (
        <>
            {[...group]
                .filter((c) => c !== null && c !== undefined)
                .map((t, i) => (
                    <span key={i} className={className}>
                        {group.length > 1 && i === group.length - 1 ? conjunction : ''}
                        <Link handler={handler} text={t} tag={tag} />
                        {i < group.length - 1 && group.length > 2 ? separator : ''}
                    </span>
                ))}
        </>
    )
}
export const InlineListEN: typeof InlineList = ({
    separator = ', ',
    conjunction = 'or',
    group = null,
    handler = null,
    tag = null,
    className = null
}: InlineListProps): JSX.Element =>
    InlineList({ separator, conjunction, group, handler, tag, className })

// An inline list of items, the default

import React from 'react'
import { WidgetProps } from '.'
import Link from '../link'

interface InlineListProps extends WidgetProps {
    separator: string
    conjunction: string
}
declare function InlineListType(props: InlineListProps): JSX.Element

const InlineList: typeof InlineListType = ({
    separator = ', ',
    conjunction = 'and',
    group = null,
    handler = null
}: InlineListProps): JSX.Element => {
    if (conjunction.length > 0) {
        conjunction = ` ${conjunction} `
    }
    return (
        <>
            {[...group].map((t, i) => (
                <span key={i}>
                    {group.length > 1 && i === group.length - 1 ? conjunction : ''}
                    <Link handler={handler} text={t} index={i} />
                    {i < group.length - 1 && group.length > 2 ? separator : ''}
                </span>
            ))}
        </>
    )
}

export default InlineList

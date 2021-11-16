/**
 * An inline list of choice options, the default widget.
 * @example Will produce: "foo, bar, and baz"
 *
 */
import * as React from 'react'

import { WidgetProps } from 'core/components/widgets'
import Link from 'core/components/link'

export interface InlineListProps extends WidgetProps {
    /** The separator between list items
     * @default ","
     */
    separator: string
    /** The conjunction terminating a list of items
     * @default "or"
     */
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

/** Portuguese version of an inline list with an "or" conjunction */
export const InlineListPT: typeof InlineList = ({
    separator = ', ',
    conjunction = 'e',
    group = null,
    handler = null,
    tag = null,
    className = null
}: InlineListProps): JSX.Element =>
    InlineList({ separator, conjunction, group, handler, tag, className })

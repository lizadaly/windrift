/**
 * A default widget presentation with no styling
 */

import * as React from 'react'

import Link from 'core/components/link'
import { WidgetProps } from '.'

declare function BaseListType(props: WidgetProps): JSX.Element

const BaseList: typeof BaseListType = ({
    group = null,
    handler = null,
    tag = null,
    className = null
}: WidgetProps): JSX.Element => {
    return (
        <>
            {[...group].map((t, i) => (
                <span key={i} className={className}>
                    <Link handler={handler} text={t} tag={tag} />
                </span>
            ))}
        </>
    )
}

export default BaseList

/**
 * A default widget presentation with no styling
 */

import * as React from 'react'

import Link from 'core/components/link'
import { WidgetProps } from '.'

type BaseListType = (props: WidgetProps) => React.ReactElement

const BaseList: BaseListType = ({
    group = null,
    handler = null,
    tag = null,
    className = null
}: WidgetProps): React.ReactElement => {
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

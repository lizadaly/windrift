// A single-link list, like a "More..." list. When triggered it cannot
// be triggered again.

import { Next } from 'core/actions/navigation'
import * as React from 'react'
import { Choice } from 'core/components'
import { BaseList } from 'core/components/widgets'
import { useId } from 'react-id-generator'

type Props = {
    text?: string
    next?: Next | string
}
const More = ({ next = Next.Section, text = 'More...' }: Props): JSX.Element => {
    const tag = useId(1, 'more-link-')[0]
    return <Choice options={[[text, null]]} widget={BaseList} tag={tag} next={next} />
}
export default More

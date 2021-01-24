// A single-link list, like a "More..." list. When triggered it cannot
// be triggered again.

import { gotoChapter, incrementSection, Next, showNextChapter } from 'core/actions/navigation'
import { TocItem } from 'core/types'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { ChapterContext } from './chapter'
import Link from './link'

type Props = {
    text?: string
    next?: Next
}
const More: React.FC<Props> = ({ next = Next.Section, text = 'More...' }) => {
    const dispatch = useDispatch()
    const item: TocItem = React.useContext(ChapterContext)

    const handler = () => {
        if (next === Next.Section) {
            dispatch(incrementSection(item))
        } else if (next === Next.Chapter) {
            dispatch(showNextChapter(item))
        } else if (typeof next === 'string') {
            dispatch(gotoChapter(next))
        }
    }
    return <Link text={text} handler={handler} />
}
export default More

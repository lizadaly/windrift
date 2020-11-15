import {
    Toc, IncrementSectionType, INCREMENT_SECTION,
    COUNT_SECTION, CountSectionType, TocItem
} from '../types'

import { getChapter } from '../util'

const config = (state: Toc = null,
    action: IncrementSectionType | CountSectionType): Toc => {
    let item: TocItem

    switch (action.type) {
        case INCREMENT_SECTION:
            item = getChapter(state, action.item.filename)

            item.bookmark = Math.min(item.bookmark + 1, action.item.sectionCount)
            return { ...state }

        case COUNT_SECTION:
            item = getChapter(state, action.item.filename)

            item.sectionCount = action.count
            return { ...state }
        default:
            return state
    }
}

export default config

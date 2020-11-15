import {
    Toc, IncrementSectionType, INCREMENT_SECTION,
    COUNT_SECTION, CountSectionType
} from '../types'

import { getChapter } from '../util'

const config = (state: Toc = null,
    action: IncrementSectionType | CountSectionType): Toc => {
    switch (action.type) {
        case INCREMENT_SECTION:
            let item = getChapter(state, action.item.filename)

            item.bookmark += 1
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

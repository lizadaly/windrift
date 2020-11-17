import undoable, { excludeAction } from 'redux-undo'
import cloneDeep from 'lodash.clonedeep'

import {
    Toc, IncrementSectionType, INCREMENT_SECTION,
    COUNT_SECTION, CountSectionType, TocItem, SHOW_NEXT_CHAPTER, ShowNextChapterType
} from '../types'

import { getChapter } from '../util'

const toc = (state: Toc = null,
    action: IncrementSectionType | CountSectionType | ShowNextChapterType): Toc => {
    let item: TocItem

    switch (action.type) {
        case INCREMENT_SECTION:
            item = getChapter(state, action.item.filename)

            item.bookmark = Math.min(item.bookmark + 1, action.item.sectionCount)
            return cloneDeep(state)

        case COUNT_SECTION:
            item = getChapter(state, action.item.filename)

            item.sectionCount = action.count
            return cloneDeep(state)

        case SHOW_NEXT_CHAPTER:
            // Set the item after this one to visible
            const items = Object.values(state)
            const index = items.indexOf(action.item)
            if (index < items.length - 1) { // Ensure there are more chapters
                items[index + 1].visible = true
            }
            return cloneDeep(state)

        default:
            return state
    }
}

export default undoable(toc, { filter: excludeAction([COUNT_SECTION, INCREMENT_SECTION]) })

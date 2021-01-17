import undoable from 'redux-undo'
import cloneDeep from 'lodash.clonedeep'

import { Toc, TocItem } from 'core/types'

import { getChapter } from 'core/util'
import {
    CountSectionType,
    COUNT_SECTION,
    GotoChapterType,
    GOTO_CHAPTER,
    IncrementSectionType,
    INCREMENT_SECTION,
    ShowNextChapterType,
    SHOW_NEXT_CHAPTER
} from 'core/actions/navigation'

const toc = (
    state: Toc = null,
    action: IncrementSectionType | CountSectionType | ShowNextChapterType | GotoChapterType
): Toc => {
    let item: TocItem, newState: Toc, items: TocItem[], index: number

    switch (action.type) {
        case INCREMENT_SECTION:
            newState = cloneDeep(state)
            item = getChapter(newState, action.item.filename)
            item.bookmark = Math.min(item.bookmark + 1, item.sectionCount)
            return newState

        case COUNT_SECTION:
            newState = cloneDeep(state)
            item = getChapter(newState, action.item.filename)

            item.sectionCount = action.count
            return newState

        case SHOW_NEXT_CHAPTER:
            // Set the item after this one to visible
            newState = cloneDeep(state)
            items = Object.values(newState)

            // Find the item with this filename
            item = getChapter(newState, action.item.filename)
            index = items.indexOf(item)
            if (index < items.length - 1) {
                // Ensure there are more chapters

                // Set all chapters to invisible only in this check
                items.filter((i) => i.visible).forEach((i) => (i.visible = false))

                items[index + 1].visible = true
            }
            return newState

        case GOTO_CHAPTER:
            newState = cloneDeep(state)
            items = Object.values(newState)
            items.filter((i) => i.visible).forEach((i) => (i.visible = false))

            item = getChapter(newState, action.filename)
            item.visible = true
            return newState

        default:
            return state
    }
}

export default undoable(toc)

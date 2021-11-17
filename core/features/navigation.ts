import undoable, { excludeAction } from 'redux-undo'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Toc } from 'core/types'
import { getChapter } from 'core/util'

export enum Next {
    Section = 'SECTION',
    Chapter = 'CHAPTER',
    None = 'NONE'
}
export type NextType = Next | string

export interface IncrementSectionPayload {
    filename: string
}

export interface CountSectionPayload {
    filename: string
    count: number
}

export interface GotoChapterPayload {
    filename: string
}

export interface NavState {
    toc: Toc
}
const initialState: NavState = null

export const navSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        incrementSection: (state, action: PayloadAction<IncrementSectionPayload>) => {
            const { filename } = action.payload
            const item = getChapter(state.toc, filename)

            item.bookmark = Math.min(item.bookmark + 1, item.sectionCount)
        },
        setSectionCount: (state, action: PayloadAction<CountSectionPayload>) => {
            const { filename, count } = action.payload
            const item = getChapter(state.toc, filename)
            item.sectionCount = count
        },
        gotoChapter: (state, action: PayloadAction<GotoChapterPayload>) => {
            const { filename } = action.payload
            const chapters = Object.values(state.toc)
            // Set all currently-visible chapters to not visible
            chapters.filter((i) => i.visible).forEach((i) => (i.visible = false))
            const chapter = getChapter(state.toc, filename)
            chapter.visible = true
        }
    }
})

export const { incrementSection, setSectionCount, gotoChapter } = navSlice.actions

export default undoable(navSlice.reducer, {
    filter: excludeAction('navigation/setSectionCount'),
    syncFilter: true
})

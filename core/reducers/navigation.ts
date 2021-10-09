import undoable from 'redux-undo'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Toc, TocItem } from 'core/types'

import { getChapter } from 'core/util'

export const INCREMENT_SECTION = 'INCREMENT_SECTION'
export const COUNT_SECTION = 'COUNT_SECTION'
export const GOTO_CHAPTER = 'GOTO_CHAPTER'

export enum Next {
    Section = 'SECTION',
    Chapter = 'CHAPTER',
    None = 'NONE'
}

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
    name: 'nav',
    initialState,
    reducers: {
        incrementSection: (state, action: PayloadAction<IncrementSectionPayload>) => {
            const { filename } = action.payload
            const item = getChapter(state.toc, filename)
            item.bookmark = Math.min(item.bookmark + 1, item.sectionCount)
        },
        setSectionCount: (state, action: PayloadAction<CountSectionPayload>) => {
            const { filename, count } = action.payload
            state.toc[filename].sectionCount = count
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

export default undoable(navSlice.reducer)

import {
 TocItem,
} from 'core/types'

export const INCREMENT_SECTION = 'INCREMENT_SECTION'
export const SHOW_NEXT_CHAPTER = 'SHOW_NEXT_CHAPTER'
export const COUNT_SECTION = 'COUNT_SECTION'
export const GOTO_CHAPTER = 'GOTO_CHAPTER'

export enum Next {
  Section = "SECTION",
  Chapter = "CHAPTER",
  None = "NONE",
}

interface IncrementSectionAction {
  type: typeof INCREMENT_SECTION
  item: TocItem
}
export type IncrementSectionType = IncrementSectionAction

interface CountSectionAction {
  type: typeof COUNT_SECTION,
  item: TocItem,
  count: number
}
export type CountSectionType = CountSectionAction

interface ShowNextChapterAction {
  type: typeof SHOW_NEXT_CHAPTER
  item: TocItem
}
export type ShowNextChapterType = ShowNextChapterAction

interface GotoChapterAction {
  type: typeof GOTO_CHAPTER
  filename: string
}
export type GotoChapterType = GotoChapterAction

export const showNextChapter = (item: TocItem): ShowNextChapterType => (
  {
    type: SHOW_NEXT_CHAPTER,
    item,
  }
)
export const gotoChapter = (filename: string): GotoChapterType => (
  {
    type: GOTO_CHAPTER,
    filename,
  }
)
export const incrementSection = (item: TocItem): IncrementSectionType => (
  {
    type: INCREMENT_SECTION,
    item,
  }
)
export const countSections = (item: TocItem, count: number): CountSectionType => (
  {
    type: COUNT_SECTION,
    item,
    count
  }
)
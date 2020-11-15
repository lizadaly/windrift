import {
  IncrementSectionType, INCREMENT_SECTION, COUNT_SECTION, TocItem,
  CountSectionType, ShowNextChapterType, SHOW_NEXT_CHAPTER,
} from '../types'

// TODO add more general case
export const showNextChapter = (item: TocItem): ShowNextChapterType => (
  {
    type: SHOW_NEXT_CHAPTER,
    item,
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
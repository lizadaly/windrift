import { IncrementSectionType, INCREMENT_SECTION, COUNT_SECTION, TocItem, CountSectionType } from '../types'

export function showNextChapter() {
  return {

  }
}

export function incrementSection(item: TocItem): IncrementSectionType {
  return {
    type: INCREMENT_SECTION,
    item,
  }
}
export const countSections = (item: TocItem, count: number): CountSectionType => {
  return {
    type: COUNT_SECTION,
    item,
    count
  }
}
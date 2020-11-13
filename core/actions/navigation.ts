import { Chapter, Section, ShowNextChapterType, ShowNextSectionType, SHOW_NEXT_CHAPTER, SHOW_NEXT_SECTION } from '../types'

export function showNextChapter(chapter?: Chapter): ShowNextChapterType {
  return {
    type: SHOW_NEXT_CHAPTER,
    chapter,
  }
}

export function showNextSection(section?: Section): ShowNextSectionType {
  return {
    type: SHOW_NEXT_SECTION,
    section,
  }
}
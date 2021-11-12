import { useSelector } from 'react-redux'

import { RootState, TocItem } from 'core/types'

/**
 * Get the current chapter from the state. Use this to get access to chapter-level
 * info like the current filename.
 *
 * @returns the current tocItem
 */
const useChapter = (): TocItem => {
    return useSelector((state: RootState) => {
        const chapters = state.navigation.present.toc
        if (chapters) {
            return Object.values(chapters).filter((c) => c.visible)[0]
        }
    })
}
export default useChapter

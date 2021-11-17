import { useSelector } from 'react-redux'

import { Tag, RootState, Option } from 'core/types'

/**
 * Retrieve the values of the requested tags, as an array of options
 * @param tags the array of tags to pull values
 * @returns the list of selected options, which may be undefined
 */
const useInventory = (tags: Tag[]): Option[] => {
    return useSelector((state: RootState) => {
        const inv = state.inventory.present
        const results: Option[] = []
        for (const tag of tags) {
            results.push(inv[tag])
        }
        return results
    })
}
export default useInventory

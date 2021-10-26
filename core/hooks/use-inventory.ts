import { useSelector } from 'react-redux'

import { Tag, RootState, Option } from 'core/types'

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

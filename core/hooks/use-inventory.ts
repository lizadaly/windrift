import { useSelector } from 'react-redux'

import { RootState } from 'core/reducers'
import { Tag } from 'core/types'
import { Option } from 'core/reducers/choice'

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

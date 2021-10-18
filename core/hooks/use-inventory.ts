import { useSelector } from 'react-redux'

import { RootState } from 'core/reducers'
import { Tag } from 'core/types'
import { Option } from 'core/reducers/choice'

const useInventory = (tag: Tag): Option =>
    useSelector((state: RootState) => {
        const inv = state.inventory.present
        if (tag in inv) {
            return inv[tag]
        }
        return null
    })
export default useInventory

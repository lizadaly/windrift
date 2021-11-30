import { shallowEqual, useSelector } from 'react-redux'

import { Tag, RootState, Option } from 'core/types'
import { createSelector } from 'reselect'
import { InventoryState } from 'core/features/inventory'
import React from 'react'

const makeInventorySelector = () =>
    createSelector(
        (state: RootState) => state.inventory.present,
        (state: RootState, tag: Tag) => tag,
        (inv: InventoryState, tag: Tag) => {
            if (tag in inv) {
                return inv[tag]
            }
            return undefined
        },
        {
            memoizeOptions: {
                resultEqualityCheck: shallowEqual
            }
        }
    )
const useInventoryItem = (tag: Tag): Option => {
    const selectInventoryItem = React.useMemo(makeInventorySelector, [])
    return useSelector((state: RootState) => selectInventoryItem(state, tag))
}

/**
 * Retrieve the values of the requested tags, as an array of options
 * @param tags the array of tags to pull values
 * @returns the list of selected options, which may be undefined
 */
const useInventory = (tags: Tag[]): Option[] => {
    return tags.map((t: Tag) => useInventoryItem(t))
}
export default useInventory

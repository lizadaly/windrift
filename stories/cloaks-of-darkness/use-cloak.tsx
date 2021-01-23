import { initChoice, updateInventory } from 'core/actions'
import { RootState } from 'core/reducers'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const CLOAK_STATUS = 'cloak-status'
export enum CloakStatus {
    Worn = 'worn',
    Hung = 'hung',
    Dropped = 'dropped'
}

const useCloak = (): CloakStatus => {
    //const [worn, isWorn] = useState(true) // The cloak is worn by the snake by default
    const inv = useSelector((state: RootState) => state.inventory.present)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!(CLOAK_STATUS in inv)) {
            dispatch(updateInventory(CLOAK_STATUS, CloakStatus.Worn))
        }
    }, [dispatch])
    return (inv[CLOAK_STATUS] as CloakStatus) || null
}
export default useCloak

import { update } from 'core/features/inventory'
import useInventory from 'core/hooks/use-inventory'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export enum CloakStatus {
    Worn = 'worn',
    Hung = 'hung',
    Dropped = 'dropped'
}

const useCloak = (): CloakStatus => {
    const [cloak, pluck] = useInventory(['cloak-status', 'pluck'])
    console.log(`Running use cloak with ${cloak}, ${pluck}`)
    const dispatch = useDispatch()
    useEffect(() => {
        if (cloak) {
            dispatch(update({ tag: 'cloak', option: CloakStatus.Worn }))
        }
        // Condition under which the status changes to hung:
        if (pluck === 'pluck') {
            dispatch(update({ tag: 'cloak-status', option: CloakStatus.Hung }))
        }
    }, [cloak, pluck])
    return (cloak as CloakStatus) || null
}
export default useCloak

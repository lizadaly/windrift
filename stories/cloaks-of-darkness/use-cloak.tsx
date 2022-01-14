import { update, init } from 'core/features/inventory'
import useInventory from 'core/hooks/use-inventory'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export enum CloakStatus {
    Worn = 'worn',
    Hung = 'hung',
    Dropped = 'dropped'
}

const useCloak = (): CloakStatus => {
    const [cloak, wear] = useInventory(['cloak', 'cloak-wear'])
    const dispatch = useDispatch()

    // Set the default status of the Cloak to being hung on the hook
    useEffect(() => {
        dispatch(init({ tag: 'cloak', option: CloakStatus.Hung }))
    }, [])

    useEffect(() => {
        // Condition under which the status changes to hung:
        if (wear) {
            dispatch(update({ tag: 'cloak', option: CloakStatus.Worn }))
        }
    }, [cloak, wear])
    return (cloak as CloakStatus) || null
}
export default useCloak

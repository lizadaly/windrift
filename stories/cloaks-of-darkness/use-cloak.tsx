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
    const [cloak, pluck] = useInventory(['cloak', 'pluck'])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(init({ tag: 'cloak', option: CloakStatus.Worn }))
    }, [])

    useEffect(() => {
        // Condition under which the status changes to hung:
        if (pluck === 'pluck') {
            dispatch(update({ tag: 'cloak', option: CloakStatus.Hung }))
        }
    }, [cloak, pluck])
    return (cloak as CloakStatus) || null
}
export default useCloak

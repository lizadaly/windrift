import { Player } from '@prisma/client'
import React from 'react'
import { MultiplayerContext } from './components/multiplayer'

/**
 * Get a player object from the player name. Useful when comparing against database-derived objects
 * that just carry `id`.
 *
 * @param name
 */
export const playerFromName = (name: string): Player | null => {
    let checkPlayer: Player
    const { otherPlayer, currentPlayer } = React.useContext(MultiplayerContext).multiplayer

    if (otherPlayer.name === name) {
        checkPlayer = otherPlayer
    } else if (currentPlayer.name === name) {
        checkPlayer = currentPlayer
    }
    return checkPlayer
}

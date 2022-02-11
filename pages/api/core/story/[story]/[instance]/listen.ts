// Listen for changes from the other player
import { Choice, Player } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'core/multiplayer/db'

export type ChoiceApiResponse = Choice & {
    player?: Player
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ChoiceApiResponse[]>
): Promise<void> => {
    const instanceId = req.query.instance as string
    const playerId = req.query.playerId as string
    if (req.method === 'GET') {
        const choices = await prisma.choice.findMany({
            where: {
                instanceId,
                playerId
            },
            include: {
                player: true
            },
            orderBy: {
                createdAt: 'asc' // Replay in order
            }
        })
        res.status(200).json(choices)
    } else {
        res.status(405).end()
    }
}

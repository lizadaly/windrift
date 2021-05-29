import { Presence, Player } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'pages/api/db'

export type PresenceApiResponse = {
    presence: Presence
    player: Player
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<void | PresenceApiResponse>
): Promise<void> => {
    const instanceId = req.query.instance as string

    if (req.method === 'POST') {
        const { playerId } = req.body

        await prisma.presence.upsert({
            where: {
                playerId_instanceId: {
                    playerId,
                    instanceId
                }
            },
            update: {
                updatedAt: new Date()
            }, // Just increment the timestamp
            create: {
                playerId,
                instanceId
            }
        })
        res.status(201).end()
    }
    if (req.method === 'GET') {
        const playerId = req.query.playerId as string

        const presence = await prisma.presence.findFirst({
            where: {
                instanceId,
                NOT: {
                    playerId
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                player: true
            }
        })
        res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
        if (presence !== null) {
            res.status(200).json({ presence, player: presence.player })
        } else {
            res.status(404).end()
        }
    }
}

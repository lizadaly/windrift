import { Presence } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'core/multiplayer/db'
import { PresenceState } from 'core/multiplayer/features/presence'

const presence = async (
    req: NextApiRequest,
    res: NextApiResponse<void | PresenceState>
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
        res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')

        const presence = await prisma.presence.findFirst({
            where: {
                instanceId,
                playerId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                player: true
            }
        })
        if (presence === null) {
            res.status(200).end() // FIXME use better handling
        } else {
            res.status(200).json({
                id: presence.id,
                timestamp: presence.createdAt.toUTCString(),
                playerName: presence.player.name
            })
        }
    }
}

export default presence

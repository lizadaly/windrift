import { Presence } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'core/multiplayer/db'

export type PresenceApiResponse = Presence

const presence = async (
    req: NextApiRequest,
    res: NextApiResponse<void | Presence>
): Promise<void | PresenceApiResponse> => {
    const instanceId = req.query.instance as string

    if (req.method === 'POST') {
        const { playerId } = req.body
        try {
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
        } catch {
            // Pass constraint check
            res.status(200).end()
        }
    }
    if (req.method === 'GET') {
        const playerId = req.query.playerId as string

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
            res.status(404).end()
        } else {
            res.status(200).json(presence)
        }
    }
}

export default presence

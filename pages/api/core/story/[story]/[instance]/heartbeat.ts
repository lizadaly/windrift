import { Heartbeat, Player, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export type HeartbeatApiResponse = {
    heartbeat: Heartbeat
    player: Player
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<void | HeartbeatApiResponse>
): Promise<void> => {
    const instanceId = req.query.instance as string

    if (req.method === 'POST') {
        const { playerId } = req.body

        await prisma.heartbeat.upsert({
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
        res.status(201)
    }
    if (req.method === 'GET') {
        const playerId = req.query.playerId as string

        const heartbeat = await prisma.heartbeat.findFirst({
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
        if (heartbeat) {
            res.status(200).json({ heartbeat, player: heartbeat.player })
        } else {
            res.status(404)
        }
    }
}

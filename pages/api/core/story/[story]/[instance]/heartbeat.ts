import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
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
        return res.status(201).json({})
    }
}

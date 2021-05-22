import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (
    req: NextApiRequest,
    res: NextApiResponse<Record<string, never>>
): Promise<void> => {
    const instanceId = req.query.instance as string

    if (req.method === 'POST') {
        const { id, tag, option, playerId } = req.body
        await prisma.choice.create({
            data: {
                id,
                tag,
                option,
                player: {
                    connect: {
                        id: playerId
                    }
                },
                instance: {
                    connect: {
                        id: instanceId
                    }
                }
            }
        })
        res.status(201).json({})
    }
}

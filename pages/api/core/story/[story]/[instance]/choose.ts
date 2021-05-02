import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const instanceId = req.query.instance as string

    if (req.method === 'POST') {
        const { tag, option, playerId } = req.body
        await prisma.choice.create({
            data: {
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
        return res.status(201).json({})
    }
}

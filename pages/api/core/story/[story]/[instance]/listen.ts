// Check whether this is an instance of a new game
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const instanceId = req.query.instance as string
    const playerId = req.query.playerId as string

    const choices = await prisma.choice.findMany({
        where: {
            instanceId,
            NOT: {
                playerId
            }
        }
    })
    return res.status(200).json(choices)
}

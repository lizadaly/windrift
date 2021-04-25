// Check whether this is an instance of a new game
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

// TODO make POST
// Generate a new instance of a game, including both players. Return the instance data.
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const storyId = req.query.story as string
    const story = await prisma.story.findUnique({
        where: {
            id: storyId
        }
    })
    const instance = await prisma.instance.create({
        data: {
            storyId
        }
    })

    const player1 = await prisma.player.create({
        data: {
            name: story.player1Name,
            instanceId: instance.id
        }
    })
    const player2 = await prisma.player.create({
        data: {
            name: story.player2Name,
            instanceId: instance.id
        }
    })
    return res.status(201).json({
        story,
        instance,
        player1,
        player2
    })
}

// Get info about an instance
import { Instance, Player, PrismaClient, Story } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export type StoryApiResponse = {
    story: Story
    instance: Instance
    player1: Player
    player2: Player
}

// Get information about an existing instance of a game
export default async (
    req: NextApiRequest,
    res: NextApiResponse<StoryApiResponse>
): Promise<void> => {
    const instanceId = req.query.instance as string

    const instance = await prisma.instance.findUnique({
        where: {
            id: instanceId
        },
        include: {
            story: true
        }
    })

    const player1 = await prisma.player.findFirst({
        where: {
            instanceId,
            name: instance.story.player1Name
        }
    })
    const player2 = await prisma.player.findFirst({
        where: {
            instanceId,
            name: instance.story.player2Name
        }
    })

    res.status(200).json({
        story: instance.story,
        instance,
        player1,
        player2
    })
}

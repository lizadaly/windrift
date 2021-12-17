// Get info about an instance
import { Instance, Nav, Player, Story } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'core/multiplayer/db'

export type StoryApiResponse = {
    story: Story
    instance: Instance
    player1: Player
    player2: Player
    nav1?: Nav
    nav2?: Nav
}

// Get information about an existing instance of a story
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

    if (!instance) {
        res.status(404).end()
        return
    }

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
    const nav1 = await prisma.nav.findFirst({
        where: {
            playerId: player1.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    const nav2 = await prisma.nav.findFirst({
        where: {
            playerId: player2.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    res.status(200).json({
        story: instance.story,
        instance,
        player1,
        player2,
        nav1,
        nav2
    })
}

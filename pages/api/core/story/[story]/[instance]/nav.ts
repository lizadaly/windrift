import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'core/multiplayer/db'
import { NavEntry } from 'core/multiplayer/features/navigation'

export type NavApiResponse = NavEntry[]

export default async (
    req: NextApiRequest,
    res: NextApiResponse<void | NavApiResponse>
): Promise<void> => {
    const instanceId = req.query.instance as string

    if (req.method === 'POST') {
        const { chapterName, playerId, from } = req.body
        await prisma.nav.create({
            data: {
                chapterName,
                from,
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
        res.status(201).end()
    } else if (req.method === 'GET') {
        const events = await prisma.nav.findMany({
            where: {
                instanceId
            },
            include: {
                player: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        // Clean this up for consumption
        const navs: NavEntry[] = events.map((e) => {
            return {
                id: e.id,
                timestamp: e.createdAt.toUTCString(),
                playerName: e.player.name,
                to: e.chapterName,
                from: e.from
            }
        })
        res.status(200).json(navs)
    } else {
        res.status(405).end()
    }
}

import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'core/multiplayer/db'
import { Nav } from '@prisma/client'

export type NavApiResponse = Nav[]

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
            orderBy: {
                createdAt: 'desc'
            }
        })
        res.status(200).json(events)
    } else {
        res.status(405).end()
    }
}

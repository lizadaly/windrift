import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'core/multiplayer/db'

export default async (
    req: NextApiRequest,
    res: NextApiResponse<Record<string, never>>
): Promise<void> => {
    const instanceId = req.query.instance as string

    if (req.method === 'POST') {
        const { id, tag, option, playerId, next, chapterName } = req.body
        await prisma.choice.create({
            data: {
                id,
                tag,
                option,
                next,
                chapterName,
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
    } else {
        res.status(405).end()
    }
}

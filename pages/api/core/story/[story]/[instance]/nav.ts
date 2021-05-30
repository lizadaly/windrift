import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'pages/api/db'

export default async (req: NextApiRequest, res: NextApiResponse<void>): Promise<void> => {
    const instanceId = req.query.instance as string

    if (req.method === 'POST') {
        const { chapterName, playerId } = req.body
        await prisma.nav.create({
            data: {
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

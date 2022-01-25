/**
 * Create a singleton instance of the story in the database
 *
 * This is normally called during `getStaticProps` but can be called
 * independently, as in the test harness
 */
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'core/multiplayer/db'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === 'POST') {
        const { id, title, player1Name, player2Name } = req.body
        console.log(req.body)
        await prisma.story.upsert({
            where: {
                id
            },
            update: {
                title,
                player1Name,
                player2Name
            },
            create: {
                id,
                title,
                player1Name,
                player2Name
            }
        })
        res.status(201).end()
    }
}

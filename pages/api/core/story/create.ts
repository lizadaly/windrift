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
        createStory(id, title, player1Name, player2Name)

        res.status(201).end()
    }
}

export const createStory = async (
    id: string,
    title: string,
    player1Name: string,
    player2Name: string
): Promise<void> => {
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
}

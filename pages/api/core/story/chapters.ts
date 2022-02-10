/**
 * Create chapter objects for each chapter in the story
 *
 * This is normally called during `getStaticProps` but can be called
 * independently, as in the test harness
 */
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'core/multiplayer/db'
import { TocItem } from 'core/types'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === 'POST') {
        const { id, chapters } = req.body
        createChapters(id, chapters)
        res.status(201).end()
    }
}

export const createChapters = async (id: string, chapters: TocItem[]): Promise<void> => {
    await Promise.all(
        chapters.map((item: TocItem) =>
            prisma.chapter.upsert({
                where: {
                    filename_storyId: { filename: item.filename, storyId: id }
                },
                update: {
                    title: item.title,
                    filename: item.filename
                },
                create: {
                    filename: item.filename,
                    title: item.title,
                    storyId: id
                }
            })
        )
    )
}

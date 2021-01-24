import type { NextApiRequest, NextApiResponse } from 'next'
import { initPusher } from './util'

// POST a nav to a new chapter to the current channel

export default (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method === 'POST') {
        const pusher = initPusher()
        const { chapterName, channel, player } = req.body
        if (!channel) {
            console.log('No channel name defined')
            res.status(404)
        } else {
            const timestamp = new Date()
            pusher.trigger(channel, 'nav', { chapterName, player, timestamp }).then(() => {
                res.status(200).json({})
            })
        }
    }
}

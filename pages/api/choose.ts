import type { NextApiRequest, NextApiResponse } from 'next'
import * as Pusher from "pusher"

// POST a choice to the current channel
// TODO should this return anything?
// TODO something something error handling?

export default (req: NextApiRequest, res: NextApiResponse): void => {

    if (req.method === 'POST') {
        const {
            PUSHER_APP_ID,
            NEXT_PUBLIC_PUSHER_KEY,
            PUSHER_SECRET,
            NEXT_PUBLIC_PUSHER_CLUSTER
        } = process.env
        const pusher = Pusher.forCluster(NEXT_PUBLIC_PUSHER_CLUSTER, {
            appId: PUSHER_APP_ID,
            key: NEXT_PUBLIC_PUSHER_KEY,
            secret: PUSHER_SECRET,
        })
        const { channel, tag, choice, player } = req.body
        const timestamp = new Date()
        pusher.trigger(channel, 'choose', { tag, choice, player, timestamp })
            .then(() => {
                res.status(200).json({})
            })
    }
}

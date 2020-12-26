import type { NextApiRequest, NextApiResponse } from 'next'
import * as Pusher from "pusher"

// TODO this should be POST
export default (req: NextApiRequest, res: NextApiResponse): void => {

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
    const { channel, tag, choice, player } = req.query
    pusher.trigger(channel, 'choose', { tag, choice, player })
        .then(() => {
            res.status(200).json({})
        })

}

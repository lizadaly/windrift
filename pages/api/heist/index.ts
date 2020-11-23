import type { NextApiRequest, NextApiResponse } from 'next'
import * as Pusher from "pusher"

export default (req: NextApiRequest, res: NextApiResponse) => {

    const {
        PUSHER_APP_ID: appId,
        PUSHER_KEY: key,
        PUSHER_SECRET: secret,
        PUSHER_CLUSTER: cluster
    } = process.env
    const pusher = Pusher.forCluster(cluster, {
        appId,
        key,
        secret,
    })
    pusher.trigger('heist-game', 'event-name', { message: "hello world" })
        .then(resp => {
            res.status(200).end('sent event successfully')
        })
    return res
}

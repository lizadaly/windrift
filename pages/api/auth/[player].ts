import type { NextApiRequest, NextApiResponse } from 'next'
import * as Pusher from "pusher"

// Authorize a user to Pusher

// Username is just channel + '-' + player number

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
            useTLS: true
        })
        const { channel_name, socket_id } = req.body
        const { player } = req.query
        const channelData = {
            user_id: `${channel_name}--${player}`
        }
        const auth = pusher.authenticate(socket_id, channel_name, channelData)
        res.send(auth)
    }
}

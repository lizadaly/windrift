import type { NextApiRequest, NextApiResponse } from 'next'
import * as Pusher from "pusher"

export default (req: NextApiRequest, res: NextApiResponse): void => {

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
        useTLS: true,
        authEndpoint: '/api/pusher/auth'
    })
    app.post("/pusher/auth", function (req, res) {
        const socketId = req.body.socket_id;
        const channel = req.body.channel_name;
        const auth = pusher.authenticate(socketId, channel);
        res.send(auth);
    });
    pusher.trigger('heist-game', 'event-name', { message: "hello world" })
        .then(resp => {
            res.status(200).json({ name: 'success' })
        })
}

import Pusher from 'pusher'

export function initPusher(): Pusher {
    const {
        PUSHER_APP_ID,
        NEXT_PUBLIC_PUSHER_KEY,
        PUSHER_SECRET,
        NEXT_PUBLIC_PUSHER_CLUSTER
    } = process.env
    const pusher = Pusher.forCluster(NEXT_PUBLIC_PUSHER_CLUSTER, {
        appId: PUSHER_APP_ID,
        key: NEXT_PUBLIC_PUSHER_KEY,
        secret: PUSHER_SECRET
    })
    return pusher
}

import { Multiplayer } from 'core/actions/multiplayer'
import { Config } from 'core/types'
import { Instance, Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createStoryInstance = async (
    currentPlayer: string,
    multiplayer: Multiplayer,
    config: Config
): Promise<Instance> => {
    // Create a new Instance of a game and assign the players
    const instance = await prisma.instance.create({
        data: { storyId: config.identifier }
    })
    return instance
}

export const populateMultiplayer = async (
    currentPlayer: string,
    multiplayer: Multiplayer,
    config: Config,
    channelName: string
): Promise<void> => {
    const instance = await prisma.instance.findUnique({
        where: { id: channelName }
    })
    const gameUrl =
        window.location.protocol +
        '//' +
        window.location.hostname +
        (window.location.port ? ':' + window.location.port : '') +
        window.location.pathname
    multiplayer.channelName = instance.id
    multiplayer.gameUrl = gameUrl
    multiplayer.currentPlayer = currentPlayer
    multiplayer.ready = true
}

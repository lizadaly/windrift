import undoable, { excludeAction } from 'redux-undo'
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { update as updateInventory } from 'core/features/inventory'
import { update as logUpdate } from 'core/features/log'
import { Tag, ENTRY_TYPES, Next, Config, NextType, RootState } from 'core/types'
import { gotoChapter, incrementSection } from 'core/features/navigation'
import { increment } from 'core/features/counter'
import { Player } from '@prisma/client'
import { emitChoice, emitNavChange } from 'core/multiplayer/api-client'

export type Option = string
export type OptionGroup = Array<Option>
export type Options = Array<OptionGroup>

// A Choice is composed of a Tag and Options
// Options are one or more OptionGroups
// An OptionGroup is an array of one or more

export interface ChoiceState {
    [tag: Tag]: {
        index: number
        lastIndex: number
        resolved: boolean
    }
}

interface InitChoicePayload {
    tag: Tag
    lastIndex: number
}
interface OptionAdvancePayload {
    tag: Tag
}

const initialState: ChoiceState = null

export interface MultiplayerChoicePayload {
    eventPlayer: Player
    currentPlayer: Player
    identifier: string
    instanceId: string
    sync: boolean
    syncNext: boolean
    choiceId?: string
}
export const makeChoice =
    (
        tag: Tag,
        option: Option,
        next?: NextType,
        filename?: string,
        multiplayer?: MultiplayerChoicePayload
    ) =>
    (dispatch: Dispatch, getState: () => RootState, config: Config): void => {
        const choiceId = multiplayer?.choiceId || uuidv4()

        dispatch(updateInventory({ tag, option }))
        dispatch(advance({ tag }))
        dispatch(
            logUpdate({
                entry: {
                    id: choiceId,
                    tag,
                    option,
                    entry: ENTRY_TYPES.Choice,
                    timestamp: new Date().toUTCString(),
                    playerName: multiplayer?.eventPlayer?.name
                }
            })
        )
        const state = getState()
        const { counter, choices } = state

        const { resolved } = choices.present[tag]

        // If we've now exhausted the list of possible choices, invoke `next`
        if (resolved) {
            if (next === Next.Section) {
                dispatch(incrementSection({ filename }))
            } else if (next === Next.None) {
                // no-op
            } else if (typeof next === 'string') {
                dispatch(gotoChapter({ filename: next }))
                if (multiplayer) {
                    emitNavChange(
                        multiplayer.identifier,
                        next,
                        multiplayer.instanceId,
                        multiplayer.currentPlayer.id
                    )
                }
            }
            if (multiplayer && multiplayer.eventPlayer === multiplayer.currentPlayer) {
                emitChoice(
                    choiceId,
                    tag,
                    option,
                    multiplayer.syncNext ? next : null,
                    filename,
                    multiplayer.identifier,
                    multiplayer.instanceId,
                    multiplayer.currentPlayer,
                    multiplayer.sync
                )
            }
        }

        // Update browser do/redo
        const s = {}
        s[config.identifier] = counter.present.value
        window.history.pushState(s, `Turn: ${counter}`, null)

        dispatch(increment())
    }

export const choicesSlice = createSlice({
    name: 'choices',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<InitChoicePayload>) => {
            const { tag, lastIndex } = action.payload
            state[tag] = {
                index: tag in state ? state[tag].index : 0,
                resolved: tag in state ? state[tag].resolved : false,
                lastIndex
            }
        },
        // Advance to the next option group if one is available
        advance: (state, action: PayloadAction<OptionAdvancePayload>) => {
            const { tag } = action.payload

            if (tag in state) {
                if (state[tag].index + 1 > state[tag].lastIndex) {
                    // This would advance us past the boundary, so mark resolved
                    state[tag].resolved = true
                } else {
                    state[tag].index = state[tag].index + 1
                }
            } else {
                // If state was uninitialized here, this was a manual update, so simply
                // initialize and mark resolved
                state[tag] = {
                    resolved: true,
                    index: 0,
                    lastIndex: 0
                }
            }
        }
    }
})

export const { init, advance } = choicesSlice.actions

export default undoable(choicesSlice.reducer, {
    filter: excludeAction('choices/init'),
    syncFilter: true
})

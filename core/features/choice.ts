import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import { CombinedState, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { InventoryState, update as updateInventory } from 'core/features/inventory'
import { LogState, update as logUpdate } from 'core/features/log'
import { Tag, ENTRY_TYPES, Next, Config, NextType, RootState } from 'core/types'
import { gotoChapter, incrementSection, NavState } from 'core/features/navigation'
import { CounterState, increment } from 'core/features/counter'

export type Option = string
export type OptionGroup = Array<Option>

export interface NextPayload {
    next: NextType
    filename: string
}
export const makeChoice =
    (tag: Tag, option?: Option, nextPayload?: NextPayload) =>
    (dispatch: Dispatch, getState: () => RootState, config: Config): void => {
        const choiceId = uuidv4()
        const state = getState()
        const { counter } = state
        if (option) {
            dispatch(updateInventory({ tag, option }))
        }
        dispatch(
            logUpdate({
                entry: {
                    id: choiceId,
                    tag,
                    option,
                    entry: ENTRY_TYPES.Choice,
                    timestamp: new Date().toLocaleDateString()
                }
            })
        )
        // If we've now exhausted the list of possible choices, invoke `next`
        if (nextPayload) {
            const { next, filename } = nextPayload
            if (next === Next.Section) {
                dispatch(incrementSection({ filename }))
            } else if (next === Next.None) {
                // no-op
            } else if (typeof next === 'string') {
                dispatch(gotoChapter({ filename: next }))
            }
        }

        // Update browser do/redo
        const s = {}
        s[config.identifier] = counter.present.value
        window.history.pushState(s, `Turn: ${counter}`, null)

        dispatch(increment())
    }

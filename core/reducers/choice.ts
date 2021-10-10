import undoable, { excludeAction } from 'redux-undo'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Tag } from 'core/types'

export type Option = string
export type OptionGroup = Array<Option>
export type Options = Array<OptionGroup>

// A Choice is composed of a Tag and Options
// Options are one or more OptionGroups
// An OptionGroup is an array of one or more Options

export interface ChoiceState {
    [tag: Tag]: {
        readonly initialOptions: Options
        options: Options
    }
}

interface InitChoicePayload {
    tag: Tag
    options: Options
}
interface OptionAdvancePayload {
    tag: Tag
}

const initialState: ChoiceState = null

export const choicesSlice = createSlice({
    name: 'choices',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<InitChoicePayload>) => {
            const { tag, options } = action.payload
            if (!(tag in state)) {
                state[tag] = {
                    options,
                    initialOptions: options
                }
            }
        },
        // Advance to the next option group. If no next group is available, do nothing
        advance: (state, action: PayloadAction<OptionAdvancePayload>) => {
            const { tag } = action.payload
            state[tag].options.shift()
        }
    }
})

export const { init, advance } = choicesSlice.actions

export default undoable(choicesSlice.reducer, { filter: excludeAction('choices/init') })

import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { TocItem, WidgetType } from 'core/types'
import { OptionsType } from 'core/actions/choice'
import { RootState } from 'core/reducers'
import {
    initChoice,
    logChoice,
    updateInventory,
    pickOption,
    incrementSection,
    updateStateCounter,
    showNextChapter
} from 'core/actions'
import { gotoChapter, Next } from 'core/actions/navigation'

import { ChapterContext } from './chapter'
import InlineList from './widgets/inline-list'
import { ENTRY_TYPES } from 'core/actions/log'
import { emitChoice } from 'core/multiplayer/api-client'

export interface ChoiceProps {
    options: OptionsType
    tag: string
    /** At completion of the choice list, go to the Next section/chapter, go to the named chapter (if a string) or do nothing*/
    next?: Next | string
    widget?: WidgetType
    /** Arbitrary arguments passed unchanged to the underlying widget */
    extra?: Record<string, unknown>
    /** Whether to sync this choice in a multiplayer game, @defaultValue true */
    sync?: boolean
    /** Whether to retain the last choice as a hyperlink, as for navigation. @defaultValue false */
    persist?: boolean
}

const Choices = ({
    options,
    tag,
    extra,
    widget = InlineList,
    next = Next.Section,
    sync = true,
    persist = false
}: ChoiceProps): JSX.Element => {
    const { instanceId, currentPlayer } = useSelector((state: RootState) => state.multiplayer)
    const dispatch = useDispatch()
    const item: TocItem = React.useContext(ChapterContext)
    const newOptions = useSelector((state: RootState) => {
        const c = state.choices.present
        if (c && tag in c) {
            return c[tag]
        }
    })

    const identifier = useSelector((state: RootState) => state.config.identifier)
    const counter = useSelector((state: RootState) => state.counter.present)

    // Get the original picks either from props or from the state
    const initialOptions = newOptions ? newOptions.initialOptions : options

    // On first render, record the initial options
    React.useEffect(() => {
        dispatch(initChoice(tag, options))
    }, [dispatch])
    options = newOptions && newOptions.options.length > 0 ? newOptions.options : options

    const handler = (e: React.MouseEvent, index: number): void => {
        e.preventDefault()
        const target = e.target as HTMLInputElement
        const option = target.textContent
        const choiceId = uuidv4()
        dispatch(updateInventory(tag, option))
        dispatch(pickOption(tag, options, index, currentPlayer))
        dispatch(
            logChoice({
                id: choiceId,
                tag,
                selection: option,
                entry: ENTRY_TYPES.Choice,
                timestamp: new Date(),
                playerName: currentPlayer ? currentPlayer.name : ''
            })
        )

        // TODO pull this out into a listener hook
        if (currentPlayer && sync) {
            emitChoice(choiceId, identifier, tag, option, instanceId, currentPlayer)
        }

        if (options.length === 1) {
            if (next === Next.Section) {
                dispatch(incrementSection(item))
            } else if (next === Next.Chapter) {
                dispatch(showNextChapter(item))
            } else if (next === Next.None) {
                // no-op
            } else if (typeof next === 'string') {
                dispatch(gotoChapter(next))
            }
        }
        const s = {}
        s[identifier] = counter
        window.history.pushState(s, `Turn: ${counter}`, null)

        dispatch(updateStateCounter())
    }

    const group = options[0]
    const W = widget
    return (
        <W
            group={group}
            handler={group.length > 1 || persist ? handler : null}
            initialOptions={initialOptions}
            {...extra}
        />
    )
}

export default Choices
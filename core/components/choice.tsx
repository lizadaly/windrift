import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { WidgetType } from 'core/types'
import { OptionsType } from 'core/actions/choice'
import { RootState } from 'core/reducers'
import { initChoice, logChoice, pickOption, incrementSection } from 'core/actions'
import { increment } from 'core/reducers/counter'
import { gotoChapter, Next } from 'core/actions/navigation'

import { ChapterContext } from './chapter'
import InlineList from './widgets/inline-list'
import { ENTRY_TYPES } from 'core/actions/log'
import { update as updateInventory } from 'core/reducers/inventory'

export interface ChoiceProps {
    options: OptionsType
    tag: string
    /** At completion of the choice list, go to the Next section/chapter, go to the named chapter (if a string) or do nothing*/
    next?: Next | string
    widget?: WidgetType
    /** Arbitrary arguments passed unchanged to the underlying widget */
    extra?: Record<string, unknown>
    /** Whether to retain the last choice as a hyperlink, as for navigation. @defaultValue false */
    persist?: boolean
    /** Text to display last (at completion) instead of the default last-chosen item  */
    last?: string
}

const Choices = ({
    options,
    tag,
    extra,
    widget = InlineList,
    next = Next.Section,
    persist = false,
    last = null
}: ChoiceProps): JSX.Element => {
    const dispatch = useDispatch()
    const { filename } = React.useContext(ChapterContext)
    const newOptions = useSelector((state: RootState) => {
        const c = state.choices.present
        if (c && tag in c) {
            return c[tag]
        }
    })

    const identifier = useSelector((state: RootState) => state.config.identifier)
    const counter = useSelector((state: RootState) => state.counter.present.value)

    // Get the original picks either from props or from the state
    const initialOptions = newOptions ? newOptions.initialOptions : options

    // On first render, record the initial options
    React.useEffect(() => {
        dispatch(initChoice(tag, options))
    }, [dispatch, options])

    const computedOptions =
        newOptions && newOptions.options.length > 0 ? newOptions.options : options

    const handler = (e: React.MouseEvent, index: number): void => {
        e.preventDefault()
        const target = e.target as HTMLInputElement
        const selection = target.textContent
        const choiceId = uuidv4()
        dispatch(updateInventory({ tag, selection }))
        dispatch(pickOption(tag, computedOptions, index))
        dispatch(
            logChoice({
                id: choiceId,
                tag,
                selection,
                entry: ENTRY_TYPES.Choice,
                timestamp: new Date()
            })
        )

        if (computedOptions.length === 1) {
            if (next === Next.Section) {
                dispatch(incrementSection(filename))
            } else if (next === Next.None) {
                // no-op
            } else if (typeof next === 'string') {
                dispatch(gotoChapter(next))
            }
        }
        const s = {}
        s[identifier] = counter
        window.history.pushState(s, `Turn: ${counter}`, null)

        dispatch(increment())
    }

    const group = computedOptions[0].length == 1 && last ? [last] : computedOptions[0]
    const W = widget
    return (
        <W
            group={group}
            handler={group.length > 1 || persist ? handler : null}
            initialOptions={initialOptions}
            tag={tag}
            {...extra}
        />
    )
}

export default Choices

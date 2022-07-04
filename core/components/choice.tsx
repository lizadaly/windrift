import * as React from 'react'

import {
    WidgetType,
    Next,
    Option,
    Options,
    NextType,
    useAppDispatch,
    useAppSelector
} from 'core/types'

import { ChapterContext } from 'core/components/chapter'
import { InlineListEN } from 'core/components/widgets/inline-list'

import { init, makeChoice } from 'core/features/choice'
import { init as initInventory } from 'core/features/inventory'

import useInventory from 'core/hooks/use-inventory'

export interface ChoiceProps {
    tag: string
    options: Options
    /** At completion of the choice list, go to the Next section/chapter, go to the named chapter (if a string) or do nothing */
    next?: NextType
    widget?: WidgetType
    /** Arbitrary arguments passed unchanged to the underlying widget */
    extra?: Record<string, unknown>
    /** Text to display last (when resolved) instead of the default last-chosen item  */
    last?: Option
    /** Default option to prepopulate the inventory */
    defaultOption?: Option
    /** Whether to retain the last choice as a hyperlink, as for navigation. @defaultValue false */
    persist?: boolean
    /** Optional className to be passed through to the outer-most element rendering the Choice */
    className?: string
}

const Choice = ({
    options,
    tag,
    extra,
    widget = InlineListEN,
    next = Next.Section,
    persist = false,
    last = null,
    defaultOption = null,
    className = null
}: ChoiceProps): JSX.Element => {
    const dispatch = useAppDispatch()
    const choice = useAppSelector((state) => {
        return state.choices.present
    })
    React.useEffect(() => {
        dispatch(init({ tag, lastIndex: options.length - 1 }))
        dispatch(initInventory({ tag, option: defaultOption }))
    }, [dispatch])

    if (tag in choice) {
        return (
            <MutableChoice
                options={options}
                tag={tag}
                extra={extra}
                widget={widget}
                next={next}
                persist={persist}
                last={last}
                className={className}
            />
        )
    }
    return null
}

const MutableChoice = ({
    tag,
    options,
    extra,
    widget,
    next,
    persist,
    last,
    className
}: ChoiceProps): JSX.Element => {
    const dispatch = useAppDispatch()
    const { filename } = React.useContext(ChapterContext)

    const choice = useAppSelector((state) => {
        return state.choices.present[tag]
    })
    const [inventory] = useInventory([tag])

    // Generic handler that a widget-specific handler will call once the player has made their choice
    let handler = (option: Option): void => {
        dispatch(makeChoice(tag, option, next, filename))
    }
    let group = options[choice.index]

    // If a choice is resolved, it will have no handler. If `last` is defined, display that instead of the
    // current option
    if (choice.resolved) {
        if (!persist) {
            handler = null
        }
        if (last !== undefined && last !== null) {
            group = [last]
        } else {
            group = [inventory]
        }
    }

    return React.createElement(widget, {
        group,
        handler,
        tag,
        initialOptions: options,
        className,
        ...extra
    })
}

export default Choice

import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import {
    WidgetType,
    RootState,
    Next,
    ENTRY_TYPES,
    Option,
    Options,
    OptionGroup,
    NextType
} from 'core/types'
import { increment } from 'core/features/counter'
import { gotoChapter, incrementSection } from 'core/features/navigation'

import { ChapterContext } from 'core/components/chapter'
import { InlineListEN } from 'core/components/widgets/inline-list'
import { update as updateInventory } from 'core/features/inventory'
import { update as logUpdate } from 'core/features/log'
import { init, advance, makeChoice } from 'core/features/choice'
import { StoryContext } from 'pages/[story]/[[...chapter]]'

interface MutableChoiceProps {
    tag: string
    /** At completion of the choice list, go to the Next section/chapter, go to the named chapter (if a string) or do nothing */
    next?: NextType
    widget?: WidgetType
    /** Arbitrary arguments passed unchanged to the underlying widget */
    extra?: Record<string, unknown>
    /** Text to display first (at start) instead of the options list */
    first?: Option
    /** Text to display last (at completion) instead of the default last-chosen item  */
    last?: Option
    /** Whether to retain the last choice as a hyperlink, as for navigation. @defaultValue false */
    persist?: boolean
    /** Optional className to be passed through to the outer-most element rendering the Choice */
    className?: string
}
export interface ChoiceProps extends MutableChoiceProps {
    options: OptionGroup
    /** Default value to populate the inventory without firing the Choice */
    defaultOption?: Option
}

const Choice = ({
    options,
    tag,
    extra,
    widget = InlineListEN,
    next = Next.Section,
    persist = false,
    first = null,
    defaultOption = null,
    last = null,
    className = null
}: ChoiceProps): JSX.Element => {
    const dispatch = useDispatch()
    const [initialized, initialize] = React.useState(false)

    // On first render, record the initial options, then render the choice list
    React.useEffect(() => {
        let o: Options = [options]
        if (first) {
            o = [[first, null], [...options]]
        }

        dispatch(init({ tag, options: o }))

        if (defaultOption) {
            dispatch(updateInventory({ tag, option: defaultOption }))
        }
        initialize(true)
    }, [dispatch])

    if (initialized) {
        return (
            <MutableChoice
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
    extra,
    widget,
    next,
    persist,
    last,
    className
}: MutableChoiceProps): JSX.Element => {
    const dispatch = useDispatch()
    const { filename } = React.useContext(ChapterContext)
    const { config } = React.useContext(StoryContext)

    const counter = useSelector((state: RootState) => state.counter.present.value)
    const inventory = useSelector((state: RootState) => state.inventory.present)

    const choice = useSelector((state: RootState) => {
        return state.choices.present[tag]
    })

    // Short-circuit if we got here via forward/back before the state is rehydrated
    // Ideally this could be prevented!
    if (!choice) {
        return null
    }

    // Generic handler that a widget-specific handler will call once the player has made their choice
    const handler = (option: Option): void => {
        dispatch(makeChoice(tag, option, next, filename))
    }

    let group: OptionGroup = undefined

    if (choice.options.length === 0) {
        // We've exhausted the choice list. If a `last` prop was defined, display
        // that. Otherwise display the inventory item.
        group = last ? [last] : [inventory[tag]]
    } else {
        group = choice.options[0]
    }

    return React.createElement(widget, {
        group,
        handler: group.length > 1 || persist ? handler : null,
        tag,
        initialOptions: choice.initialOptions,
        className,
        ...extra
    })
}

export default Choice

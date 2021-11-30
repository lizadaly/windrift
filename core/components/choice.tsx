import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { WidgetType, RootState, Next, Option, Options, NextType } from 'core/types'

import { ChapterContext } from 'core/components/chapter'
import { InlineListEN } from 'core/components/widgets/inline-list'

import { init, makeChoice, MultiplayerChoicePayload } from 'core/features/choice'
import { init as initInventory } from 'core/features/inventory'

import useInventory from 'core/hooks/use-inventory'
import { StoryContext } from 'pages/[story]/[[...chapter]]'

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
    /** For Multiplayer only, has no effect in single-player: whether to sync this choice to the remote player */
    sync?: boolean
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
    className = null,
    sync = true
}: ChoiceProps): JSX.Element => {
    const dispatch = useDispatch()
    const choice = useSelector((state: RootState) => {
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
                sync={sync}
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
    className,
    sync
}: ChoiceProps): JSX.Element => {
    const dispatch = useDispatch()
    const { filename } = React.useContext(ChapterContext)
    const { config } = React.useContext(StoryContext)

    const choice = useSelector((state: RootState) => {
        return state.choices.present[tag]
    })
    const multiplayer = useSelector((state: RootState) => {
        return state.multiplayer?.multiplayer
    })
    const [inventory] = useInventory([tag])

    const multiplayerPayload: MultiplayerChoicePayload = multiplayer?.currentPlayer
        ? {
              eventPlayer: multiplayer.currentPlayer,
              currentPlayer: multiplayer.currentPlayer,
              identifier: config.identifier,
              instanceId: multiplayer.instanceId,
              sync
          }
        : null

    // Generic handler that a widget-specific handler will call once the player has made their choice
    let handler = (option: Option): void => {
        dispatch(makeChoice(tag, option, next, filename, multiplayerPayload))
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

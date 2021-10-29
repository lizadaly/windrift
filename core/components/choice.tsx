import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { isEqual } from 'lodash'

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
import { makeChoice, NextPayload } from 'core/features/choice'
import { StoryContext } from 'pages/[story]/[[...chapter]]'
import useInventory from 'core/hooks/use-inventory'
import { R } from '.'
import { useEffect } from 'hoist-non-react-statics/node_modules/@types/react'

interface ChoiceProps {
    tag: string
    options: OptionGroup
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

interface Group {
    group: OptionGroup
    type: OptionGroupType
}
enum OptionGroupType {
    first = 'FIRST',
    options = 'OPTIONS',
    last = 'LAST'
}
const Choice = ({
    options,
    tag,
    extra,
    widget = InlineListEN,
    next = Next.Section,
    persist = false,
    first = null,
    last = null,
    className = null
}: ChoiceProps): JSX.Element => {
    const dispatch = useDispatch()
    const { filename } = React.useContext(ChapterContext)

    const [inventory] = useInventory([tag])

    const setInitialGroup = (): Group => {
        // Set the initial group based on the store
        // if inventory is set, then set the group and type to be in the resolved state
        if (inventory) {
            return {
                group: [last || inventory],
                type: pickNextType(OptionGroupType.options) || OptionGroupType.options
            }
        }
        return {
            group: pickGroupByPropType(pickNextType(), options),
            type: pickNextType()
        }
    }
    const pickNextType = (lastType?: OptionGroupType): OptionGroupType => {
        switch (lastType) {
            case OptionGroupType.first: {
                return OptionGroupType.options
            }
            case OptionGroupType.options: {
                if (last) {
                    return OptionGroupType.last
                }
                return null
            }
            case OptionGroupType.last: {
                return null
            }
            default: {
                // If unset, pick first available
                if (first) {
                    return OptionGroupType.first
                }
                return OptionGroupType.options
            }
        }
    }
    const pickGroupByPropType = (
        propType: OptionGroupType,
        defaultOption: OptionGroup
    ): OptionGroup => {
        switch (propType) {
            case OptionGroupType.first:
                return [first]
            case OptionGroupType.options:
                return options
            case OptionGroupType.last:
                return [last]
            default:
                return defaultOption
        }
    }

    const [group, setGroup] = React.useState<Group>(() => setInitialGroup())

    const [isComplete, setIsComplete] = React.useState(!!inventory)

    const handler = (picked: Option) => {
        const option = group.type == OptionGroupType.options ? picked : null
        const nextPayload: NextPayload = pickNextType(group.type) ? null : { next, filename }
        dispatch(makeChoice(tag, option, nextPayload))
        setGroup((prevGroup) => {
            const type = pickNextType(prevGroup.type)
            console.log(`setting group for ${tag} with current type as ${type}`)
            return {
                group: pickGroupByPropType(type, [picked]),
                type
            }
        })
        if (!pickNextType(group.type)) {
            setIsComplete(true)
        }
    }
    console.log(`rendering ${tag} with current group as ${group.type}`)

    return React.createElement(widget, {
        group: group.group,
        handler,
        tag,
        initialOptions: options,
        className,
        isComplete,
        ...extra
    })
}

export default Choice

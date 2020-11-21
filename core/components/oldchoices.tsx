import * as React from "react"
import { connect, ConnectedProps } from 'react-redux'

import * as actions from '../actions'
import { RootState } from '../reducers'
import { Callback, Tag, WidgetType, ChoicesType } from '../types'
import { ChapterContext } from './chapter'

// Special value to match the last selection by the user
const MATCH_LAST = '_last'

/* An array of choices that can be "examined." Accepts an array and
reveals items one-by-one. Arrays may be nested one-level deep; if the current
item is an array, each value will be displayed separated by commas and ending
with "and". When only one item remains, nextUnit is fired (which may be null)
in which case no event is triggered.

Each time an choice is revealed, onSetchoices is called and onUpdateInventory
sets the inventory property `key` to the current selected value. */
interface OwnProps {
    choices: ChoicesType
    tag: Tag
}

interface ChoiceProps extends PropsFromRedux, OwnProps {
    widget: WidgetType,
    persistLast: boolean,
    nextUnit?: 'chapter' | 'section' | 'none',
}

interface ChoiceState {
    onComplete?: Callback,
}

class Choices extends React.Component<ChoiceProps, ChoiceState> {

    constructor(props: ChoiceProps) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    static contextType = ChapterContext


    handleChange(e: React.MouseEvent) {
        e.preventDefault()
        const target = e.target as HTMLInputElement;
        const item = this.context

        const { nextUnit = "section", lastSelection, onCompleteChapter, onSetChoices, onUpdateInventory,
            onCompleteSection, currentChoice, counter, identifier, onUpdateCounter, choices, tag } = this.props

        // Move the choice counter by one unless we're already there
        const atLastchoice = currentChoice === choices.length - 1
        const newChoice = !atLastchoice ? currentChoice + 1 : currentChoice

        onSetChoices(choices, tag, newChoice)


        // Set the inventory property to be the value of what the user selected, unless
        // the special key "_last" (MATCH_LAST) was provided, in which case use the last item
        // set in the inventory (as determined by mapStateToProps)
        let userSelection = target.textContent
        if (target.textContent === MATCH_LAST) {
            userSelection = lastSelection
        }

        onUpdateInventory(tag, userSelection)

        // Are we at the last set? If so, there may be some events to fire
        if (!atLastchoice && newChoice === choices.length - 1) {
            if (nextUnit === 'chapter') {
                onCompleteChapter(item)
            } else if (nextUnit === 'section') {
                onCompleteSection(item)
            } else {
                // The no-op version just expands in place (usually because another selector
                // will do the choice)
            }
        }

        const s = {}
        s[identifier] = counter
        window.history.pushState(s, `Turn: ${counter}`, null)

        // Update the counter in the global store
        onUpdateCounter()
    }

    render() {
        const { currentChoice, choices, lastSelection, persistLast = false, widget } = this.props

        let text = choices[currentChoice]
        const atLastChoice = currentChoice === choices.length - 1

        // If this is MATCH_LAST, don't actually show that property, show the value of last selection
        if (text === MATCH_LAST && atLastChoice) {
            text = lastSelection
        }
        // Create an onclick handler if we're at the last choice and/or persisting the last item
        const handler = persistLast || !atLastChoice ? this.handleChange : null

        const Widget = widget as WidgetType
        return <Widget choices={choices} handler={handler} />
    }
}


const mapState = (state: RootState, ownProps: OwnProps) => {
    const choices = state.choices.present
    const inventory = state.inventory.present
    const { tag } = ownProps

    let currentChoice = 0
    let lastSelection: string = undefined

    if (tag in choices && 'currentChoice' in choices[tag]) {
        currentChoice = choices[tag].currentChoice
    }

    if (tag in inventory) {
        lastSelection = inventory[tag]
    }
    return {
        currentChoice,
        counter: state.counter.present,
        identifier: state.config.identifier,
        lastSelection,
    }
}
const mapDispatch = {
    onSetChoices: actions.setChoices,
    onUpdateInventory: actions.updateInventory,
    onCompleteSection: actions.incrementSection,
    onCompleteChapter: actions.showNextChapter,
    onUpdateCounter: actions.updateStateCounter,
}


const connector = connect(
    mapState,
    mapDispatch
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Choices)
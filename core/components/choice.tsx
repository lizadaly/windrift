import * as React from "react"
import { connect, ConnectedProps } from 'react-redux'

import { iteratedList } from '../util'
import * as actions from '../actions'
import { RootState } from '../reducers'
//import { ShowNextChapterType, ShowNextSectionType, Chapter, Section } from '../types'
import { Callback, Tag, Choices } from '../types'
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
    choices: Choices,
    tag: Tag
}

interface ChoiceProps extends PropsFromRedux, OwnProps {
    conjunction?: string,
    persistLast?: boolean,
    separator?: string,
    nextUnit?: 'chapter' | 'section' | 'none',
    onComplete?: Callback,
    onLoad?: Callback,
}

interface ChoiceState {
    onComplete?: Callback,
}

class Choice extends React.Component<ChoiceProps, ChoiceState> {

    constructor(props: ChoiceProps) {
        super(props)
        this.handleChange = this.handleChange.bind(this)

        if (props.onLoad) {
            props.onLoad()
        }
        this.state = {
            onComplete: this.props.onComplete,
        }
    }
    static contextType = ChapterContext

    componentDidUpdate() {
        if (this.shouldCallOnComplete(this.state.onComplete)) {
            this.state.onComplete() // old params: this.props.lastSelection, this.props.tag
            this.setState({
                onComplete: undefined,
            })
        }
    }

    shouldCallOnComplete(func: Callback) {
        const atLastchoice = this.props.currentChoice === this.props.choices.length - 1
        return atLastchoice && func
    }

    handleChange(e: React.MouseEvent) {
        e.preventDefault()
        const target = e.target as HTMLInputElement;
        const item = this.context

        const { nextUnit = "section", lastSelection, onCompleteChapter, onSetChoices, onUpdateInventory,
            onCompleteSection, currentChoice, counter, identifier, onUpdateCounter, choices, tag } = this.props

        // Move the choice counter by one unless we're already there
        const atLastchoice = currentChoice === choices.length - 1
        const newchoice = !atLastchoice ? currentChoice + 1 : currentChoice

        onSetChoices(choices, tag, newchoice)


        // Set the inventory property to be the value of what the user selected, unless
        // the special key "_last" (MATCH_LAST) was provided, in which case use the last item
        // set in the inventory (as determined by mapStateToProps)
        let userSelection = target.textContent
        if (target.textContent === MATCH_LAST) {
            userSelection = lastSelection
        }

        onUpdateInventory(tag, userSelection)

        // Are we at the last set? If so, there may be some events to fire
        if (!atLastchoice && newchoice === choices.length - 1) {
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
        const { currentChoice, choices, lastSelection, persistLast = false, conjunction = "and", separator = ", " } = this.props

        let text = choices[currentChoice]
        const atLastChoice = currentChoice === choices.length - 1

        // If this is MATCH_LAST, don't actually show that property, show the value of last selection
        if (text === MATCH_LAST && atLastChoice) {
            text = lastSelection
        }
        // Create an onclick handler if we're at the last choice and/or persisting the last item
        const handler = persistLast || !atLastChoice ? this.handleChange : null

        return iteratedList(text, handler, conjunction, separator)
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

export default connector(Choice)
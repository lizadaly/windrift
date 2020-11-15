import * as React from "react"
import { connect, ConnectedProps } from 'react-redux'

import { iteratedList } from '../util'
import * as actions from '../actions'
import { RootState } from '../reducers'
//import { ShowNextChapterType, ShowNextSectionType, Chapter, Section } from '../types'
import { Callback, Tag, Expansions } from '../types'
import { ChapterContext } from './chapter'

// Special value to match the last selection by the user
const MATCH_LAST = '_last'

/* An array of expansions that can be "examined." Accepts an array and
reveals items one-by-one. Arrays may be nested one-level deep; if the current
item is an array, each value will be displayed separated by commas and ending
with "and". When only one item remains, nextUnit is fired (which may be null)
in which case no event is triggered.

Each time an expansion is revealed, onSetExpansions is called and onUpdateInventory
sets the inventory property `key` to the current selected value. */
interface OwnProps {
    expansions: Expansions,
    tag: Tag
}

interface ListProps extends PropsFromRedux, OwnProps {
    conjunction?: string,
    persistLast?: boolean,
    separator?: string,
    nextUnit?: 'chapter' | 'section' | 'none',
    onComplete?: Callback,
    onLoad?: Callback,
}

interface ListState {
    onComplete?: Callback,
}

class List extends React.Component<ListProps, ListState> {

    constructor(props: ListProps) {
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
        const atLastExpansion = this.props.currentExpansion === this.props.expansions.length - 1
        return atLastExpansion && func
    }

    handleChange(e: React.MouseEvent) {
        e.preventDefault()
        const target = e.target as HTMLInputElement;
        const item = this.context

        const { nextUnit = "section", lastSelection, onCompleteChapter, onSetExpansions, onUpdateInventory,
            onCompleteSection, currentExpansion, counter, identifier, onUpdateCounter, expansions, tag } = this.props

        // Move the expansion counter by one unless we're already there
        const atLastExpansion = currentExpansion === expansions.length - 1
        const newExpansion = !atLastExpansion ? currentExpansion + 1 : currentExpansion

        onSetExpansions(expansions, tag, newExpansion)


        // Set the inventory property to be the value of what the user selected, unless
        // the special key "_last" (MATCH_LAST) was provided, in which case use the last item
        // set in the inventory (as determined by mapStateToProps)
        let userSelection = target.textContent
        if (target.textContent === MATCH_LAST) {
            userSelection = lastSelection
        }

        onUpdateInventory(tag, userSelection)

        // Are we at the last set? If so, there may be some events to fire
        if (!atLastExpansion && newExpansion === expansions.length - 1) {
            if (nextUnit === 'chapter') {
                onCompleteChapter(item)
            } else if (nextUnit === 'section') {
                onCompleteSection(item)
            } else {
                // The no-op version just expands in place (usually because another selector
                // will do the expansion)
            }
        }

        const s = {}
        s[identifier] = counter
        window.history.pushState(s, `Turn: ${counter}`, null)

        // Update the counter in the global store
        onUpdateCounter()
    }

    render() {
        const { currentExpansion, expansions, lastSelection, persistLast = false, conjunction = "and", separator = ", " } = this.props

        let text = expansions[currentExpansion]
        const atLastExpansion = currentExpansion === expansions.length - 1

        // If this is MATCH_LAST, don't actually show that property, show the value of last selection
        if (text === MATCH_LAST && atLastExpansion) {
            text = lastSelection
        }
        // Create an onclick handler if we're at the last expansion and/or persisting the last item
        const handler = persistLast || !atLastExpansion ? this.handleChange : null

        return iteratedList(text, handler, conjunction, separator)
    }
}


const mapState = (state: RootState, ownProps: OwnProps) => {
    const expansions = state.expansions.present
    const inventory = state.inventory.present
    const { tag } = ownProps

    let currentExpansion = 0
    let lastSelection: string = undefined

    if (tag in expansions && currentExpansion in expansions[tag]) {
        currentExpansion = expansions[tag].currentExpansion
    }

    if (tag in inventory) {
        lastSelection = inventory[tag]
    }
    return {
        currentExpansion,
        counter: state.counter.present,
        identifier: state.config.identifier,
        lastSelection,
    }
}
const mapDispatch = {
    onSetExpansions: actions.setExpansions,
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

export default connector(List)
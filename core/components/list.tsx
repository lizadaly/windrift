import PropTypes from 'prop-types'
import * as React from "react"
import { connect, ConnectedProps } from 'react-redux'

import { iteratedList } from '../util'
import * as actions from '../actions'
import { RootState } from '../reducers'

// Special value to match the last selection by the user
const MATCH_LAST = '_last'

/* An array of expansions that can be "examined." Accepts an array and
reveals items one-by-one. Arrays may be nested one-level deep; if the current
item is an array, each value will be displayed separated by commas and ending
with "and". When only one item remains, nextUnit is fired (which may be null)
in which case no event is triggered.

Each time an expansion is revealed, onSetExpansions is called and onUpdateInventory
sets the inventory property `key` to the current selected value. */

interface ListProps extends PropsFromRedux {
    expansions: Array<string>,
    tag: string,

    conjunction?: string,
    persistLast?: boolean,
    separator?: string,
    nextUnit?: string, // PropTypes.oneOf(['chapter', 'section', 'none']),
    onComplete?: Function,
    onCompleteChapter?: Function,
    onCompleteSection?: Function,
    onLoad?: Function,
}

interface ListState {
    onComplete?: Function,
}

export class List extends React.Component<ListProps, ListState> {
    static defaultProps = {
        conjunction: 'and',
        currentExpansion: 0,
        identifier: 'windrift',
        nextUnit: 'section',
        persistLast: false,
        separator: ', ',
    }


    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)

        if (props.onLoad) {
            props.onLoad()
        }
        this.state = {
            onComplete: this.props.onComplete,
        }
    }

    componentDidUpdate() {
        if (this.shouldCallOnComplete(this.state.onComplete)) {
            this.state.onComplete(this.props.lastSelection, this.props.tag)
            this.setState({
                onComplete: undefined,
            })
        }
    }

    shouldCallOnComplete(func) {
        const atLastExpansion = this.props.currentExpansion === this.props.expansions.length - 1
        return atLastExpansion && func
    }

    handleChange(e) {
        e.preventDefault()

        // Move the expansion counter by one unless we're already there
        const atLastExpansion = this.props.currentExpansion === this.props.expansions.length - 1
        const currentExpansion = !atLastExpansion ? this.props.currentExpansion + 1 : this.props.currentExpansion

        this.props.onSetExpansions(this.props.expansions, this.props.tag, currentExpansion)


        // Set the inventory property to be the value of what the user selected, unless
        // the special key "_last" (MATCH_LAST) was provided, in which case use the last item
        // set in the inventory (as determined by mapStateToProps)
        let userSelection = e.target.textContent
        if (e.target.textContent === MATCH_LAST) {
            userSelection = this.props.lastSelection
        }

        this.props.onUpdateInventory(userSelection, this.props.tag)

        // Are we at the last set? If so, there may be some events to fire
        if (!atLastExpansion && currentExpansion === this.props.expansions.length - 1) {
            if (this.props.nextUnit === 'chapter') {
                this.props.onCompleteChapter()
            } else if (this.props.nextUnit === 'section') {
                this.props.onCompleteSection()
            } else {
                // The no-op version just expands in place (usually because another selector
                // will do the expansion)
            }
        }

        const s = {}
        s[this.props.identifier] = this.props.counter
        window.history.pushState(s, `Turn: ${this.props.counter}`, null)

        // Update the counter in the global store
        this.props.onUpdateCounter()
    }
    render() {
        let text = this.props.expansions[this.props.currentExpansion]
        const atLastExpansion = this.props.currentExpansion === this.props.expansions.length - 1

        // If this is MATCH_LAST, don't actually show that property, show the value of last selection
        if (text === MATCH_LAST && atLastExpansion) {
            text = this.props.lastSelection
        }

        // Create an onclick handler if we're at the last expansion and/or persisting the last item
        const handler = this.props.persistLast || !atLastExpansion ? this.handleChange : null

        return iteratedList(text, handler, this.props.conjunction, this.props.separator)
    }
}


const mapState = (state: RootState, ownProps: ListProps, currentExpansion = 0, lastSelection = undefined) => {
    const expansions = state.expansions.present
    const inventory = state.inventory.present
    const { tag } = ownProps

    if (tag in expansions && 'currentExpansion' in expansions[tag]) { // Should this really be a string literal?
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
    // onCompleteSection: actions.showNextSection,
    // onCompleteChapter: actions.showNextChapter,
    onUpdateCounter: actions.updateStateCounter,
}

const connector = connect(
    mapState,
    mapDispatch
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(List)
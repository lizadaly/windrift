import * as React from 'react'
// TODO update this to an FC + effects

interface CounterProps {
    identifier: string
    counter: number
}

interface BrowserState {
    [identifier: string]: number
}

export default class Counter extends React.Component<CounterProps> {
    constructor(props: CounterProps) {
        super(props)
        const { counter = 0, identifier } = props
        this.updateReplaceState(counter, identifier)
    }
    UNSAFE_componentWillReceiveProps(newProps: CounterProps): void {
        this.updateReplaceState(newProps.counter, this.props.identifier)
    }
    updateReplaceState(counter: number, identifier: string): void {
        const s: BrowserState = {}
        s[identifier] = counter
        window.history.replaceState(s, '', '')
    }
    render(): React.ReactNode {
        return null
    }
}

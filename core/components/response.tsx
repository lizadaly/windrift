import minimatch from 'minimatch'

import { useSelector } from 'react-redux'
import { RootState } from 'core/reducers'

interface ToMap {
    [tag: string]: string | JSX.Element
}
interface ResponseProps {
    tag: string
    to: ToMap
}
const Response = ({ tag, to }: ResponseProps): JSX.Element => {
    // Get the inventory item for this tag
    const choice = useSelector((state: RootState) => state.inventory.present[tag])
    const choiceList = useSelector((state: RootState) => state.choices.present[tag])
    if (choice === undefined) {
        return null
    }

    // Perform a case-insensitive match against the user's earlier choice pick
    const resp = Object.keys(to).filter((t) => {
        // Assume any plain-string keys are trailing substring queries (e.g. "banana" for "a ripe banana")
        if (!/\W/g.test(t)) {
            t = '*' + t
        }
        return minimatch(choice, t, { nocase: true })
    })

    if (resp.length === 0) {
        console.group(`Unmatched choice list: "${tag}"`)
        console.log(
            `No matching response was found for tag ${tag} with expressions ${Object.keys(
                to
            )}. Tags from the choices were: `
        )
        for (const i in choiceList.options) {
            const c = choiceList.options[i][0]
            console.log(c)
        }
        console.groupEnd()
        return null
    }
    if (resp.length > 1) {
        console.warn('More than one choice matched the pattern; using the first match.')
    }

    const output = to[resp[0]]

    if (typeof output === 'string') {
        return <>{output}</>
    }
    return output
}
export default Response

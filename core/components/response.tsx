import minimatch from 'minimatch'

import { useSelector } from 'react-redux'
import { RootState } from 'core/types'

interface OptionsMap {
    [tag: string]: string | JSX.Element
}
interface ResponseProps {
    tag: string
    options: OptionsMap
}
const Response = ({ tag, options }: ResponseProps): JSX.Element => {
    // Get the inventory item for this tag
    const choice = useSelector((state: RootState) => state.inventory.present[tag])
    if (choice === undefined) {
        return null
    }

    // Perform a case-insensitive match against the user's earlier choice pick
    const resp = Object.keys(options).filter((t) => {
        // Assume any plain-string keys are trailing substring queries (e.g. "banana" for "a ripe banana")
        //
        // Use a language-agnostic regexp here; \W is insufficient
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes
        // eslint-disable-next-line no-control-regex
        if (/([\u0000-\u0019\u0021-\uFFFF])+/gu.test(t)) {
            t = '*' + t + '*'
        }
        return minimatch(choice, t, { nocase: true })
    })

    if (resp.length === 0) {
        console.group(`Unmatched choice list: "${tag}"`)
        console.log(
            `No matching response was found for tag ${tag} based on option-values ${Object.keys(
                options
            )}. Full text of the option selected was: `
        )

        console.groupEnd()
        return null
    }
    if (resp.length > 1) {
        console.warn('More than one choice matched the pattern; using the first match.')
    }

    const output = options[resp[0]]

    if (typeof output === 'string') {
        return <>{output}</>
    }
    return output
}
export default Response

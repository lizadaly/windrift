import minimatch from 'minimatch'

import { Tag, Option } from 'core/types'
import useInventory from 'core/hooks/use-inventory'

interface OptionsMap {
    [tag: Tag]: string | JSX.Element
}
interface ResponseProps {
    options?: OptionsMap
    tag: Tag
    none?: string | JSX.Element
}

/**
 * Given an inventory tag, display one or more responses based on the value selected by the user.
 *
 * If the `none` prop is passed, display that response if the player has not made any selection from that Chocie.
 *
 * @param tag the inventory tag to be referenced
 * @param options the JS Object containing a map of regular expression matches to JSX nodes or strings
 * @param none optional definition of what to display if the tag is undefined or null
 * @returns the matching text, or null if no match is found
 */
const Response = ({ tag, options, none = null }: ResponseProps): JSX.Element => {
    // Get the inventory item for this tag
    const [option] = useInventory([tag])

    // If no options map was supplied, just return the chosen option
    if (!options) {
        return <>{option}</>
    }
    if (!option) {
        return <>{none}</>
    }

    // Perform a case-insensitive match against the user's earlier choice pick
    const resp = match(options, option)

    if (resp.length === 0) {
        console.group(`Unmatched choice list: "${tag}"`)
        console.log(
            `No matching response was found for tag ${tag} based on option-values ${Object.keys(
                options
            )}`
        )

        console.groupEnd()
        return null
    }
    if (resp.length > 1) {
        console.warn('More than one choice matched the pattern; using the first match.')
    }
    return returnMatch(options, resp[0])
}
const returnMatch = (options: OptionsMap, response: string): JSX.Element => {
    const output = options[response]

    if (typeof output === 'string') {
        return <>{output}</>
    }
    return output
}

const match = (options: OptionsMap, option: Option) => {
    return Object.keys(options).filter((t) => {
        // Assume any plain-string keys are trailing substring queries (e.g. "banana" for "a ripe banana")
        //
        // Use a language-agnostic regexp here; \W is insufficient
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes
        // eslint-disable-next-line no-control-regex
        if (/([\u0000-\u0019\u0021-\uFFFF])+/gu.test(t)) {
            t = '*' + t + '*'
        }
        return minimatch(option, t, { nocase: true })
    })
}
interface MultiResponseProps {
    tags: Tag[]
    options: OptionsMap
}
/**
 * A response component that evaluates the same options list against all passed tags
 * and returns the response in the matching option map _only_ if all tags matched.
 * This is most useful when passing a wildcard like '*' to only return a response if
 * all tags are populated. This is similar to using <When> except you don't need to retrieve
 * the inventory values in the containing component, and useful if you want to avoid unnecessary
 * re-renders to retrieve it.
 *
 * @param param0
 * @returns
 */
export const MultiResponse = ({ tags, options }: MultiResponseProps): JSX.Element => {
    const inventory = useInventory(tags)
    const resp = tags
        .filter((t, i) => inventory[i] != null)
        .map((t) => match(options, t))
        .filter((r) => r.length > 0)
    return resp.length === tags.length ? returnMatch(options, resp[0][0]) : null
}
export default Response

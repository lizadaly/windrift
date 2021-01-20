import { RootState } from 'core/reducers'

import { useSelector } from 'react-redux'

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
    const choices = useSelector((state: RootState) => state.choices.present[tag])
    if (choice === undefined) {
        return null
    }
    const words = choice.split(' ')
    const resp = to[words[words.length - 1].toLowerCase()]
    if (!resp) {
        console.log(`No matching response was found for tag ${tag}`)
        for (const i in choices.choices) {
            const c = choices.choices[i][0]
            console.log(c)
        }
        return null
    }
    if (typeof resp === 'string') {
        return <>{resp}</>
    }
    return resp
}
export default Response

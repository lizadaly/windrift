/** A Link that the user interacts with to potentially change state. If no handler
is supplied, then the text is displayed as static HTML.

This typically occurs for the last item in a Choice list. */

import { Tag } from 'core/types'

interface LinkProps {
    text: string
    index?: number
    handler: any
    tag?: Tag
}
const Link = ({ text, index, handler, tag }: LinkProps): JSX.Element => {
    if (handler) {
        return (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a href="#" data-tag={tag} onClick={() => handler(event, index)}>
                {text}
            </a>
        )
    }
    return <span className="selected">{text}</span>
}

export default Link

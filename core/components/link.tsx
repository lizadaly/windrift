/** A Link that the user interacts with to potentially change state. If no handler
is supplied, then the text is displayed as static HTML. HTML markup embedded in the
string will be rendered but do not embed React components; they won't work.

This typically occurs for the last item in a Choice list. */

import { Tag } from 'core/types'

interface LinkProps {
    text: string
    handler: any
    tag?: Tag
    isComplete: boolean
}
const Link = ({ text, handler, tag, isComplete }: LinkProps): JSX.Element => {
    if (isComplete) {
        return <span dangerouslySetInnerHTML={{ __html: text }}></span>
    }
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
            href="#"
            tabIndex={0}
            data-tag={tag}
            data-option={text}
            onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                const target = e.target as HTMLInputElement
                const option = target.textContent
                handler(option)
            }}
            dangerouslySetInnerHTML={{ __html: text }}
        />
    )
}

export default Link

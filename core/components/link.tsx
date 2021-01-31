/** A Link that the user interacts with to potentially change state. If no handler
is supplied, then the text is displayed as static HTML.

This typically occurs for the last item in a Choices list. */

interface LinkProps {
    text: string
    index?: number
    handler: any
}
const Link = ({ text, index, handler }: LinkProps): JSX.Element => {
    if (handler) {
        return (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a href="#" onClick={() => handler(event, index)}>
                {text}
            </a>
        )
    }
    return <span className="selected">{text}</span>
}

export default Link

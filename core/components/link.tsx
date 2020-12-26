import * as React from "react"

/* A Link that the user interacts with to potentially change state. If no handler
is supplied, then the text is displayed as static HTML. This typically occurs
for the last item in a List */


interface LinkProps {
    text: string
    index: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handler: any
}
const Link = ({ text, index, handler }: LinkProps): JSX.Element => {
    if (handler) {
        return <a href="#" onClick={() => handler(event, index)}>{text}</a>
    }
    return <span className="selected">{text} </span>
}


export default Link

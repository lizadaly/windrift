import * as React from "react"

/* A Link that the user interacts with to potentially change state. If no handler
is supplied, then the text is displayed as static HTML. This typically occurs
for the last item in a List */

type LinkProps = {
    text: string,
    handler: React.MouseEventHandler<HTMLAnchorElement>
}
const Link = ({ text, handler }: LinkProps) => {
    if (handler) {
        return <a href="#" onClick={handler} > {text} </a>
    }
    return <span>{text} </span>
}


export default Link

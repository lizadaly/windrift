// An inline list of items, the default

import React from "react";
import { ChoiceGroup, WidgetType } from "../../types";
import Link from "../link";

interface InlineListProps {
    group: ChoiceGroup
    handler?: React.MouseEventHandler<HTMLAnchorElement>
    separator: string
    conjunction: string
}

const InlineList: WidgetType = ({ group, handler, separator = ", ", conjunction = "and" }: InlineListProps):
    JSX.Element => {

    if (conjunction.length > 0) {
        conjunction = ` ${conjunction} `
    }
    return (
        <>{
            [...group].map((t, i) =>
                (
                    <span key={i} >
                        {group.length > 1 && i === group.length - 1 ? conjunction : ''}
                        <Link handler={handler} text={t} />
                        {i < group.length - 1 && group.length > 2 ? separator : ''}
                    </span>
                ))
        }
        </>)
}
export default InlineList
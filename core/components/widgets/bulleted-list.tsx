// An inline list of items, the default

import React from "react";
import { WidgetProps } from ".";
import Link from "../link";


interface BulletedListProps extends WidgetProps {
    separator: string
    conjunction: string
}
declare function BulletedListType(props: BulletedListProps): JSX.Element

// Passing initialChoices means you can leave the existing ones there
const InlineList: typeof BulletedListType = ({ group = [], handler = null, initialChoices = [] }: BulletedListProps):
    JSX.Element => {

    return (
        <ul>{
            [...initialChoices[0]].map((t, i) =>
                (
                    <li key={i} >
                        <Link handler={handler} text={t} index={i} />
                        {
                            group.map((g) => {
                                if (initialChoices[0] !== group && g === t) {
                                    return "selected"
                                }
                            })
                        }
                    </li>
                ))
        }
        </ul>)
}

export default InlineList
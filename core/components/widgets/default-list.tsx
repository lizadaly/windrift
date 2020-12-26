// A default presentation with no styling

import React from "react";
import { WidgetProps } from ".";
import Link from "../link";


declare function DefaultListType(props: WidgetProps): JSX.Element

const DefaultList: typeof DefaultListType = ({ group = null, handler = null }: WidgetProps):
    JSX.Element => {

    return (
        <>{
            [...group].map((t, i) =>
            (
                <span key={i}>
                    <Link handler={handler} text={t} index={i} />
                </span>
            ))
        }
        </>)
}

export default DefaultList
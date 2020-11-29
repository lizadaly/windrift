import { ChoiceGroup, ChoicesType } from "core/types"

export { default as InlineList } from "./inline-list"
export { default as BulletedList } from "./bulleted-list"

export interface WidgetProps {
    group?: ChoiceGroup
    initialChoices?: ChoicesType
    handler?: React.MouseEventHandler<HTMLAnchorElement>
}
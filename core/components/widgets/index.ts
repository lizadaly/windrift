import { ChoiceGroup, ChoicesType } from 'core/actions/choices'

export { default as InlineList } from './inline-list'
export { default as BulletedList } from './bulleted-list'
export { default as BaseList } from './base-list'

export interface WidgetProps {
    group?: ChoiceGroup
    initialChoices?: ChoicesType
    handler?: React.MouseEventHandler<HTMLAnchorElement>
}

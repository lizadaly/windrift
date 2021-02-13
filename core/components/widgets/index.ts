import { OptionGroup, OptionsType } from 'core/actions/choice'

export { default as InlineList } from './inline-list'
export { default as BulletedList } from './bulleted-list'
export { default as BaseList } from './base-list'

export interface WidgetProps {
    group?: OptionGroup
    initialOptions?: OptionsType
    handler?: React.MouseEventHandler<HTMLAnchorElement>
}

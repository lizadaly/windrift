import { OptionGroup, Options } from 'core/reducers/choice'
import { Tag } from 'core/types'

export { default as InlineList } from './inline-list'
export { default as BulletedList } from './bulleted-list'
export { default as BaseList } from './base-list'

export interface WidgetProps {
    group?: OptionGroup
    initialOptions?: Options
    handler?: React.MouseEventHandler<HTMLAnchorElement>
    tag?: Tag
}

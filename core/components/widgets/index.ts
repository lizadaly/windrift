import { Tag, OptionGroup, Options } from 'core/types'

export { InlineListEN as InlineList } from './inline-list'
export { default as BulletedList } from './bulleted-list'
export { default as BaseList } from './base-list'

export interface WidgetProps {
    group?: OptionGroup
    initialOptions?: Options
    handler?: any // TODO type this better
    tag?: Tag
    className?: string
}

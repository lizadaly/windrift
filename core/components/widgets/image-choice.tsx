// An image as a choice selection

import React from 'react'
import { WidgetProps } from '.'
import Image from 'next/image'
import { Option } from 'core/reducers/choice'

interface ImageChoiceProps extends WidgetProps {
    src: string
    alt: string
    option: Option
    width?: number | string
    height?: number | string
}
declare function ImageChoiceType(props: ImageChoiceProps): JSX.Element

// // Passing initialChoices means you can leave the existing ones there
// const InlineList: typeof BulletedListType = ({

const ImageChoice: typeof ImageChoiceType = ({
    handler,
    option,
    tag,
    src,
    alt,
    className,
    width,
    height
}: ImageChoiceProps) => {
    const chooseable = !!handler
    const onClick = chooseable ? () => handler(option) : null
    return (
        <button
            onClick={onClick}
            data-tag={tag}
            className={`windrift--image-choice windrift--image-choice-chooseable-${chooseable} ${className}`}>
            <img src={src} alt={alt} width={width} height={height} />
        </button>
    )
}

export default ImageChoice

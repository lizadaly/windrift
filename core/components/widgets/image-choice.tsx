/**
 *  An image as a choice selection
* @example
<C
                            tag="image"
                            options={[['camera', 'skyscrapers']]}
                            widget={ImageChoice}
                            extra={{
                                src: '../stories/manual/images/camera.jpg',
                                alt: 'A black manual camera',
                                option: 'camera',
                                width: 200,
                                height: 200
                            }}
                            persist={true}
                        />
 *  */
import { Option } from 'core/types'
import { WidgetProps } from '.'

interface ImageChoiceProps extends WidgetProps {
    src: string
    alt: string
    option: Option
    width?: number | string
    height?: number | string
}
declare function ImageChoiceType(props: ImageChoiceProps): JSX.Element

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
            data-option={option}
            className={`windrift--image-choice windrift--image-choice-chooseable-${chooseable} ${className}`}>
            <img src={src} alt={alt} width={width} height={height} />
        </button>
    )
}

export default ImageChoice

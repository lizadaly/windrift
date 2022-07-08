import * as React from 'react'
import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'

import { Toc, TocItem, RootState } from 'core/types'
import Chapter from './chapter'
import { MDXContent } from 'mdx/types'

interface ChapterComponent {
    component: JSX.Element
    item: TocItem
}
const chapterComponents = (toc: Toc, story: string): Array<ChapterComponent> => {
    const chapters = Object.values(toc).map((item) => {
        let component: React.ReactNode

        if (item.filename.endsWith('.mdx')) {
            component = React.createElement(
                dynamic(() => import(`../../stories/${story}/chapters/${item.filename}`))
            )
        } else {
            component = React.createElement(
                dynamic(() =>
                    import(`../../stories/${story}/chapters/${item.filename}`).then(
                        (mod) => mod.Page
                    )
                )
            )
        }
        return {
            item,
            component
        } as ChapterComponent
    })
    return chapters
}
interface StoryProps {
    story: string
}

const Story = ({ story }: StoryProps): JSX.Element => {
    const toc = useSelector((state: RootState) => state.navigation.present.toc)
    const [components, setComponents] = React.useState<ChapterComponent[]>(null)

    React.useEffect(() => {
        setComponents(chapterComponents(toc, story))
    }, [])

    return components ? (
        <>
            {Object.values(toc)
                .filter((c) => c.visible)
                .map((chapter) => (
                    <div key={chapter.filename}>
                        {
                            components
                                .filter((co) => co.item.filename === chapter.filename)
                                .map((component) => component.component)[0]
                        }
                    </div>
                ))}
        </>
    ) : null
}
export default Story

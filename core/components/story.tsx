import * as React from 'react'
import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'

import { Toc, TocItem, RootState } from 'core/types'

interface ChapterComponent {
    component: JSX.Element
    item: TocItem
}
const chapterComponents = (toc: Toc, story: string): Array<ChapterComponent> => {
    const chapters = Object.values(toc).map((item) => {
        const component = React.createElement(
            dynamic(() =>
                import(`../../stories/${story}/chapters/${item.filename}`).then((mod) => mod.Page)
            )
        )

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
    const [components] = React.useState(() => chapterComponents(toc, story))
    return (
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
    )
}
export default Story

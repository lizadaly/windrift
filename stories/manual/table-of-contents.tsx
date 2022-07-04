/** A component to display a navigable table of contents for all chapters in a story.
 *  Feel free to use this as an example for custom navigation of your own.
 */
import * as React from 'react'

import { useSelector } from 'react-redux'
import { Nav } from 'core/components'

import { RootState } from 'core/types'

import styles from 'public/stories/manual/styles/Index.module.scss'
import { StoryContext } from 'core/containers/store-container'

const TableOfContents = (): JSX.Element => {
    const { config } = React.useContext(StoryContext)
    const { extra } = config
    const omitToc: string[] = extra.omitToc as string[]

    const chapters = useSelector((state: RootState) => {
        const chapters = state.navigation.present.toc
        if (chapters) {
            return Object.values(chapters)
        }
        return []
    })

    const currentChapter = chapters.filter((c) => c.visible)[0]

    return (
        <nav className={styles.toc}>
            <span>In this manual:</span>{' '}
            <ol>
                {chapters
                    .filter((c) => !omitToc.includes(c.filename))
                    .map((c) => (
                        <li key={c.filename}>
                            <Nav
                                text={c.title}
                                next={c.filename}
                                persist={currentChapter.filename != c.filename}
                            />
                        </li>
                    ))}
            </ol>
        </nav>
    )
}
export default TableOfContents

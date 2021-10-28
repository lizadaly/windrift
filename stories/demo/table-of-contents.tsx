/** A compontent to display a navigable table of contents for all chapters in a story.
 *  Feel free to use this as an example for custom navigation of your own.
 */
import { useSelector } from 'react-redux'
import { C } from 'core/components'

import { RootState } from 'core/types'

import styles from 'public/stories/demo/styles/Index.module.scss'

const TableOfContents = (): JSX.Element => {
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
            Sections:{'  '}
            <ol>
                {chapters.map((c) => (
                    <li key={c.filename}>
                        <C
                            tag={`toc-${c.filename}`}
                            options={[c.title, null]}
                            last={c.title}
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

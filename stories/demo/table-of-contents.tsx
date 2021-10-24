/** A compontent to display a navigable table of contents for all chapters in a story.
 *  Feel free to use this as an example for custom navigation of your own.
 */
import { useDispatch, useSelector } from 'react-redux'

import { gotoChapter } from 'core/reducers/navigation'
import { RootState } from 'core/reducers'

import styles from 'public/stories/demo/styles/Index.module.scss'

const TableOfContents = (): JSX.Element => {
    const dispatch = useDispatch()
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
                        <button
                            className={
                                currentChapter.filename === c.filename
                                    ? styles.current
                                    : styles.link
                            }
                            onClick={() => {
                                dispatch(gotoChapter({ filename: c.filename }))
                            }}>
                            {c.title}
                        </button>
                    </li>
                ))}
            </ol>
        </nav>
    )
}
export default TableOfContents

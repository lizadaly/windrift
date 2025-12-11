/**
 * The entry-point for all story-level requests, e.g.
 * https://windrift.app/<story-identifier>
 *
 * Story authors should not need to modify this file.
 *
 * @todo In a future update this will support adding the chapter filename to the URL
 */

import * as React from 'react'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next'

import { Config, Toc, TocItem } from 'core/types'
import { getChapter } from 'core/util'

export interface WindriftProps {
    toc: Toc
    configYaml: Config
    storyId: string
}

function getConfigYaml(story: string) {
    const configPath = path.join(process.cwd(), `public/stories/${story}/story.yaml`)
    const configYaml = yaml.load(fs.readFileSync(configPath, 'utf8')) as Record<string, any>
    return configYaml
}

export const getStaticProps: GetStaticProps = async (context) => {
    const story = context.params.story as string
    const configYaml = getConfigYaml(story)
    const toc = configYaml.chapters.map((item: TocItem) => ({
        filename: item.filename,
        visible: item.visible || false,
        title: item.title,
        bookmark: 0
    }))
    console.log(configYaml)

    return {
        props: {
            toc,
            configYaml,
            storyId: story
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const storyDirs = path.join(process.cwd(), 'public/stories')
    const paths = fs
        .readdirSync(storyDirs, { withFileTypes: true })
        .filter((dir) => dir.isDirectory())
        .map((dir) => {
            return [
                {
                    params: {
                        story: dir.name,
                        chapter: null // TODO extend to pre-render all chapter paths
                    }
                }
            ]
        })
        .flat()
    return { paths, fallback: false }
}

export default function Start(props: WindriftProps): React.ReactElement {
    const router = useRouter()
    const { chapter } = router.query
    const { toc, configYaml, storyId } = props
    const config = new Config(
        storyId,
        configYaml.title,
        configYaml.enableUndo,
        configYaml.players,
        configYaml.language,
        configYaml.extra
    )

    // Try to use chapter from URL, fall back to player start
    const chapterFromUrl = chapter ? getChapter(toc, chapter[0]) : null
    const startChapter =
        chapterFromUrl ||
        (config.players?.length === 1 ? getChapter(toc, config.players[0].start) : null)

    if (startChapter) {
        Object.values(toc)
            .filter((i) => i.visible)
            .forEach((i) => (i.visible = false))
        startChapter.visible = true
    }
    const StoreContainer = dynamic(() => import(`../../core/containers/store-container`), {
        ssr: false
    })
    return <StoreContainer toc={toc} config={config} />
}

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
            configYaml
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

export default function Start(props: WindriftProps): JSX.Element {
    const router = useRouter()
    const { story, chapter } = router.query
    const { toc, configYaml } = props
    const config = new Config(
        story as string,
        configYaml.title,
        configYaml.enableUndo,
        configYaml.players,
        configYaml.language,
        configYaml.extra
    )

    if (chapter) {
        const chapters = Object.values(toc)
        chapters.filter((i) => i.visible).forEach((i) => (i.visible = false))
        getChapter(toc, chapter[0]).visible = true
    }
    // In a single player story, set the visible chapter as the start
    else if (config.players && config.players.length === 1) {
        getChapter(toc, config.players[0].start).visible = true
    }
    const StoreContainer = dynamic(() => import(`../../core/containers/store-container`), {
        ssr: false
    })
    return <StoreContainer toc={toc} config={config} />
}

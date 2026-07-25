/**
 * Verifies that `npm run export` produced a usable static site.
 *
 * The build failing is not the only way export can break: a story page can
 * render while silently losing the contents of its story.yaml. So for every
 * installed story this checks both that a page was emitted and that the title
 * from story.yaml made it into the HTML, which means the config was parsed and
 * passed through getStaticProps.
 */
import fs from 'fs'
import path from 'path'
import { load as loadYaml } from 'js-yaml'

const storiesDir = 'public/stories'
const outDir = 'out'

if (!fs.existsSync(outDir)) {
    console.error(`No ${outDir}/ directory — did \`npm run export\` run?`)
    process.exit(1)
}

const stories = fs
    .readdirSync(storiesDir)
    .filter((story) => fs.existsSync(path.join(storiesDir, story, 'story.yaml')))

if (stories.length === 0) {
    console.error(`No stories found in ${storiesDir}/`)
    process.exit(1)
}

let failed = false

for (const story of stories) {
    const config = loadYaml(fs.readFileSync(path.join(storiesDir, story, 'story.yaml'), 'utf8'))
    const page = path.join(outDir, story, 'index.html')

    if (!fs.existsSync(page)) {
        console.error(`✗ ${story}: no page exported at ${page}`)
        failed = true
        continue
    }
    if (!fs.readFileSync(page, 'utf8').includes(config.title)) {
        console.error(`✗ ${story}: ${page} is missing the story title "${config.title}"`)
        failed = true
        continue
    }
    console.log(`✓ ${story}`)
}

if (failed) {
    console.error('\nStatic export is incomplete.')
    process.exit(1)
}

console.log(`\nAll ${stories.length} stories exported.`)

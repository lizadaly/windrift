import yargs from 'yargs'
import fs from 'fs'
import { hideBin } from 'yargs/helpers'
import compile from 'es6-template-strings/compile'
import resolveToString from 'es6-template-strings/resolve-to-string'

const argv = yargs(hideBin(process.argv))
    .command(
        'create-story <story-identifier>',
        'create new story boilerplate with the identifier <story-identifer>'
    )
    .demandCommand(1)
    .parse()

const story = argv._[0] as string

const publicDir = `public/stories/${story}`
const storyDir = `stories/${story}`

if (!fs.existsSync(publicDir)) {
    console.log(`Creating ${publicDir} for CSS, image, and story config...`)

    fs.mkdirSync(`${publicDir}/styles`, { recursive: true })
    fs.mkdirSync(`${publicDir}/images`, { recursive: true })

    // make yaml
    fs.writeFileSync(
        `${publicDir}/story.yaml`,
        resolveToString(compile(fs.readFileSync('scripts/templates/story.yaml')), { story })
    )

    // Make CSS template
    fs.writeFileSync(
        `${publicDir}/styles/Index.module.scss`,
        resolveToString(compile(fs.readFileSync('scripts/templates/Index.module.template')), {
            story
        })
    )
}
if (!fs.existsSync(storyDir)) {
    fs.mkdirSync(`${storyDir}/chapters`, { recursive: true })
    console.log(`Creating ${storyDir} for chapters and story intro...`)

    // make index.tsx
    fs.writeFileSync(
        `${storyDir}/index.tsx`,
        resolveToString(compile(fs.readFileSync('scripts/templates/index.template')), { story })
    )
    // Make default chapter1
    fs.writeFileSync(
        `${storyDir}/chapters/chapter1.tsx`,
        resolveToString(compile(fs.readFileSync('scripts/templates/chapter1.template')), { story })
    )
}

export {}

import fs from 'fs'

const story = process.argv[2]

if (!story) {
    console.error('Usage: npm run new --first=<story-identifier>')
    process.exit(1)
}

// Templates use `${story}` as their only interpolation
const render = (template: string) =>
    fs.readFileSync(`scripts/templates/${template}`, 'utf8').replaceAll('${story}', story)

const publicDir = `public/stories/${story}`
const storyDir = `stories/${story}`

if (!fs.existsSync(publicDir)) {
    console.log(`Creating ${publicDir} for CSS, image, and story config...`)

    fs.mkdirSync(`${publicDir}/styles`, { recursive: true })
    fs.mkdirSync(`${publicDir}/images`, { recursive: true })

    // make yaml
    fs.writeFileSync(`${publicDir}/story.yaml`, render('story.yaml'))

    // Make CSS template
    fs.writeFileSync(`${publicDir}/styles/Index.module.scss`, render('Index.module.template'))
}
if (!fs.existsSync(storyDir)) {
    fs.mkdirSync(`${storyDir}/chapters`, { recursive: true })
    console.log(`Creating ${storyDir} for chapters and story intro...`)

    // make index.tsx
    fs.writeFileSync(`${storyDir}/index.tsx`, render('index.template'))

    // Make default chapter1
    fs.writeFileSync(`${storyDir}/chapters/chapter1.tsx`, render('chapter1.template'))
}

export {}

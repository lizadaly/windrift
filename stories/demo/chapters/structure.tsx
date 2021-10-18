import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'

import prism from 'react-syntax-highlighter/dist/esm/styles/prism/material-oceanic'

SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('bash', bash)

import { Section, Chapter, Nav } from 'core/components'
import { PageType } from 'core/types'

export const Page: PageType = () => (
    <Chapter filename="structure">
        <Section>
            <h2>Generating a new story</h2>
            <p>
                To begin writing a Windrift story, run the generator script with a unique{' '}
                <code>story identifier</code>. The identifier should be a lowercase string with
                words separated by hyphens. The identifier will appear in the URL and on the file
                system as folders where story files are stored:
            </p>
            <aside>
                <SyntaxHighlighter language="bash" style={prism}>
                    {`$ npm run new <story-id>

# For example:
$ npm run new example-story`}
                </SyntaxHighlighter>
            </aside>
            <p>
                The story identifier <em>must</em> be unique within your Windrift installation.
            </p>
            <p>
                The generator script will create your story folders, CSS files, and example chapter
                and story configuration script, described below.
            </p>
            <h2>Story structure</h2>
            <p>
                A Windrift story is composed of a series of <code>Chapter</code> components
                contained in individual TypeScript or JavaScript files. Each <code>Chapter</code> is
                made up of <code>Section</code> components that are revealed in response to a user
                interaction.
            </p>
            <p>
                Starting a new <code>Chapter</code> will always clear the user's screen of previous
                input. Starting a new <code>Section</code> will not. There is no limit to the size
                of a chapter or section; use these divisions to express the rhythm and pacing of
                your story as needed. It would be perfectly acceptable to encode an entire linear
                story in a single <code>Chapter</code> component. You are free to arbitrarily break
                up your source code in whatever way is helpful to you by using standard JavaScript
                import syntax. Windrift only attends to <code>Chapter</code> and{' '}
                <code>Section</code> components, not source code layout.
            </p>
            <aside>
                <p>
                    Each chapter in a Windrift story will consist of an import of the
                    <code>Page</code>, <code>Chapter</code> and <code>Section</code> components,
                    followed by the signature for the <code>Page</code> functional component,
                    followed by the content itself. Use regular HTML inside each{' '}
                    <code>Section</code> to mark up your story:
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`// example.tsx
import { Section, Chapter } from 'core/components'
import { PageType } from 'core/types'

export const Page: PageType = () => (
    <Chapter filename="example">
        <Section>
            <p>A very simple Windrift story.</p>
        </Section>
    </Chapter>`}
                </SyntaxHighlighter>
            </aside>
            <h2>Story configuration</h2>

            <p>
                Each Windrift story is accompanied by a configuration file, expressed in YAML
                syntax, that describes the overall structure. This acts as a table of contents for
                the story, including where the story will begin:
            </p>
            <SyntaxHighlighter language="json" style={prism}>
                {`// story.yaml
title: Sample story
language: en
chapters:
  - filename: "example"
    title: "Example chapter"
  - filename: "another"
    title: "Another chapter"
players:
  - start: "example"`}
            </SyntaxHighlighter>
            <h3>Title</h3>
            <p>
                The story's title. This generally will not appear in the story itself, but is
                reserved for future use to generate an index of stories available in a given
                Windrift installation.
            </p>
            <h3>Language</h3>
            <p>
                Used to annotate the HTML of the major elements on the page. Browsers and search
                engines will use this information to assist in providing users with a good
                experience. Windrift is generally language-agnostic and does not use this
                information otherwise.
            </p>
            <h3>Chapters</h3>
            <p>
                Each chapter item in the JSON array is a discrete chapter. The filename of the
                chapter <em>must</em> match as either <code>filename.tsx</code> (TypeScript) or{' '}
                <code>filename.tsx</code> (JavaScript). TypeScript is strongly recommended,
                especially when paired with a code editor like VSCode that understands TypeScript
                natively. This value must also match the contents of the{' '}
                <code>&lt;Chapter filename="example"&gt;</code> attribute. Although expressed as an
                array, these chapters have no intrinsic ordering.
            </p>
            <p>
                The chapter title will appear in the <code>&lt;title&gt;</code> of the HTML page.
            </p>
            <h3>Players</h3>
            <p>
                Windrift 2.0 is a single-player experience, but a multiplayer experience is
                forthcoming. This parameter is reserved for further use, but in 2.0.x it is used
                exclusively to indicate which chapter is the start of the story.
            </p>

            <Nav text="Learn about choices next..." next="choices" />
        </Section>
    </Chapter>
)

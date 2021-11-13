import { useEffect, useState } from 'react'

import Image from 'next/image'

import { Section, Chapter, Nav, When, C } from 'core/components'
import { PageType } from 'core/types'
import useInventory from 'core/hooks/use-inventory'
import ImageChoice from 'core/components/widgets/image-choice'
import { SyntaxHighlighter, prism, styles, FooterNav } from '..'

export const Page: PageType = () => {
    const [image, imageOnce] = useInventory(['image', 'image-once'])
    const [audio] = useState(
        new Audio(
            'https://ia800108.us.archive.org/14/items/78_when-a-woman-loves-a-man_billie-holiday-and-her-orchestra-billie-holiday-buck-clayt_gbia0031202/03%20-%20I%20Can%27t%20Get%20Started%20-%20Billie%20Holiday%20and%20her%20Orchestra.mp3'
        )
    )
    const [playing, setPlaying] = useState(false)
    useEffect(() => {
        playing ? audio.play() : audio.pause()
    }, [playing])

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false))
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false))
        }
    }, [])
    return (
        <Chapter filename="images">
            <Section>
                <h2>Images and multimedia</h2>
                <p>
                    Because Windrift is based on NextJS and React, in general you'll add elements
                    like images, CSS, and sound or video using methods consistent with those
                    frameworks. Some examples and story-specific helpers are provided to get you
                    started.
                </p>
                <h3>Static content hosting (images, downloadable content)</h3>
                <p>
                    NextJS provides a{' '}
                    <a href="https://nextjs.org/docs/basic-features/static-file-serving">public</a>{' '}
                    directory at the root for hosting static files. When you run the{' '}
                    <Nav text="story generator" next="structure" /> a directory for your new story
                    will be created there. Add images, icons, sound, video, or any downloadable
                    content you like.{' '}
                </p>
                <p>
                    <strong>Important</strong>: Reference all of your static assets using a relative
                    path starting with <code>../</code>, e.g.{' '}
                    <code>../stories/&lt;your-story-id&gt;/images</code>. This will ensure that URLs
                    work after they are exported. See the{' '}
                    <Nav text="section on deployment" next="deployment" /> for more details.
                </p>
                <h3>Images</h3>
                <p></p>
                <p>
                    NextJS provides an <code>Image</code> component with many useful features,
                    though many of them require more advanced deployment techniques. You're free to
                    either use next/image or the standard HTML image tag—for most authors, the{' '}
                    <strong>
                        standard <code>img</code> element will serve you just fine and is
                        recommended for most users
                    </strong>
                    .
                </p>
                <p>
                    You are strongly encouraged to provide image height and width manually as this
                    will allow the browser to lay out your text prior to the image fully loading.
                </p>
                <aside>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <img
                                        src="../stories/manual/images/example1.jpg"
                                        alt="Ocean waves and rocks"
                                        width="200"
                                        height="200"
                                    />
                                </td>
                                <td>
                                    <Image
                                        src="../stories/manual/images/example1.jpg"
                                        width="200"
                                        height="200"
                                        alt="Ocean waves and rocks"
                                        unoptimized={true}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <SyntaxHighlighter language="tsx" style={prism}>
                                        {`// Standard HTML <img> (recommended)
<img src="../stories/manual/images/example1.jpg"
    alt="Ocean waves and rocks"
    width="200" height="200" />
`}
                                    </SyntaxHighlighter>
                                </td>
                                <td>
                                    <SyntaxHighlighter language="tsx" style={prism}>
                                        {`// import Image from 'next/image'
<Image src="../stories/manual/images/example1.jpg"
    alt="Ocean waves and rocks"
    preload={true} unoptimized={true}
    width="200" height="200" />`}
                                    </SyntaxHighlighter>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </aside>

                <aside className={styles.advanced}>
                    <h3>
                        Preloading and image optimization in <kbd>next/image</kbd>
                    </h3>
                    <p>
                        Most authors should use the standard HTML <code>img</code>, but NextJS
                        provides options for serving up multiple image sizes based on browser sizes.
                        This functionality is complex and requires special hosting considerations.
                        For the recommended static export process (see{' '}
                        <Nav text="deployment" next="deployment" />
                        ), you can only serve one image size, so use the <code>
                            unoptimized
                        </code>{' '}
                        prop here. See the
                        <a href="https://nextjs.org/docs/api-reference/next/image#loader">
                            NextJS
                        </a>{' '}
                        documentation for more details.
                    </p>
                    <p>
                        Normally, NextJS will not invoke the <code>Image</code> loader until the
                        image is on-screen. For very large, image-intensive stories this might be
                        desirable. For most interactive fiction, it's best to load all content up
                        front; this ensures a smooth reading experience. Setting{' '}
                        <code>preload</code> to true will load the image prior to it becoming
                        visible in the viewport.
                    </p>
                </aside>
                <h3>Using images as choices</h3>
                <p>
                    In some stories you may want the reader to make a choice by clicking on an image
                    rather than a word. The Choice widget <code>ImageChoice</code> is provided for
                    this use case. It takes a number of arguments in its <code>extra</code> block,
                    including the option it represents, as well as the usual image properties.
                </p>
                <p>Click on the images to see the choice selection being made:</p>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <C
                                    tag="image"
                                    options={[['camera', 'skyscrapers']]}
                                    widget={ImageChoice}
                                    extra={{
                                        src: '../stories/manual/images/camera.jpg',
                                        alt: 'A black manual camera',
                                        option: 'camera',
                                        width: 200,
                                        height: 200
                                    }}
                                    persist={true}
                                />
                            </td>
                            <td>
                                <C
                                    tag="image"
                                    options={[['camera', 'skyscrapers']]}
                                    widget={ImageChoice}
                                    extra={{
                                        src: '../stories/manual/images/skyscrapers.jpg',
                                        alt: 'City skyscrapers',
                                        option: 'skyscrapers',
                                        width: 200,
                                        height: 200
                                    }}
                                    persist={true}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <SyntaxHighlighter language="tsx" style={prism}>{`<C tag="image"
    options={['camera', 'skyscrapers']}
    widget={ImageChoice}
    extra={{
        src: '../stories/manual/images/camera.jpg',
        alt: 'A black manual camera',
        option: 'camera',
        width: 200,
        height: 200
    }}
    persist={true} />`}</SyntaxHighlighter>
                            </td>
                            <td>
                                <SyntaxHighlighter language="tsx" style={prism}>{`<C tag="image"
    options={['camera', 'skyscrapers']}
    widget={ImageChoice}
    extra={{
        src: '../stories/manual/images/skyscrapers.jpg',
        alt: 'City skyscrapers',
        option: 'skyscrapers',
        width: 200,
        height: 200
    }}
    persist={true} />`}</SyntaxHighlighter>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <aside>
                    <em>
                        <When
                            condition={image}
                            otherwise="You haven't made a choice yet—click on one of the images above.">
                            You chose {image}.
                        </When>
                    </em>
                </aside>

                <p>
                    In the previous example you could keep switching your choice because the widget
                    respects the <code>persist=true</code> prop. If we set it to <code>false</code>{' '}
                    we'll only be able to choose once:
                </p>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <C
                                    tag="image-once"
                                    options={[['camera', 'skyscrapers']]}
                                    widget={ImageChoice}
                                    extra={{
                                        src: '../stories/manual/images/camera.jpg',
                                        alt: 'A black manual camera',
                                        option: 'camera',
                                        width: 200,
                                        height: 200
                                    }}
                                    persist={false}
                                />
                            </td>
                            <td>
                                <C
                                    tag="image-once"
                                    options={[['camera', 'skyscrapers']]}
                                    widget={ImageChoice}
                                    extra={{
                                        src: '../stories/manual/images/skyscrapers.jpg',
                                        alt: 'City skyscrapers',
                                        option: 'skyscrapers',
                                        width: 200,
                                        height: 200
                                    }}
                                    persist={false}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <SyntaxHighlighter
                                    language="tsx"
                                    style={prism}>{`<C tag="image-once"
    options={[['camera', 'skyscrapers']]}
    widget={ImageChoice}
    extra={{
        src: '../stories/manual/images/camera.jpg',
        alt: 'A black manual camera',
        option: 'camera',
        width: 200,
        height: 200
    }}
    persist={false} />`}</SyntaxHighlighter>
                            </td>
                            <td>
                                <SyntaxHighlighter
                                    language="tsx"
                                    style={prism}>{`<C tag="image-once"
    options={[['camera', 'skyscrapers']]}
    widget={ImageChoice}
    extra={{
        src: '../stories/manual/images/skyscrapers.jpg',
        alt: 'City skyscrapers',
        option: 'skyscrapers',
        width: 200,
        height: 200
    }}
    persist={false} />`}</SyntaxHighlighter>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <aside>
                    <em>
                        <When
                            condition={imageOnce}
                            otherwise="You haven't made a final choice yet—click on one of the images above.">
                            You chose {imageOnce}. Note that the images are no long clickable and
                            don't have special behavior on <code>::hover</code>.
                        </When>
                    </em>
                </aside>
                <h2>Multimedia</h2>
                <p>
                    Windrift doesn't have any specific support for audio or video; you can treat
                    this as a normal React application and follow online tutorials for best
                    practices. A common use for audio in hypertext stories is to add background
                    audio that plays during a chapter; use a React effect hook for this, but always
                    allow users to turn off audio too!
                </p>
                <button onClick={() => setPlaying(!playing)}>
                    Click me to {playing ? 'stop' : 'play'} sample audio
                </button>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`import { useEffect, useState } from 'react'
export const Page: PageType = () => {
    const [audio] = useState(
        new Audio(
            'https://example.com/audio.mp3'
        )
    )
    const [playing, setPlaying] = useState(false) // Set the default to 'true' to auto-play
    useEffect(() => {
        playing ? audio.play() : audio.pause()
    }, [playing])

    return <Chapter filename="images">
        <Section>
            [...]
            <button onClick={
                () => setPlaying(!playing)  // On button click, toggle whether the audio is playing
            }>Click me to {playing ? 'stop' : 'play'} sample audio</button>
        </Section>
    </Chapter>}`}
                </SyntaxHighlighter>
                <p>
                    A more complete example including automatically disabling the audio when the
                    user navigates to a new chapter is in the source of this page.
                </p>
                <p>
                    <FooterNav
                        text="Explore how to customize your layout, fonts, and story styles..."
                        next="styling"
                    />
                </p>
            </Section>
        </Chapter>
    )
}
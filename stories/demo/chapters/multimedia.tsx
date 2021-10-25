import Image from 'next/image'

import { Section, Chapter, Nav, When } from 'core/components'
import { PageType } from 'core/types'
import useInventory from 'core/hooks/use-inventory'

import { SyntaxHighlighter, prism, styles } from '..'

export const Page: PageType = () => {
    const [image] = useInventory(['image'])
    return (
        <Chapter filename="multimedia">
            <Section>
                <h2>Multimedia</h2>
                <p>
                    Because Windrift is based on NextJS and React, in general you'll add elements
                    like images, CSS, and sound or video in a method consistent with those
                    JavaScript frameworks. Some examples and story-specific helpers are provided to
                    get you started.
                </p>
                <h3>Static content hosting (images, downloadable content)</h3>
                <p>
                    NextJS provides a{' '}
                    <a href="https://nextjs.org/docs/basic-features/static-file-serving">public</a>{' '}
                    directory at the root for hosting static files. When you run the{' '}
                    <Nav text="story generator" next="structure" /> a directory for your new story
                    will be created there. Add images, icons, sound, video, or any downloadable
                    content you like.{' '}
                    <em>
                        Note that you'll omit the <code>public</code> directory name itself from any
                        URL reference.
                    </em>
                </p>
                <h3>Images</h3>
                <p></p>
                <p>
                    NextJS provides an <code>Image</code> component with many useful features,
                    though many of them require more advanced deployment techniques. You're free to
                    either use next/image or the standard HTML image tag—for most authors, the
                    standard <code>img</code> element will serve you just fine.
                </p>
                <p>
                    You are strongly encouraged to provide image height and width manually as this
                    will allow the browser to lay out your text prior to the image fully loading.
                </p>
                <aside>
                    <table>
                        <tr>
                            <td>
                                <img
                                    src="../stories/demo/images/example1.jpg"
                                    alt="Ocean waves and rocks"
                                    width="100"
                                    height="100"
                                />
                            </td>
                            <td>
                                <Image
                                    src="../stories/demo/images/example1.jpg"
                                    loader={({ src }) => src}
                                    width="100"
                                    height="100"
                                    alt="Ocean waves and rocks"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <SyntaxHighlighter language="tsx" style={prism}>
                                    {`// Standard HTML <img>
<img src="../stories/demo/images/example1.jpg"
    alt="Ocean waves and rocks"
    width="100" height="100" />
`}
                                </SyntaxHighlighter>
                            </td>
                            <td>
                                <SyntaxHighlighter language="tsx" style={prism}>
                                    {`// import Image from 'next/image'
<Image src="../stories/demo/images/example1.jpg"
    alt="Ocean waves and rocks"
    loader={({ src }) => src} preload={true}
    width="100" height="100" />`}
                                </SyntaxHighlighter>
                            </td>
                        </tr>
                    </table>
                </aside>

                <aside className={styles.advanced}>
                    <h3>
                        Preloading and serving alternate image sizes in <kbd>next/image</kbd>
                    </h3>
                    <p>
                        The <code>loader</code> prop is required and refers to a function that
                        returns a URL to the image, potentially based on a desired image size and
                        quality. See the{' '}
                        <a href="https://nextjs.org/docs/api-reference/next/image#loader">NextJS</a>{' '}
                        documentation on custom loaders for more details. The example function is
                        just a no-op that behaves the same as a standard <code>img</code>.
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
                <h3>Using images for choices</h3>
                <p>
                    In some stories you may want the reader to make a choice by clicking on an image
                    rather than a word:
                </p>
                <table>
                    <tr>
                        <td>
                            <img
                                src="../stories/demo/images/camera.jpg"
                                alt="A black manual camera"
                                width="200"
                                height="200"
                            />
                        </td>
                        <td>
                            <img
                                src="../stories/demo/images/skyscrapers.jpg"
                                alt="Many tall skyscrapers"
                                width="200"
                                height="200"
                            />
                        </td>
                    </tr>
                </table>
                <p>
                    <em>
                        <When
                            condition={image}
                            otherwise="You haven't made a choice yet—click on one of the images above.">
                            You chose {image}.
                        </When>
                    </em>
                </p>
            </Section>
        </Chapter>
    )
}

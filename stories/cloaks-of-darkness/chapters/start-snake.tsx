import { Section, Chapter, Nav } from 'core/components'
import Only from 'core/multiplayer/components/only'
import { PageType } from 'core/types'

export const Page: PageType = () => {
    return (
        <Chapter filename="start-snake">
            <Section>
                <Only playerName="snake">
                    <p>
                        Someone has invited you to join them in playing <em>Cloaks of Darkness</em>!
                        This is a hypertext story in which you move about and make decisions by
                        clicking on links. You and the other player will be working cooperatively to
                        achieve a happy outcome. There is no way to lose and a typical session takes
                        about 10 minutes.
                    </p>
                    <aside>
                        <p>
                            It's wet and dark and cold and it's time to find someplace warm to curl
                            up for the evening. You make your way into a quiet alley you visit
                            often.
                        </p>
                        <p>
                            Human dwellings that are unoccupied at night are usually a reliable
                            shelter for a wild snake who inexplicably finds itself in the big city.
                            The local Opera House is a perennial favorite of yours because it's
                            empty after the last performance and has many cozy warm spots to carry
                            you through until sunrise.
                        </p>
                        <p>
                            There's a gap in the wall through crumbly mortar that some helpful rats
                            have dug out. You slither through and into a coat closet.
                        </p>
                    </aside>
                    <p>
                        <Nav
                            text="Let's try to hole up for the night, shall we?"
                            next="cloakroom"
                        />
                    </p>
                </Only>
            </Section>
        </Chapter>
    )
}

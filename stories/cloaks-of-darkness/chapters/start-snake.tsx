import { Section, Chapter, Nav } from 'core/components'
import Only from 'core/multiplayer/components/only'
import { PageType } from 'core/types'

export const Page: PageType = () => {
    return (
        <Chapter filename="start-snake">
            <Section>
                <Only playerName="snake">
                    <aside>
                        <p>
                            It's wet and dark and cold and it's time to find someplace warm to curl
                            up for the evening.
                        </p>
                        <p>
                            Human dwellings that are unoccupied at night are usually a reliable
                            shelter for a wild snake who inexplicably lives in the big city. The
                            local Opera House is an old favorite of yours because it has often just
                            emptied out for the night and has enough residual heat to carry you
                            through until sunrise.
                        </p>
                        <p>
                            There's a gap through some crumbly mortar that some helpful rats have
                            dug out. You slither through and into the coat closet.
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

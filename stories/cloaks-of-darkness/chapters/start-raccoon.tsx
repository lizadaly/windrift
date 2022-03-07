import { Section, Chapter, Nav } from 'core/components'
import Only from 'core/multiplayer/components/only'
import { PageType } from 'core/types'

export const Page: PageType = () => {
    return (
        <Chapter filename="start-raccoon">
            <Section>
                <Only playerName="raccoon">
                    <aside>
                        <p>
                            Hurrying through the rainswept November night, you're glad to see the
                            bright lights of the Opera House—always a reliable source of food scraps
                            from its attached bar and restaurant. Your fur is thoroughly soaked and
                            you're starving!
                        </p>
                        <p>
                            It's surprising that there aren't more people about but you're a raccoon
                            and you don't much care for people anyway. They tend to take offense
                            when you're just in search of some delicious trash to eat!
                        </p>
                    </aside>
                    <p>
                        <Nav text="Let's try to get some dinner, shall we?" next="foyer" />
                    </p>
                </Only>
            </Section>
        </Chapter>
    )
}

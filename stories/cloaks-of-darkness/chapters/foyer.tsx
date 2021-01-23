import { Next } from 'core/actions/navigation'
import { C, R, Section, Chapter } from 'core/components'
import { DefaultList as D } from 'core/components/widgets'
import Only from 'core/multiplayer/components/player-only'
import useNavListener from 'core/multiplayer/hooks/use-nav-listener'
import { PageType } from 'core/types'
import { Raccoon, Snake } from '..'

export const Page: PageType = () => {
    const { player: playerIsVisible, chapterName } = useNavListener()
    return (
        <>
            <Chapter filename="foyer">
                <Section>
                    <Only player={Raccoon}>
                        <p>
                            Hurrying through the rainswept November night, you're glad to see the
                            bright lights of the Opera House. It's surprising that there aren't more
                            people about but, hey, that's great, since you're a raccoon, and you
                            don't want any trouble...
                        </p>
                    </Only>

                    <h1>Foyer of the Opera House</h1>
                    <p>
                        You are in a spacious hall, splendidly decorated in red and gold, with
                        glittering chandeliers overhead. The entrance from the street is{' '}
                        <C choices={[['back the way you came', null]]} tag="c1-back" widget={D} />,
                        and there are doorways east and{' '}
                        <C
                            choices={[['west', null]]}
                            tag="c1-cloakroom"
                            widget={D}
                            next="cloakroom"
                        />
                        .
                    </p>
                    <R
                        tag="c1-back"
                        to={{
                            came: (
                                <p>
                                    You've only just arrived, and besides, the weather outside seems
                                    to be getting worse.
                                </p>
                            )
                        }}
                    />
                </Section>
            </Chapter>
            {playerIsVisible && chapterName == 'foyer' && (
                <p>There's a {playerIsVisible} here!! </p>
            )}
        </>
    )
}

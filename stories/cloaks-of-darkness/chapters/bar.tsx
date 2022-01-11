import { C, R, Section, Chapter, Nav, When } from 'core/components'
import Only from 'core/multiplayer/components/only'
import Both from 'core/multiplayer/components/both'

import { Next, PageType } from 'core/types'
import useCloak, { CloakStatus } from '../use-cloak'
import next from 'next'

export const Page: PageType = () => {
    const cloakStatus = useCloak()
    return (
        <Chapter filename="bar">
            <Section>
                <Only playerName="snake">
                    <h1>In the bar</h1>

                    <p>
                        Some food must have been prepared here earlier in the evening, because the
                        air tastes of meat and there's residual heat eminating from the surface of a
                        large industrial oven. Vague shapes of objects surround you on all sides.
                    </p>

                    <p>
                        You could slither off into the darkness to the{' '}
                        <C options={[['east', 'west', 'south']]} tag="wrong" next={Next.None} />, or
                        go back through the hole to the{' '}
                        <Nav text="north" tag="north" next="foyer" />.
                    </p>
                    <p>Or you could just remain here. The dark warmth makes you quite drowsy!</p>
                    <Only playerName="snake" alone={true}>
                        <R
                            tag="wrong"
                            options={{
                                '*': (
                                    <aside>
                                        <p>
                                            Slithering around in the dark isn't a good idea, even
                                            for fine corn snakes like yourself.
                                        </p>
                                        <p>
                                            You don't turn up anything very interesting, though you
                                            have a vague sense that something is vibrating
                                            somewhere. But then again you don't have ears!
                                        </p>
                                    </aside>
                                )
                            }}
                        />
                        <R
                            tag="hole-with-alarm"
                            options={{
                                '*': (
                                    <>
                                        <p>
                                            The room dims a bit and you get the feeling that you're
                                            being watched.
                                        </p>
                                        <p>
                                            The hole in the board is now obscured by a giant{' '}
                                            <C
                                                tag="eye-hole"
                                                options={[['raccoon eye']]}
                                                next={Next.None}
                                            />
                                            .
                                            <R
                                                tag="eye-hole"
                                                options={{
                                                    '*': (
                                                        <>
                                                            {' '}
                                                            When you meet its gaze, the raccoon eye
                                                            disappears and is replaced by a wiggly
                                                            raccoon arm. Its hand points its little
                                                            fingers excitedly at a{' '}
                                                            <C
                                                                tag="screwdriver"
                                                                options={[['thin metal tool']]}
                                                            />{' '}
                                                            on the floor near you.{' '}
                                                        </>
                                                    )
                                                }}
                                            />
                                            <R
                                                tag="screwdriver"
                                                options={{
                                                    '*': (
                                                        <>
                                                            You curl your tail tightly around the
                                                            tool, effectively picking it up.
                                                            Presumably now the raccoon wants you to{' '}
                                                            <Nav
                                                                text="bring it through the hole."
                                                                next="foyer"
                                                            />
                                                        </>
                                                    )
                                                }}
                                            />
                                        </p>
                                    </>
                                )
                            }}
                        />
                    </Only>
                    <Both>
                        <R
                            tag="trash"
                            options={{
                                unclicked: <p>The raccoon is here, nosing the air inquisitively.</p>
                            }}
                        />
                    </Both>
                </Only>

                <Only playerName="raccoon">
                    <h1>In the bar</h1>
                    <p>
                        It's a combination bar and restaurant for patrons of the opera. You only
                        care about the restaurant part. The small oven and food preparation section
                        by the far wall is where the delicious smell is most concentrated. Surely
                        there will be some{' '}
                        <C tag="trash" options={[['trash']]} defaultOption="unclicked" /> there.
                    </p>
                </Only>
            </Section>
            <Section>
                <Only playerName="raccoon">
                    <p>
                        You pad across the room. It's surprisingly dusty and you leave little paw
                        tracks in your wake. You sniff around the food prep area in search of—ah
                        yes, there it is!
                    </p>
                    <p>
                        All restraint cast aside, you overturn the trash barrel and the next minutes
                        are lost in a feeding frenzy. When you're finished, there's not a scrap of
                        anything edible left in the kitchen, and you sink to the floor, belly full
                        and warm.
                    </p>
                    <Both>
                        <p>
                            The snake glides into the kitchen area and hesitates, clearly envying
                            your position next to the still-warm oven. You nod. It nods in return,
                            moves forward, and curls up beside you. You tumble to sleep together and
                            spend an uneventful evening in peace and quiet comfort.
                        </p>
                    </Both>
                </Only>
                <Only playerName="snake">
                    <p>
                        You glide into the kitchen area, leaving your own unique trail in the dust
                        of the floor alongside the neat tracks of the raccoon. With a bit of
                        hesitation, you approach your companion in this adventure, and when it look
                        at you welcomingly, you curl up beside it, close your eyes, and pass the
                        evening in quiet peace and warmth.
                    </p>
                </Only>
                <Both>
                    <h3>You have both won.</h3>
                </Both>
            </Section>
        </Chapter>
    )
}

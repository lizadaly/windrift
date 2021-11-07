import { useSelector } from 'react-redux'
import Image from 'next/image'

import { C, R, Section, Chapter } from 'core/components'
import { PageType, RootState } from 'core/types'

export const Page: PageType = () => {
    const inventory = useSelector((state: RootState) => state.inventory.present)
    const clothes = inventory.clothes?.split(' ').slice(-1)[0]
    return (
        <Chapter filename="prologue">
            <Section>
                <h2>Prologue</h2>
                <h3>In your reading room</h3>
                <p>“Do you seek the wisdom of the ancients? Come forth!”</p>
                <p>
                    After a brief hesitation, the beaded curtain parts and your next customer steps
                    through. A few stray beads fall off and scatter to the corners.
                </p>
                <p>
                    You should really get a new curtain, but the room’s dim and your clients don’t
                    seem to notice. They’re expecting to see the usual trappings of a boardwalk
                    fortune-teller: tarot decks, zodiac paintings, an absurdly large crystal ball.
                    This customer seems satisfied on that front, and he sits across from you at the
                    cramped circular table. Your knees are almost touching; this room wasn’t built
                    for two full-size men.
                </p>
                <p>“Are you here for a reading?” you ask solemnly. The customer nods.</p>
                <p>
                    “Then let us begin. Some reach the spirits via palms or cards. I require a
                    personal object, one infused with the spirits themselves.”
                </p>
                <p>
                    You look over the customer, who is wearing{' '}
                    <C
                        options={[
                            ['typical tourist clothes'],
                            [
                                'a cheap wedding ring',
                                'a dirty rain jacket',
                                'a novelty baseball cap'
                            ]
                        ]}
                        last="an impatient stare"
                        tag="clothes"
                    />
                    {'.'}
                </p>
            </Section>

            <Section>
                <p>
                    “There’s a powerful psychic force emanating from your {clothes}
                    ,” you say. “May I hold it?” The customer is wide-eyed as he hands it to you.
                    You close your eyes and rotate the {clothes} slowly in your hands. “
                    <R
                        tag="clothes"
                        options={{
                            ring: 'There’s someone close to you. Someone you trusted to be with you always. But they’re gone.',
                            jacket: 'Your vacation hasn’t turned out the way you hoped. I’m sensing disappointment, maybe even despair.',
                            cap: 'You like to have fun, you’re a carefree guy with a sense of humor. But you’re not laughing lately.'
                        }}
                    />
                    ” You frown. “The spirits want to help, but their signals seem faint—” When he
                    doesn’t respond, you open one eye and clear your throat. He hastily produces
                    another twenty bucks.
                </p>
                <p>
                    “I see a name,” you continue. “It begins with an S—” He stares at you blankly.
                    “Or an N?” He perks up. You frown as if in deep concentration. “
                    <C options={[['Nancy?'], ['Nadine?']]} last="Nicky?" tag="p0_customer_names" />”
                </p>
            </Section>

            <Section>
                <p>“—Nicholas?” he supplies excitedly. “Is it my father?”</p>
                <p>
                    “Perhaps,” you hedge. “
                    <R
                        tag="clothes"
                        options={{
                            ring: 'Did he approve of your marriage? I sense concern about how it unfolded.',
                            jacket: 'How would he feel about you traveling so far to see me?',
                            cap: 'He never laughed enough, did he?'
                        }}
                    />
                    ”
                </p>
                <p>
                    “He didn’t approve of{' '}
                    <R
                        tag="clothes"
                        options={{
                            ring: 'Janet. Never even gave her the chance,',
                            jacket: 'frivolity and vacations. Never wanted me to have any fun,',
                            cap: '‘frivolity’, as he called it. He never liked it when I joked around,'
                        }}
                    />
                    ” he says bitterly.
                </p>
                <p>“Yes, and he’s sorry he behaved that way.”</p>
                <p>“He is?“ The customer frowns. “That doesn’t sound like him at all.”</p>
                <p>
                    “The world of the afterlife changes a person,” you say, gliding over his
                    objection. You study the customer’s{' '}
                    <C
                        options={[
                            ['physical appearance'],
                            ['unshaven face', 'calloused hands', 'peeling sunburn']
                        ]}
                        tag="body"
                        last="physical appearance and pick up some cues"
                    />
                    .
                </p>
            </Section>

            <Section>
                <p>
                    “
                    <R
                        tag="body"
                        options={{
                            face: 'He’s worried because you’re not sleeping',
                            hands: 'He’s proud that his son works with his hands',
                            sunburn: 'He’s glad you’ve been spending time outdoors'
                        }}
                    />
                    ,” you improvise.
                </p>
                <p>“That’s true, I have been—”</p>
                <p>
                    Your triumph is short-lived when the curtain rustles again unexpectedly. A woman
                    pushes through: mid-forties, no-nonsense, a bit frumpy for your taste. Her sour
                    expression tells you she’s not a potential client. You’re unsurprised when she
                    flashes a badge at the customer, saying, “Get out.”
                </p>
                <p>
                    He nearly leaps out of his seat and hastily packs up, embarrassed. “You don’t
                    have to leave,” you tell him, but it’s useless, he’s burnt anyway. He squeezes
                    past the woman—the police officer—who watches him with a mix of pity and
                    contempt. He’s in such a hurry he doesn’t think to pick up his extra money on
                    the table, and in the distraction of the moment you quietly slide it into your
                    pocket. His {clothes} also lies forgotten.
                </p>
                <p>
                    And now you’re alone with that cop. She’s probably here to harass you about
                    somebody’s second thoughts: a claim that they were defrauded, that you didn’t
                    disclaim it was for “entertainment purposes only” enough, that their spouse
                    found out, the usual. It doesn’t happen often, but it happens. Best to make the
                    interview go smoothly: start polite, keep it businesslike.
                </p>
                <p>
                    “May I help you, officer?” you ask. And then she says something that not even
                    you could’ve predicted.
                </p>
                <p>
                    “It’s Detective. And I need a psychic,” she says, handing you her{' '}
                    <C
                        options={[['card']]}
                        last="card, which you flip over and read: <em>Tamisha Whitby, Criminal Investigations, Cape May County, NJ</em>"
                        tag="p0_nextUnit"
                    />
                    .
                </p>
            </Section>

            <Section>
                <hr />
                <p>
                    You expect her to undercut the moment with a joke, but she doesn’t, just stands
                    there studying you. You might be a fraud, but you’re not rude. “Frank Petrio,”
                    you say, extending your meaty hand.
                </p>

                <p>
                    She shakes it and produces one of your business cards. “Not{' '}
                    <i>The Great Francisco</i>?”
                </p>
                <p>
                    You shrug, point to the sign over the door: “
                    <small>For entertainment purposes only</small>.” You both sit.
                </p>
                <p>
                    She says, “I don’t believe in fortune-telling or psychics or any of that. I’m
                    here as a favor for someone.” She’s staring at you, hard, and you can’t help but
                    squirm a little. This is probably how your clients feel. “There was a death last
                    month, in Stone Harbor, an elderly man named Alan Healey. You may have read
                    about it; it was in the papers.”
                </p>

                <p>“It’s August at the boardwalk,” you reply. “I’ve been pretty busy with work.”</p>
                <p>
                    She looks pointedly around the reading room and you don’t need to be psychic to
                    know what she thinks of your career choice. She produces a file folder and
                    begins to read from it. “Healey was found dead in his home after taking an
                    overdose of his blood pressure medication. The Healeys are an old and wealthy
                    family in town so the story got quite a bit of news coverage.”
                </p>
                <p>
                    Stone Harbor is a beautiful, wealthy, planned village about fifteen minutes and
                    a million miles away from the working-class carnival town where you live.
                    “Sorry. What does this have to do with me?”
                </p>
                <p>
                    “Healey has a young niece who was staying with him at the time. She’s my
                    god-daughter. Her mother’s not in the picture anymore but I know she’d—I feel—”
                    The detective looks uncomfortable, like a lot of your customers do at first.
                    “She a very... spiritual person. She believes easily.” Whitby pauses again.
                </p>
                <p>“You mean she’s gullible,” you say.</p>
                <p>
                    The detective scowls. “I don’t want to be here any more than you want me here.
                    He was an old man with poor vision who misread his dosage. I’m fulfilling a
                    favor to an old friend and—” She reaches into her pocket, searching for
                    something. “Allison, my friend, told me if anything violent happened in the
                    family, if there was ever a reason to think her daughter was in danger, I should
                    come see the psychic here. That she’d listened to her, and would be able to
                    help—”
                </p>
                <p>
                    “Right, <em>she</em>,” you snap. “My mother was ‘The Great Francesca.’ This was
                    her business, and then she died.”
                </p>
                <p>“I’m sorry, I didn’t—”</p>
                <p>
                    You’re angry too, though you’re not sure why. “And now I operate it. For
                    tourists and suckers. <i>For entertainment purposes only.</i>”
                </p>
                <p>
                    “I knew this was a waste of time,” Whitby says. She tosses a{' '}
                    <C
                        options={[['leather glove']]}
                        last="<b>tense and furious glove</b>"
                        tag="p0_glove"
                    />{' '}
                    on the desk. “There, I did what I came to do.”
                </p>
            </Section>

            <Section>
                <p>
                    <em>Something is very strange about that </em>{' '}
                    <C
                        options={[['glove.']]}
                        last="— You pick up the glove, and everything changes."
                        tag="p0_glove2"
                    />
                </p>
            </Section>

            <Section>
                <div
                    style={{
                        position: 'relative',
                        minHeight: '50vh',
                        width: '100%'
                    }}>
                    <Image
                        src="../stories/stone-harbor/images/study.jpg"
                        loader={({ src }) => src}
                        alt="A small, cluttered study, with pictures and a wicker chair before a
                            desk, in sepia tones."
                        layout="fill"
                        objectFit="cover"
                        priority={true}
                    />
                </div>
                <h3>In the study</h3>
                <p>
                    You look down and see nothing, as if you aren’t there. The color has been washed
                    out of the room. Objects are blurry and indistinct, like an old photograph.
                    There’s a bookcase, a cluttered desk containing{' '}
                    <C
                        options={[
                            ['knickknacks'],
                            ['a partially-written note', 'a photograph', 'an unfilled prescription']
                        ]}
                        last="personal effects"
                        tag="library"
                    />
                    , a small lamp, family photographs on the wall. There’s a doorway leading into a
                    brightly lit bedroom, but it’s even fuzzier, less real, than this room.
                </p>
            </Section>

            <Section>
                <p>
                    <R
                        tag="library"
                        options={{
                            note: (
                                <span>
                                    You look down at the unfinished note. It reads:{' '}
                                    <blockquote>
                                        My dearest, I hope you understand that I’m doing this based
                                        on need, not out of any lack of love for—
                                    </blockquote>{' '}
                                    You don’t understand why, but you recognize the handwriting as
                                    Alan Healey’s.
                                </span>
                            ),
                            photograph: `You examine the picture. It’s a formal group photo taken at the beach: an older man, an older woman, an adult
        man and woman who must be siblings, a young girl. You know immediately that the old man is Alan Healey.`,
                            prescription: `You read the prescription. It’s for a medication you’ve never heard of, yet
        you intuitively know it treats high blood pressure.`
                        }}
                    />
                </p>
                <p>
                    A shadowed figure appears in the doorway, blotting out the light. You hear a
                    labored sound from the bedroom, someone choking and spluttering.
                </p>
                <p>
                    The figure listens to the distress impassively. Panic is rising in you, but
                    absurdly, you have no feet to run into the room, no voice to call for help. An
                    achingly long time later, the choking subsides. All is silence. The figure
                    closes the bedroom door, and the room is now lit by the single weak lamp on the
                    desk. It illuminates the gloved hand on the doorknob, and you’re transfixed by
                    that simple object. The figure tests the door, and satisfied that the bedroom is
                    locked, releases the knob, the{' '}
                    <C
                        options={[['angry glove']]}
                        last="<b>violently angry glove</b>"
                        tag="p0_glove3"
                    />{' '}
                    seeming to boil under the light—
                </p>
            </Section>

            <Section>
                <h3>In your reading room</h3>
                <p>
                    And just like that you’re back, and the feeling of being weighed down by your
                    own body is almost grotesque. You look at the glove, and while it feels dense
                    and heavy in your hands, the sense of deep <em>wrongness</em> about it is gone.
                    It’s just a glove.
                </p>
                <p>This was the first actual psychic experience of your life.</p>
                <p>
                    You can’t imagine how you’re going to explain all this to a practical and
                    rational police officer, but when you look up into her eyes you can see plainly
                    enough that <em>something</em> happened. She looks more than a little bit afraid
                    of you.
                </p>
                <p>You push the glove back at her. “Healey was murdered.”</p>
            </Section>
        </Chapter>
    )
}

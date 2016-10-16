const React = require('react')
import { Map, List, RenderSection } from 'windrift'

export default ({currentSection, inventory}) => {
    const sections = [
      <section>
        <h2>Cloak of Darkness</h2>
        <aside>
          <p>
            Hurrying through the rainswept November night, you're glad to see the
            bright lights of the Opera House.
          </p>
          <p>It's surprising that there aren't more
          people about…</p>

        </aside>
        <h3>Foyer of Opera House</h3>
        <p>
          You are standing in a spacious hall, splendidly decorated in red and gold,
          with glittering chandeliers overhead. The entrance from the street is to
          the <List expansions={["north", "north"]} tag="foyer_north" nextUnit={null} />,

          <Map from={inventory.foyer_north} to={{
            unselected: " and there  ",
            north: ` but you've only just arrived, and besides, the weather
            outside seems to be getting worse. There `
          }} />
          are doorways <List expansions={["south", "south"]} tag="foyer_south" nextUnit={null} /> and <List expansions={["west", "west"]} tag="foyer_west" />.
        </p>
        <Map from={inventory.foyer_south} to={{
          south: () => {
            const barDark = <p> It’s pitch black. You’re likely to fall over and hurt yourself. You can
              stumble <List expansions={[["back north", "around randomly"], "back north"]} tag="bar_north" nextUnit={null} conjunction="or"/>. </p>
                return <Map from={inventory.bar_north} to={{
                  randomly: <div><p>Like a complete clod, you flail around the dark bar, almost certainly
                  messing things up.</p><p>You give up and go back into the foyer, though you note that as you step in, your cloak seems to draw light
                  out of the room.</p></div>,
                  unselected: barDark,
                  north: <div>
                    { barDark }
                    <p>Putting out your hands, you’re able to feel your way back to the bright
                      foyer, though you note that as you step in, your cloak seems to draw light
                    out of the room.</p>
                    </div>
                }} />
          }
        }}/>

      </section>,
      <section>
        <h3>Cloakroom</h3>
        <p>
          The walls of this small room were clearly once lined with hooks, though
          now only <List expansions={["one", "one jagged hook by the doorway "]} tag="cloakroom_hook" nextUnit={null} /> remains.
          <Map from={inventory.cloak_hang} to={{
            cloak: " Your cloak is hanging from the hook. ",
            ditched: " Your magical, light-absorbing cloak is hanging from the hook. "
          }}/>
          &nbsp;The exit is a <List expansions={["door", "door"]} tag="cloakroom_door" /> to the east.
        </p>
        <Map from={inventory.cloakroom_hook} to={{
          one: <Map from={inventory.cloak_hang} to={{
            unselected: <Map from={inventory.bar_north} to={{
              unselected: <p>Your <List expansions={["cloak", "cloak"]} tag="cloak_hang" nextUnit={null}/> would
              look quite tidy hung up on that hook.</p>,
              north: <p>If you <List expansions={["ditched", "carefully hung up"]} tag="cloak_hang" nextUnit={null} /> your cloak here,
              it might not absorb so much light from the bar.</p>,
              randomly: <p>If you <List expansions={["ditched", "carefully hung up"]} tag="cloak_hang" nextUnit={null} /> your cloak here,
              it might not absorb so much light from the bar, assuming you haven’t already irrevocably messed things up.</p>
            }}/>
          }}/>
        }}/>
      </section>,
      <section>
        <p>You decide to see what’s  <Map from={inventory.foyer_south} to={{
          unselected: "south of the foyer",
          south: " happening over in the bar"
        }} />.</p>
        <Map from={inventory.cloak_hang} to={{
          unselected: <p>On your way out the door, your cloak snags on the wall hook.
          Damn! That cost a fortune.</p>,
          ditched: <p>Thanks to the absence of your magical, light-absorbing cloak, you can
            see the dingy bar in its full “glory.”
          </p>
        }}/>
        <h3>The Bar</h3>
        <p>
          The bar, much rougher than you'd have guessed after the opulence of the
          foyer to the north, is completely empty. There seems to be some sort
          of <List expansions={["scrawled message", "scrawled message"]} tag="message" /> in the sawdust on the floor.
        </p>
        <Map from={inventory.message} to={{
          message: <div id="finale">The message reads:
            <div id="message" className={inventory.bar_north == "randomly"? "lost" : "won"}>
              <h1><span>
                <Map from={inventory.bar_north} to={{
                  unselected: "You have won.",
                  north: "You have won.",
                  randomly: "You have lost."
                }}/>
              </span></h1>
            </div>
            <p>
              About the <a href="http://www.firthworks.com/roger/cloak/">Cloak of Darkness specification</a>
            </p>

          </div>

        }} />
      </section>
    ]
    return <RenderSection currentSection={currentSection} sections={sections} />
}

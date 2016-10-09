const React = require('react')
import { List, FromInventory, Map, AllButSelection, NextChapter, RenderSection } from '../components'

export default ({currentSection, inventory, updateInventory, setExpansions}) => {
    const sections = [
      <section>
        <h2>Cloak of Darkness</h2>
        <h6>A interactive demonstration</h6>
        <p>
          Hurrying through the rainswept November night, you're glad to see the
          bright lights of the Opera House. It's surprising that there aren't more
          people about but, hey, what do you expect in a cheap demo game...?
        </p>
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
          are doorways <List expansions={[["south", "west"],["south", "west"]]} tag="foyer_exits" />.

        </p>
      </section>,
      <section>
        <Map from={inventory.foyer_exits} to={{
          west: <div>
            <h3>Cloakroom</h3>
            <p>
              The walls of this small room were clearly once lined with hooks, though
              now only <List expansions={["one", "one jagged hook by the doorway"]} tag="cloakroom_hook" nextUnit={null} /> remains.
              The exit is a <List expansions={["door", "door",]} tag="cloakroom_door" nextUnit={null}/> to the east.
            </p>
            <Map from={inventory.cloakroom_door} to={{
              door: () => {
                return <div>
                  <p>On your way through the door, you feel an unexpected tug as your clothes snag on something.</p>
                </div>
              }
            }} />
            <Map from={inventory.cloakroom_door} to={{
              door: <p> Your <List expansions={["cloak", "beautiful velvety black cloak"]} tag="cloak" /> is stubbornly
              caught on the hook. </p>

            }} />
            <Map from={inventory.cloak} to={{
              cloak: <div>
                <p>It’s surely a handsome cloak, of velvet trimmed with satin, and
                  slightly splattered with raindrops. Its blackness is so deep that
                it almost seems to suck light from the room.</p>
                <p>You love this thing (it was on sale!) but it’s irrevocably snagged on
                the damn hook so you wriggle out of it.</p>
              </div>
            }} />
          </div>,
          south: <div>
            <p>You stumble into unexpectedly dark room, the absence of light so profound
              that you can only either <List expansions={[["fumble around", "return north"]]} tag="bar_exits" persistLast={true} />.
            </p>
            <Map from={inventory.bar_exits} to={{
              around: <div>
                <p> Blundering around in the dark isn’t a good idea, and you’re pretty sure you knocked a few things over.</p>

              </div>,
              north: <div>
                <p>Whew, you emerge back into the light of the Foyer.</p>
              </div>
            }} />
          </div>
        }} />
      </section>,
          <section>
            <Map from={inventory.cloak} to={{
              cloak: <div>
                <p>
                  You pass through into the lobby and notice that the bar is now brightly lit.
                </p>
                <h3>The Bar</h3>
                <p>
                  The bar, much rougher than you'd have guessed after the opulence of the
                  foyer to the north, is completely empty. There seems to be some sort of
                  message scrawled in the sawdust on the floor.
                </p>
              </div>
            }}
            />
          </section>
          ]
            return <RenderSection currentSection={currentSection} sections={sections} />
}

const React = require('react')
import { List, FromInventory, Map, AllButSelection, NextChapter, RenderSection } from '../components'

export default ({currentSection, inventory}) => {
    const sections = [
      <section>
        <h2>Cloak of Darkness</h2>
        <h4>A interactive demonstration</h4>
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
      </section>
    ]
    return <RenderSection currentSection={currentSection} sections={sections} />
}

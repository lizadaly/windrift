const React = require('react')
import { List, FromInventory, Map, RenderSection } from '../components'

export default ({currentSection, inventory}) => {
    const sections = [
      <section>
        <h2>A minimal game in two sections</h2>
        <p>
          <List expansions={["Go to the next section?", "Not much else to do, really."]} tag="next" />
        </p>
      </section>,
      <section>
        <p>
          Huzzah!
        </p>
      </section>
    ]
    return <RenderSection currentSection={currentSection} sections={sections} />
}

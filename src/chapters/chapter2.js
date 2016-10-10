const React = require('react')
import { List, FromInventory, Map, AllButSelection, NextChapter, RenderSection } from '../components'

export default ({currentSection, inventory}) => {
  const sections = [
  <section>
    <h3>Cloakroom</h3>
    <p>
      The walls of this small room were clearly once lined with hooks, though
      now only <List expansions={["one", "one jagged hook by the doorway"]} tag="cloakroom_hook" nextUnit={null} /> remains.
      The exit is a <List expansions={["door", "door",]} tag="cloakroom_door" nextUnit={null}/> to the east.
    </p>
  </section>
  ]
  return <RenderSection currentSection={currentSection} sections={sections} />
}

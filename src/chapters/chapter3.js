const React = require('react')
import { List, FromInventory, Map, AllButSelection, NextChapter, RenderSection } from '../components'

export default ({currentSection, inventory}) => {
  const sections = [
  <section>
    <h3>The Bar</h3>
    <p>
      The bar, much rougher than you'd have guessed after the opulence of the
      foyer to the north, is completely empty. There seems to be some sort of
      message scrawled in the sawdust on the floor.
    </p>
  </section>
  ]
  return <RenderSection currentSection={currentSection} sections={sections} />
}

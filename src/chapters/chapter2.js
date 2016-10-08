const React = require('react')
import { List, FromInventory, Map, AllButSelection, NextChapter, RenderSection } from '../components'

export default ({currentSection, inventory}) => {
  var sections = [
    <section>
      <h2>Examples</h2>
      
      </section>
      ]
      return <RenderSection currentSection={currentSection} sections={sections} />
      }

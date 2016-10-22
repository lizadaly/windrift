const React = require('react')
import { Map, List, FromInventory, RenderSection, NextChapter, AllButSelection} from 'windrift'

export default ({currentSection, inventory}) => {
  const sections = [
    <section>
      <h2>Chapter Two</h2>

      <p>
        As we agreed, a photo of <FromInventory inventory={inventory.animals} /> and
        not <AllButSelection selection={inventory.animals} expansions={["cats", "dogs"]}/>.
      </p>
      <figure>
        <img src={'images/' + inventory.animals + '.jpg'} />
      </figure>
      <p>
        More documentation is available at the <a href="https://github.com/lizadaly/windrift-starter">Github repo</a>
        for this project.
    </p>
    </section>
  ]
  return <RenderSection currentSection={currentSection} sections={sections} />
}

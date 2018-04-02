import React from 'react'
import { List, RenderSection } from '../components'

export default ({ currentSection, inventory }) => { //eslint-disable-line
  const sections = [
    <section>
      <h2>A minimal game in two sections</h2>
      <p>
        <List expansions={['Go to the next section?', 'Not much else to do, really.']} tag="next" />
      </p>
    </section>,
    <section>
      <p>
          Huzzah!
      </p>
    </section>,
  ]
  return <RenderSection currentSection={currentSection} sections={sections} />
}

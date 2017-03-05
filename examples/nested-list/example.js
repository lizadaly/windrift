const React = require('react')
import { NestedList, RenderSection } from 'windrift'

export default ({currentSection, inventory}) => {
  const sections = [
    <section>
      <h2>Nested List demo</h2>
      <NestedList expansions={`[[The(world's largest)economy][grew(at[an(annual)rate]of 2.9%)](according to the Commerce Department)]`} tag="tag" ellipsis="*" />
  </section>
  ]
  return <RenderSection currentSection={currentSection} sections={sections} />
}

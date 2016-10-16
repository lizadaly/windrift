const React = require('react')

import {Transition, SectionTransition} from './transition'

/* Render up to the value of `currentSection` from the `sections` array.
Wraps each section in a Transition with the configuration from SectionTransition */
const RenderSection = ({currentSection, sections}) => {
  var sections = [...Array(currentSection + 1).keys()].map((item, i) => {
    return <div key={item} className={i === currentSection ? 'current-section' : 'section'}
             aria-live="polite">{sections[item]}</div>
    })

  return (
    <div>
      <Transition {...SectionTransition}>{sections}</Transition>
    </div>
  )
}
export default RenderSection

import React from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-transition-group/CSSTransitionGroup'

import { SectionTransition } from './transition'

/* Render up to the value of `currentSection` from the `sections` array.
Wraps each section in a Transition with the configuration from SectionTransition */
const RenderSection = ({ currentSection, sections }) => {
  const displaySections = [...Array(currentSection + 1).keys()].map((item, i) => (
    <div
      key={item}
      className={i === currentSection ? 'current-section' : 'section'}
      aria-live="polite"
    >{sections[item]}
    </div>
  ))

  return (
    <div>
      <Transition {...SectionTransition}>{displaySections}</Transition>
    </div>
  )
}
RenderSection.propTypes = {
  currentSection: PropTypes.object.isRequired,
  sections: PropTypes.array.isRequired,
}
export default RenderSection

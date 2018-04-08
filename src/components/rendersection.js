import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'


/* Render up to the value of `currentSection` from the `sections` array.
Wraps each section in a Transition with the configuration from SectionTransition */
const RenderSection = ({ currentSection, sections }) => {
  const displaySections = [...Array(currentSection + 1).keys()].map((item, i) => (
    <CSSTransition
      {...SectionTransition}
      key={item}
      className={i === currentSection ? 'current-section' : 'section'}
      aria-live="polite"
    >{sections[item]}
    </CSSTransition>
  ))

  return (
    <div>
      <TransitionGroup>
        {displaySections}
      </TransitionGroup>
    </div>
  )
}
RenderSection.propTypes = {
  currentSection: PropTypes.number.isRequired,
  sections: PropTypes.array.isRequired,
}

// Wraps the "new section" display in a CSS transformation
const SectionTransition = {
  classNames: 'section',
  timeout: {
    appear: 500,
    enter: 500,
    exit: 300,
  },
}

export default RenderSection

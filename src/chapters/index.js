const ReactCSSTransitionGroup = require('react-addons-css-transition-group')
const React = require('react')

export * from "./introduction.js"

export const RenderSection = ({currentSection, sections}) => {
  var sections = [...Array(currentSection + 1).keys()].map((item, i) => {
    return <div key={item} aria-live="polite">{sections[item]}</div>
    })

  return (
    <div>
      <ReactCSSTransitionGroup transitionName="section" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        {sections}
      </ReactCSSTransitionGroup>
    </div>
  )
}

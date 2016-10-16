const React = require('react')
export const Transition = require('react-addons-css-transition-group')

// Wraps the "new section" display in a CSS transformation (section)
export const SectionTransition = {transitionName: "section", transitionAppear: true, transitionAppearTimeout: 500, transitionEnterTimeout: 500, transitionLeaveTimeout:300}
export const ListTransition = {transitionName: "list", transitionAppear: true, transitionAppearTimeout: 500, transitionEnterTimeout: 500, transitionLeaveTimeout:300}
export const MapTransition = {transitionName: "map", transitionAppear: true, transitionAppearTimeout: 500, transitionEnterTimeout: 500, transitionLeaveTimeout:300}

export default Transition

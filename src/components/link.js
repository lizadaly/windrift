const React = require('react')
import PropTypes from 'prop-types'

/* A Link that the user interacts with to potentially change state. If no handler
is supplied, then the text is displayed as static HTML. This typically occurs
for the last item in a List */
const Link = ({text, handler}) => {
  if (handler) {
    return <a href="#" onClick={handler}>{text}</a>
  }
  return <span>{text}</span>
}

Link.propTypes = {
  text: PropTypes.string.isRequired,
  handler: PropTypes.func
}

export default Link

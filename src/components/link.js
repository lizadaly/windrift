const React = require('react')

/* A Link that the user interacts with to potentially change state. If no handler
is supplied, then the text is displayed as static HTML. This typically occurs
for the last item in a List */
const Link = ({text, handler}) => {
  if (handler)
    return <a href="#" onClick={handler} dangerouslySetInnerHTML={{__html: text}}/>
  return <span dangerouslySetInnerHTML={{__html: text}}/>
}
Link.propTypes = {
  text: React.PropTypes.string.isRequired,
  handler: React.PropTypes.func
}

export default Link

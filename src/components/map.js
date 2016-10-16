const React = require('react')

import {wordFromInventory} from './util'

/* For a given value of an inventory property, return the value from the `from`
map that matches. Accepts an optional `offset` which is passed through to `fromInventory`.
If the map evaluates to string, return wrapped HTML;
if the map evaluates to a function, call it;
otherwise return the node.
 */
const Map = ({from, to, offset}) => {
    from = from ? wordFromInventory(from.toLowerCase(), offset) : 'unselected'

    if (!to.hasOwnProperty(from)) {
      return null
    }

    if (typeof to[from] === 'string') {
      return <span key={to[from]} dangerouslySetInnerHTML={{__html: to[from]}} />
    }
    else if (typeof to[from] == 'function') {
      return to[from]()
    }
    return to[from]
}
Map.propTypes = {
  from: React.PropTypes.string, // Cannot be isRequired, as the value may be unset
  to: React.PropTypes.object.isRequired,
  offset: React.PropTypes.number,
  triggers: React.PropTypes.object
}
Map.defaultProps = {
  offset: -1
}

export default Map

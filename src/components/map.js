const React = require('react')

import {wordFromInventory} from './util'

const MATCH_UNDEFINED = '_undefined'
const MATCH_WILDCARD = '_any'

/* For a given value of an inventory property, return the value from the `from`
map that matches. Accepts an optional `offset` which is passed through to `fromInventory`.
If the map evaluates to string, return wrapped HTML;
if the map evaluates to a function, call it;
otherwise return the node.
 */
class Map extends React.Component {
    constructor(props) {
      super(props)
      if (props.onChange) {
        this.onChange = this.props.onChange.bind(this)
      }
      else {
        this.onChange = () => {}
      }
      if (props.onLoad) {
        var onLoad = this.props.onLoad.bind(this)
        onLoad()
      }
    }
    componentDidUpdate() {
      this.onChange()
    }
    render() {
      // Downcase the input if it exists, otherwise set it to the UNDEFINED key
      var from = this.props.from ? wordFromInventory(this.props.from.toLowerCase(), this.props.offset) : MATCH_UNDEFINED
      var to = this.props.to

      // Does the `to` map have a matching key?
      if (!to.hasOwnProperty(from)) {
        // If not, does it have a wildcard?
        if (to.hasOwnProperty(MATCH_WILDCARD)) {
          from = MATCH_WILDCARD
        }
        // If no wildcard was provided, there's no match
        else {
          return null
        }
      }
      // From here on out, we know there's a match in the dictionary, so evaluate the possible types:
      if (typeof to[from] === 'string') {
        return <span key={to[from]}>{to[from]}</span>
      }
      else if (typeof to[from] == 'function') {
        return to[from]()
      }
      // The value was a React node, so just return that
      return to[from]


    }
}
Map.propTypes = {
  from: React.PropTypes.string, // Cannot be isRequired, as the value may be unset
  to: React.PropTypes.object.isRequired,
  offset: React.PropTypes.number,
  triggers: React.PropTypes.object,
  onChange: React.PropTypes.func,
  onLoad: React.PropTypes.func
}
Map.defaultProps = {
  offset: -1
}

export default Map

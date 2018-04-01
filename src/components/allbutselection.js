import PropTypes from 'prop-types'

import { iteratedList, wordFromInventory } from './util'

// Display all items in an expansion _except_ the user's selection.
// If `offset` is not null, calls _fromInventory with that offset
// value to truncate each item; otherwise displays the item in full
const AllButSelection = ({
  selection, expansions, offset = null, conjunction = 'and',
}) => {
  let unselected = expansions.filter((item) => (
    item !== selection
  ))
  if (offset !== null) {
    unselected = unselected.map((item) => (
      wordFromInventory(item, offset)
    ))
  }
  return iteratedList(unselected, null, conjunction)
}
AllButSelection.propTypes = {
  selection: PropTypes.string,
  expansions: PropTypes.array.isRequired,
  offset: PropTypes.number,
}

export default AllButSelection

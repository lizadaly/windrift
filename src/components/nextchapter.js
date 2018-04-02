const React = require('react')
import PropTypes from 'prop-types'

import List from './list'

/* A link that prints the label and advances the user to the next chapter */
const NextChapter = ({chapter, label="Continue"}) => (
  <div className="next-chapter-link"><List expansions={[label, ""]} tag={"c" + chapter + "next"} nextUnit="chapter"/></div>
)
NextChapter.propTypes = {
  chapter: PropTypes.number.isRequired,
  label: PropTypes.string
}

export default NextChapter

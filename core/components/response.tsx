import { RootState } from "core/reducers"

import { useSelector } from 'react-redux'

interface ToMap {
  [tag: string]: string | JSX.Element
}
interface ResponseProps {
  tag: string,
  to: ToMap
}
const Response = ({ tag, to }: ResponseProps): JSX.Element => {

  // Get the inventory item for this tag
  let choice = useSelector((state: RootState) => state.inventory.present[tag])
  if (choice === undefined) {
    return null
  }
  choice = choice.replace(/[\W_]+/g, "").toLowerCase()

  const resp = to[choice]

  if (!resp) {
    console.log(`No matching response was found for tag ${tag}`)
    return null
  }
  if (typeof resp === 'string') {
    return <>{resp}</>
  }
  return resp
}
export default Response
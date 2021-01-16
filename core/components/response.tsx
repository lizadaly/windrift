import { RootState } from "core/reducers"

import { useSelector } from 'react-redux'

interface ToMap {
  [tag: string]: string | JSX.Element
}
interface ResponseProps {
  tag: string,
  to: ToMap
}
const Response = ({ tag, to }: ResponseProps) => {

  // Get the inventory item for this tag
  let choice = useSelector((state: RootState) => state.inventory.present[tag])
  const choices = useSelector((state: RootState) => state.choices.present[tag])
  if (choice === undefined) {
    return null
  }

  // Todo make this more rationalized
  choice = choice.replace(/[\W_]+/g, "").toLowerCase()

  const resp = to[choice]

  if (!resp) {
    console.log(`No matching response was found for tag ${tag}`)
    for (const i in choices.choices) {
      const c = choices.choices[i][0]
      console.log(c.replace(/[\W_]+/g, "").toLowerCase())
    }
    return null
  }
  if (typeof resp === 'string') {
    return <>{resp}</>
  }
  return resp
}
export default Response
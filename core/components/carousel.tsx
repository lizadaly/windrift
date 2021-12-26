/**
 * Rotate through a list of N responses. The responses will cycle rather than potentially repeat the same item.
 *
 */
import { TimerContext } from 'core/multiplayer/components/timer'
import * as React from 'react'

const Carousel: React.FC = ({ children }) => {
    const tick = React.useContext(TimerContext)
    const [array] = React.useState(React.Children.toArray(children))
    const [pos, setPos] = React.useState(0)
    React.useEffect(() => {
        if (pos === array.length - 1) {
            setPos(0)
        } else {
            setPos(pos + 1)
        }
        console.log('Tick: ', tick)
        console.log('pos: ', pos)
    }, [])

    return <>{array[pos]}</>
}

export default Carousel

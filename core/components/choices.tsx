import * as React from "react"
import { ChoiceGroup, ChoicesType, WidgetType } from '../types'
import { RootState } from "../reducers"
import { useSelector, useDispatch } from 'react-redux'
import InlineList from "./widgets/inline-list"
import { updateInventory, pickChoice, incrementSection, updateStateCounter } from "../actions"
import { ChapterContext } from "./chapter"
import { useCallback, useContext } from "react"
import { initChoice } from "../actions/choices"

interface ChoicesProps {
    choices: ChoicesType
    tag: string
    nextUnit?: "chapter" | "section" | "none"
    widget?: WidgetType
    extra?: Record<string, unknown>
}


const Choices = ({ choices, tag, extra, widget = InlineList, nextUnit = "section" }: ChoicesProps): JSX.Element => {
    console.log(`Rendering choice list for ${tag}`)
    const dispatch = useDispatch()
    const item = useContext(ChapterContext)
    const newChoices = useSelector((state: RootState) => {
        const c = state.choices.present
        if (c && tag in c) {
            return c[tag]
        }
    })
    console.log(newChoices, choices)
    const identifier = useSelector((state: RootState) => state.config.identifier)
    const counter = useSelector((state: RootState) => state.counter.present)

    // On first render, record the initial choices
    React.useEffect(() => {
        dispatch(initChoice(tag, choices))
    }, [dispatch])

    choices = newChoices && newChoices.length > 0 ? newChoices : choices
    console.log("Choices now: ", choices)

    const handler = (e: React.MouseEvent, index: number): void => {
        e.preventDefault()
        const target = e.target as HTMLInputElement
        const text = target.textContent
        dispatch(updateInventory(tag, text))
        console.log("length before: ", choices.length)
        dispatch(pickChoice(tag, choices, index))
        console.log("length after:  ", choices.length)
        if (choices.length === 1) {
            if (nextUnit === "section") {
                dispatch(incrementSection(item))
            }
        }
        const s = {}
        s[identifier] = counter
        window.history.pushState(s, `Turn: ${counter}`, null)

        dispatch(updateStateCounter())
    }

    const group = choices[0]
    const W = widget
    return <W group={group} handler={group.length > 1 ? handler : null} {...extra} />

}

export default Choices
import * as React from "react"
import { ChoicesType, WidgetType } from '../types'
import { RootState } from "../reducers"
import { useSelector, useDispatch } from 'react-redux'
import InlineList from "./widgets/inline-list"
import { updateInventory, pickChoice } from "../actions"

interface ChoicesProps {
    choices: ChoicesType
    tag: string
    widget?: WidgetType
    extra?: Record<string, unknown>
}


const Choices = ({ choices, tag, extra, widget = InlineList }: ChoicesProps): JSX.Element => {

    const dispatch = useDispatch()
    const newChoices = useSelector((state: RootState) => {
        const c = state.choices.present
        if (c && tag in c) {
            return c[tag]
        }
    })
    choices = newChoices ? newChoices : choices

    const handler = (e: React.MouseEvent, index: number): void => {
        e.preventDefault()
        const target = e.target as HTMLInputElement
        const text = target.textContent
        dispatch(updateInventory(tag, text))
        dispatch(pickChoice(tag, choices, index))
    }
    const group = choices[0]
    const W = widget
    return <W group={group} handler={group.length > 1 ? handler : null} {...extra} />

}

export default Choices
import * as React from "react"
import { ChapterType, WidgetType } from '../types'
import { RootState } from "../reducers"
import { useSelector, useDispatch } from 'react-redux'
import InlineList from "./widgets/inline-list"
import { updateInventory } from "../actions"

interface ChoicesProps {
    choices: Array<Array<string>>
    tag: string
    widget?: WidgetType
}


const Choices = ({ choices, tag, widget = InlineList }: ChoicesProps): JSX.Element => {

    const dispatch = useDispatch()

    const index = useSelector((state: RootState) => {
        const c = state.choices.present
        if (c && tag in c) {
            return index
        }
        return 0
    })


    const handler = (e: React.MouseEvent): void => {
        e.preventDefault()
        const target = e.target as HTMLInputElement
        const text = target.textContent
        dispatch(updateInventory(tag, text))
    }

    const group = choices[index]
    const W = widget
    return <W group={group} handler={handler} />

}

export default Choices
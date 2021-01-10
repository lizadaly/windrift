import * as React from "react"
import { ChapterType, PageType, TocItem, WidgetType } from 'core/types'
import { ChoicesType } from 'core/actions/choices'
import { RootState } from "core/reducers"
import { useSelector, useDispatch } from 'react-redux'
import InlineList from "./widgets/inline-list"
import { initChoice, logAction, updateInventory, pickChoice, incrementSection, updateStateCounter, showNextChapter } from "core/actions"
import { ChapterContext } from "./chapter"
import { useContext } from "react"
import { gotoChapter, Next } from "core/actions/navigation"

export interface ChoicesProps {
    choices: ChoicesType
    tag: string
    next?: Next | string,
    widget?: WidgetType
    extra?: Record<string, unknown>
}


const Choices = ({ choices, tag, extra, widget = InlineList, next = Next.Section }: ChoicesProps): JSX.Element => {
    const { channelName, player } = useSelector((state: RootState) =>
        state.multiplayer)
    const dispatch = useDispatch()
    const item: TocItem = useContext(ChapterContext)
    const newChoices = useSelector((state: RootState) => {
        const c = state.choices.present
        if (c && tag in c) {
            return c[tag]
        }
    })
    const identifier = useSelector((state: RootState) => state.config.identifier)
    const counter = useSelector((state: RootState) => state.counter.present)

    // Get the original picks either from props or from the state
    const initialChoices = newChoices ? newChoices.initialChoices : choices

    // On first render, record the initial choices
    React.useEffect(() => {
        dispatch(initChoice(tag, choices))
    }, [dispatch])

    choices = newChoices && newChoices.choices.length > 0 ? newChoices.choices : choices

    const handler = (e: React.MouseEvent, index: number): void => {
        e.preventDefault()
        const target = e.target as HTMLInputElement
        const choice = target.textContent
        const timestamp = new Date()

        dispatch(updateInventory(tag, choice))
        dispatch(pickChoice(tag, choices, index, player))
        dispatch(logAction(tag, choice, timestamp, player))


        // TODO pull this out
        if (player !== null) {
            const choiceBody = {
                tag,
                choice,
                channel: channelName,
                player,
            }
            fetch('/api/choose', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(choiceBody)
            })
        }

        if (choices.length === 1) {
            if (next === Next.Section) {
                dispatch(incrementSection(item))
            }
            else if (next === Next.Chapter) {
                dispatch(showNextChapter(item))
            }
            else if (next === Next.None) {
                // no-op
            }
            else if (typeof next === "string") {
                dispatch(gotoChapter(next))
            }
        }
        const s = {}
        s[identifier] = counter
        window.history.pushState(s, `Turn: ${counter}`, null)

        dispatch(updateStateCounter())
    }

    const group = choices[0]
    const W = widget
    return <W group={group} handler={group.length > 1 ? handler : null}
        initialChoices={initialChoices} {...extra} />

}

export default Choices
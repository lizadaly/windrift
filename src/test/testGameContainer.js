
import React from 'react'
import sinon from 'sinon'

import { assert } from 'chai'
import { shallow, mount } from 'enzyme'

import { GameContainer } from '../components/game-container'

const MockGame = () => null
let oldWindow

describe('<GameContainer />', () => {
  const identifier = 'test-identifier'
  const defaultProps = {
    children: <MockGame />,
    counter: 0,
    enableUndo: false,
    identifier,
    jump: sinon.spy(),
  }
  // Set up a simple window.history API
  beforeEach(() => {
    oldWindow = global.window
    global.window = {
      history: {
        state: {},
        replaceState: () => {},
      },
      document: oldWindow.document,
    }
  })
  afterEach(() => {
    global.window = oldWindow
    oldWindow = undefined
  })

  it('renders a game frame from props', () => {
    const wrapper = shallow(<GameContainer {...defaultProps} />)
    assert(wrapper.find('div').exists())
  })

  it('will not jump to a time offset if there is no history', () => {
    const wrapper = shallow(<GameContainer {...defaultProps} />)
    assert(!wrapper.instance().props.jump.calledOnce)
  })
  it('will jump to a time offset if there is a history entry', () => {
    const time = 3
    const history = {
      state: {
        [identifier]: time,
      },
    }
    global.window.history = history
    const wrapper = shallow(<GameContainer {...defaultProps} />)
    assert(wrapper.instance().props.jump.calledOnce)
    assert(wrapper.instance().props.jump.calledWith(time))
  })

  it('will render a child node', () => {
    const Game = () => null
    const gameVar = <Game />
    const wrapper = mount(<GameContainer {...defaultProps} >{gameVar}</GameContainer>)
    assert(wrapper.find('Game').exists())
  })
})

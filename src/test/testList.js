import 'jsdom-global/register'
import React from 'react'
import sinon from 'sinon'
import { Provider, connect } from 'react-redux'
import { assert } from 'chai'
import { shallow, mount} from 'enzyme'
import { shallowWithStore, shallowWithState } from 'enzyme-redux'
import { createMockStore } from 'redux-test-utils'

import {List, TestList} from '../components'

describe('<List />', () => {
  let store
  let options
  let func

  before(() => {
    sinon.stub(console, 'error', (warning) => { throw new Error(warning) })
  }),
  after(() => {
    console.error.restore()
  }),
  beforeEach(() => {
    func = () => {}
    store = {
      subscribe: () => {},
      dispatch: () => {},
      getState: () => ({expansions: {}})
    }
    options = {
      context: { store },
      childContextTypes: { store: React.PropTypes.object.isRequired }
    }
  }),

  it('displays the first expansion', () => {
    const expansions = ["a", "b", "c"]
    const tag = "t0_test"
    const wrapper = mount(<List expansions={expansions} tag={tag}/>, options)
    assert.equal("a", wrapper.text())
  }),

  it('displays a list of expansions if an array is the first item', () => {
    const expansions = [["a", "b", "c"], "d"]
    const tag = "t0_test"
    const wrapper = mount(<List expansions={expansions} tag={tag}/>, options)
    assert.equal("a, b,  and c", wrapper.text())
  }),

  it('displays an anchor element', () => {
    const expansions = ["a", "b"]
    const tag = "t0_test"
    const wrapper = mount(<List expansions={expansions} tag={tag}/>, options)
    assert.equal(1, wrapper.find('a').length)
  }),

  it('sets the current expansion state if clicked on', () => {
    const expansions = ["a", "b"]
    const tag = "t0_test"
    const method = sinon.spy()
    const kwargs = {
      onSetExpansions: method,
      onUpdateInventory: func,
      onCompleteSection: func,
      onUpdateCounter: func,
      currentExpansion: 0,
    }
    const wrapper = mount(<TestList expansions={expansions} tag={tag} {...kwargs}/>)
    assert.equal(0, wrapper.state('currentExpansion'))
    wrapper.find('a').simulate('click')
    assert.equal(1, wrapper.state('currentExpansion'))
  }),

  it.only('updates the current expansion state in response to props (like the store)', () => {
    const expansions = ["a", "b"]
    const tag = "t0_test"
    const kwargs = {
      onSetExpansions: func,
      onUpdateInventory: func,
      onCompleteSection: func,
      onUpdateCounter: func,
      currentExpansion: 0,
    }
    const wrapper = mount(<TestList expansions={expansions} tag={tag} {...kwargs}/>)
    assert.equal(0, wrapper.state('currentExpansion'))
    wrapper.setProps({currentExpansion: 1})
    assert.equal(1, wrapper.state('currentExpansion'))
  })
})

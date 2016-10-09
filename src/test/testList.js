import 'jsdom-global/register'
import React from 'react'
import sinon from 'sinon'
import {Provider, connect} from 'react-redux'
import {assert} from 'chai'
import {shallow, mount} from 'enzyme'
import {shallowWithStore, shallowWithState} from 'enzyme-redux'
import {createMockStore} from 'redux-test-utils'

import {List, TestList} from '../components'

describe('<List />', () => {
  let store,
      options,
      func,
      fakeStore
  before(() => {
      sinon.stub(console, 'error', (warning) => {
          throw new Error(warning)
      })
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
          context: {
              store
          },
          childContextTypes: {
              store: React.PropTypes.object.isRequired
          }
      }
      fakeStore = {
          onSetExpansions: func,
          onUpdateInventory: func,
          onCompleteSection: func,
          onUpdateCounter: func,
          currentExpansion: 0
      }
  }),

  it('displays the first expansion', () => {
      const expansions = ["a", "b", "c"]
      const tag = "t0_test"
      const wrapper = mount(
          <List expansions={expansions} tag={tag}/>, options)
      assert.equal("a", wrapper.text())
  }),

  it('displays a list of expansions if an array is the first item', () => {
      const expansions = [
          [
              "a", "b", "c"
          ],
          "d"
      ]
      const tag = "t0_test"
      const wrapper = mount(
          <List expansions={expansions} tag={tag}/>, options)
      assert.equal("a, b,  and c", wrapper.text())
  }),

  it('displays an anchor element', () => {
      const wrapper = mount(
          <List expansions={["a", "b"]} tag={"t0_test"}/>, options)
      assert.equal(1, wrapper.find('a').length)
  }),

  it('displays each available choice as an anchor', () => {
      const expansions = [
          [
              "a", "b", "c"
          ],
          "d"
      ]
      const tag = "t0_test"
      const wrapper = mount(
          <List expansions={expansions} tag={tag}/>, options)
      assert.equal(3, wrapper.find('a').length)
  }),

  it('sets the current expansion state if clicked on', () => {
      const wrapper = mount(<TestList expansions={["a", "b"]} tag={"t0_test"} {...fakeStore}/>)
      assert.equal(0, wrapper.state('currentExpansion'))
      wrapper.find('a').simulate('click')
      assert.equal(1, wrapper.state('currentExpansion'))
  }),

  it('stops displaying anchors when no more expansions can be clicked on', () => {
      const expansions = ["a", "b", "c"]
      const wrapper = mount(<TestList expansions={expansions} tag={"t0_test"} {...fakeStore}/>)
      assert.equal(1, wrapper.find('a').length)
      wrapper.find('a').simulate('click')
      assert.equal(1, wrapper.find('a').length)
      wrapper.find('a').simulate('click')
      assert.equal(0, wrapper.find('a').length)
  }),

  it('updates the current expansion state in response to props (like the store)', () => {
      const wrapper = mount(<TestList expansions={["a", "b"]} tag={"t0_test"} {...fakeStore}/>)
      assert.equal(0, wrapper.state('currentExpansion'))
      wrapper.setProps({currentExpansion: 1})
      assert.equal(1, wrapper.state('currentExpansion'))
  }),

  it('displays the second expansion if clicked on', () => {
      const expansions = ["a", "b", "c"]
      const wrapper = mount(<TestList expansions={expansions} tag={"t0_test"} {...fakeStore}/>)
      assert.equal("a", wrapper.text())
      wrapper.find('a').simulate('click')
      assert.equal("b", wrapper.text())
  }),

  it('calls the onSetExpansions reducer method when mounted', () => {
      fakeStore.onSetExpansions = sinon.spy()
      const wrapper = mount(<TestList expansions={["a", "b", "c"]} tag={"t0_test"} {...fakeStore}/>)
      assert(fakeStore.onSetExpansions.calledOnce)
  }),

  it('calls the onSetExpansions reducer method when clicked on', () => {
      fakeStore.onSetExpansions = sinon.spy()
      const wrapper = mount(<TestList expansions={["a", "b", "c"]} tag={"t0_test"} {...fakeStore}/>)
      wrapper.find('a').simulate('click')
      assert(fakeStore.onSetExpansions.calledTwice)
  }),

  it('calls the onUpdateInventory reducer method and initializes the tag to undefined when mounted', () => {
      fakeStore.onUpdateInventory = sinon.spy()
      const tag = "t0_test"
      const wrapper = mount(<TestList expansions={["a", "b", "c"]} tag={tag} {...fakeStore}/>)
      assert(fakeStore.onUpdateInventory.calledOnce)
      assert(fakeStore.onUpdateInventory.calledWith(undefined, tag))
  }),

  it('calls the onUpdateInventory reducer method with the new inventory value when clicked on', () => {
      fakeStore.onUpdateInventory = sinon.spy()
      const tag = "t0_test"
      const expansions = ["a", "b", "c", "d", "e"]
      const wrapper = mount(<TestList expansions={expansions} tag={tag} {...fakeStore}/>)
      wrapper.find('a').simulate('click')
      assert(fakeStore.onUpdateInventory.calledWith(expansions[0], tag))
      fakeStore.onUpdateInventory.reset()
      wrapper.find('a').simulate('click')
      assert(fakeStore.onUpdateInventory.calledWith(expansions[1], tag))
      fakeStore.onUpdateInventory.reset()
      wrapper.find('a').simulate('click')
      assert(fakeStore.onUpdateInventory.calledWith(expansions[2], tag))
  }),

  it('calls the onCompleteSection reducer method when more no expansions are available', () => {
      fakeStore.onCompleteSection = sinon.spy()
      const expansions = ["a", "b"]
      const wrapper = mount(<TestList expansions={expansions} tag={"c0_test"} {...fakeStore}/>)
      wrapper.find('a').simulate('click')
      assert(fakeStore.onCompleteSection.calledOnce)
  }),

  it('calls the onCompleteSection reducer method when more no expansions are available and nextUnit is "section"', () => {
      fakeStore.onCompleteSection = sinon.spy()
      fakeStore.onCompleteChapter = sinon.spy()
      const expansions = ["a", "b"]
      const wrapper = mount(<TestList nextUnit="section" expansions={expansions} tag={"c0_test"} {...fakeStore}/>)
      wrapper.find('a').simulate('click')
      assert(fakeStore.onCompleteSection.calledOnce)
      assert.isFalse(fakeStore.onCompleteChapter.called)
  }),

  it('calls the onCompleteSection reducer method when more no expansions are available and nextUnit is "chapter"', () => {
      fakeStore.onCompleteSection = sinon.spy()
      fakeStore.onCompleteChapter = sinon.spy()
      const expansions = ["a", "b"]
      const wrapper = mount(<TestList nextUnit="chapter" expansions={expansions} tag={"c0_test"} {...fakeStore}/>)
      wrapper.find('a').simulate('click')
      assert.isFalse(fakeStore.onCompleteSection.called)
      assert(fakeStore.onCompleteChapter.calledOnce)
  }),

  it('calls no completion methods when more no expansions are available and nextUnit is "none" or null', () => {
      fakeStore.onCompleteSection = sinon.spy()
      fakeStore.onCompleteChapter = sinon.spy()
      const expansions = ["a", "b"]
      const wrapper = mount(<TestList nextUnit={null} expansions={expansions} tag={"c0_test"} {...fakeStore}/>)
      wrapper.find('a').simulate('click')
      assert.isFalse(fakeStore.onCompleteSection.called)
      assert.isFalse(fakeStore.onCompleteChapter.called)
  }),

  it('calls the onUpdateCounter method when an expansion is selected', () => {
      fakeStore.onUpdateCounter = sinon.spy()
      const wrapper = mount(<TestList expansions={["a", "b"]} tag={"c0_test"} {...fakeStore}/>)
      wrapper.find('a').simulate('click')
      assert(fakeStore.onUpdateCounter.calledOnce)
  }),
  it('leaves the last expansion linked if the `persistLast` prop is true', () => {
    const expansions = ["a", "b", "c"]
    const wrapper = mount(<TestList persistLast={true} expansions={expansions} tag={"t0_test"} {...fakeStore}/>)
    assert.equal(1, wrapper.find('a').length)
    wrapper.find('a').simulate('click')
    assert.equal(1, wrapper.find('a').length)
    wrapper.find('a').simulate('click')
    assert.equal(1, wrapper.find('a').length)
  }),
  it('should be safe to click on the last expansion in a set more than once', () => {
    const expansions = ["a", "b", "c"]
    const wrapper = mount(<TestList persistLast={true} expansions={expansions} tag={"t0_test"} {...fakeStore}/>)
    wrapper.find('a').simulate('click')
    wrapper.find('a').simulate('click')
    wrapper.find('a').simulate('click')
  }),
  it('does not call the onCompleteSection reducer method if the user clicks on the last expansion twice', () => {
      fakeStore.onCompleteSection = sinon.spy()
      const expansions = ["a", "b"]
      const wrapper = mount(<TestList persistLast={true} expansions={expansions} tag={"c0_test"} {...fakeStore}/>)
      wrapper.find('a').simulate('click')
      assert(fakeStore.onCompleteSection.calledOnce)
      wrapper.find('a').simulate('click')
      // Still should be just once
      assert(fakeStore.onCompleteSection.calledOnce)
  }),
  it('does call the onUpdateInventory reducer method if the user clicks on the last expansion twice', () => {
      fakeStore.onUpdateInventory = sinon.spy()
      const expansions = ["a", "b"]
      const wrapper = mount(<TestList persistLast={true} expansions={expansions} tag={"c0_test"} {...fakeStore}/>)
      wrapper.find('a').simulate('click')
      assert(fakeStore.onUpdateInventory.calledTwice)
      wrapper.find('a').simulate('click')
      assert(fakeStore.onUpdateInventory.calledThrice)
  }),

  it('allows resetting an existing inventory property', () => {
    fakeStore.onUpdateInventory = sinon.spy()
    const expansions = ["a", ["b", "c"]]
    const tag = "c0_test"
    const wrapper = mount(<TestList persistLast={true} expansions={expansions} tag={tag} {...fakeStore}/>)
    wrapper.find('a').simulate('click')
    assert(fakeStore.onUpdateInventory.calledWith(expansions[0], tag))
    fakeStore.onUpdateInventory.reset()
    wrapper.find('a').first().simulate('click')
    assert(fakeStore.onUpdateInventory.calledWith(expansions[1][0], tag))
    fakeStore.onUpdateInventory.reset()
    wrapper.find('a').first().simulate('click')
    assert(fakeStore.onUpdateInventory.calledWith(expansions[1][0], tag))
    fakeStore.onUpdateInventory.reset()
    wrapper.find('a').first().simulate('click')
    assert(fakeStore.onUpdateInventory.calledWith(expansions[1][0], tag))
    fakeStore.onUpdateInventory.reset()
    wrapper.find('a').last().simulate('click')
    assert(fakeStore.onUpdateInventory.calledWith(expansions[1][1], tag))
  })

})

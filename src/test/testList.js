import 'jsdom-global/register'
import React from 'react'
import sinon from 'sinon'
import PropTypes from 'prop-types'

import {Provider, connect} from 'react-redux'
import {assert} from 'chai'
import {shallow, mount} from 'enzyme'
import {shallowWithStore, shallowWithState} from 'enzyme-redux'
import {createMockStore} from 'redux-test-utils'

import {List, TestList} from '../components/list'

const TAG = "t0_test"

describe('<List />', () => {
  let store,
      options,
      func,
      fakeStore
  before(() => {
      sinon.stub(console, 'error').callsFake((warning) => {
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
          getState: () => ({expansions: {present: {}},
                            counter: {present: 0},
                            inventory: {present: {}}})
      }
      options = {
          context: {
              store
          },
          childContextTypes: {
              store: PropTypes.object.isRequired
          }
      }
      fakeStore = {
          onSetExpansions: func,
          onUpdateInventory: func,
          onCompleteSection: func,
          onUpdateCounter: func,
          currentExpansion: 0,
          config: {},
          lastSelection: undefined

      }
  }),

  it('displays the first expansion', () => {
      const expansions = ["a", "b", "c"]
      const wrapper = mount(
          <List expansions={expansions} tag={TAG}/>, options)
      assert.equal("a", wrapper.text())
  }),

  it("displays a single item correctly", () => {
      const expansions = ["chicken"]
      const wrapper = mount(<List expansions={expansions} tag={TAG}/>, options)
      assert.equal("chicken", wrapper.text())
  }),

  it('displays a list of expansions if an array is the first item', () => {
      const expansions = [["a", "b", "c"], "d"]
      const wrapper = mount(
          <List expansions={expansions} tag={TAG}/>, options)
      assert.equal("a, b,  and c", wrapper.text())
  }),

  it('displays an anchor element', () => {
      const wrapper = mount(
          <List expansions={["a", "b"]} tag={TAG}/>, options)
      assert.equal(1, wrapper.find('a').length)
  }),

  it('displays each available choice as an anchor', () => {
      const expansions = [["a", "b", "c"], "d"]
      const wrapper = mount(
          <List expansions={expansions} tag={TAG}/>, options)
      assert.equal(3, wrapper.find('a').length)
  }),

  it('allows the author to override the default conjunction', () => {
    const expansions = [["a", "b", "c"], "d"]
    const conjunction = "or"
    const wrapper = mount(
        <List expansions={expansions} conjunction={conjunction} tag={TAG}/>, options)
    assert.equal("a, b,  or c", wrapper.text())
  }),

  it('allows the author to override the default separator', () => {
    const expansions = [["a", "b", "c"], "d"]
    const separator = "|"
    const wrapper = mount(
        <List expansions={expansions} separator={separator} tag={TAG}/>, options)
    assert.equal("a|b| and c", wrapper.text())
  }),


  it('stops displaying anchors when no more expansions can be clicked on', () => {
      const expansions = ["a", "b", "c"]
      let wrapper = mount(<TestList expansions={expansions} tag={TAG} {...fakeStore} currentExpansion={0} />)
      assert.equal(1, wrapper.find('a').length)
      wrapper = shallow(<TestList expansions={expansions} tag={TAG} {...fakeStore} currentExpansion={2} />)
      assert.equal(0, wrapper.find('a').length)
  }),

  it('displays the nth expansion based on the current value', () => {
      const expansions = ["a", "b", "c"]
      const wrapper = mount(<TestList expansions={expansions} tag={TAG} {...fakeStore} currentExpansion={1}/>)
      assert.equal("b", wrapper.text())
  }),

  it('calls the onSetExpansions reducer method when clicked on', () => {
      fakeStore.onSetExpansions = sinon.spy()
      const wrapper = mount(<TestList expansions={["a", "b", "c"]} tag={TAG} {...fakeStore}/>)
      wrapper.find('a').simulate('click')
      assert(fakeStore.onSetExpansions.calledOnce)
  }),

  it('calls the onUpdateInventory reducer method with the new inventory value when clicked on', () => {
      fakeStore.onUpdateInventory = sinon.spy()
      const expansions = ["a", "b", "c", "d", "e"]
      const wrapper = mount(<TestList expansions={expansions} tag={TAG} {...fakeStore}/>)
      wrapper.find('a').simulate('click')
      assert(fakeStore.onUpdateInventory.calledWith(expansions[0], TAG))
  }),

  it('calls the onCompleteSection reducer method when more no expansions are available', () => {
      fakeStore.onCompleteSection = sinon.spy()
      const expansions = ["a", "b"]
      const wrapper = mount(<TestList expansions={expansions} tag={TAG} {...fakeStore}/>)
      wrapper.find('a').simulate('click')
      assert(fakeStore.onCompleteSection.calledOnce)
  }),

  it('calls the onCompleteSection reducer method when more no expansions are available and nextUnit is "section"', () => {
      fakeStore.onCompleteSection = sinon.spy()
      fakeStore.onCompleteChapter = sinon.spy()
      const expansions = ["a", "b"]
      const wrapper = mount(<TestList nextUnit="section" expansions={expansions} tag={TAG} {...fakeStore}/>)
      wrapper.find('a').simulate('click')
      assert(fakeStore.onCompleteSection.calledOnce)
      assert.isFalse(fakeStore.onCompleteChapter.called)
  }),

  it('calls the onCompleteSection reducer method when more no expansions are available and nextUnit is "chapter"', () => {
      fakeStore.onCompleteSection = sinon.spy()
      fakeStore.onCompleteChapter = sinon.spy()
      const expansions = ["a", "b"]
      const wrapper = mount(<TestList nextUnit="chapter" expansions={expansions} tag={TAG} {...fakeStore}/>)
      wrapper.find('a').simulate('click')
      assert.isFalse(fakeStore.onCompleteSection.called)
      assert(fakeStore.onCompleteChapter.calledOnce)
  }),

  it('calls no completion methods when more no expansions are available and nextUnit is "none" or null', () => {
      fakeStore.onCompleteSection = sinon.spy()
      fakeStore.onCompleteChapter = sinon.spy()
      const expansions = ["a", "b"]
      const wrapper = mount(<TestList nextUnit={null} expansions={expansions} tag={TAG} {...fakeStore}/>)
      wrapper.find('a').simulate('click')
      assert.isFalse(fakeStore.onCompleteSection.called)
      assert.isFalse(fakeStore.onCompleteChapter.called)
  }),

  it('calls the onUpdateCounter method when an expansion is selected', () => {
      fakeStore.onUpdateCounter = sinon.spy()
      const wrapper = mount(<TestList expansions={["a", "b"]} tag={TAG} {...fakeStore}/>)
      wrapper.find('a').simulate('click')
      assert(fakeStore.onUpdateCounter.calledOnce)
  }),
  it('leaves the last expansion linked if the `persistLast` prop is true', () => {
    const expansions = ["a", "b", "c"]
    const wrapper = mount(<TestList persistLast={true} expansions={expansions} tag={TAG} {...fakeStore}/>)
    assert.equal(1, wrapper.find('a').length)
    wrapper.find('a').simulate('click')
    assert.equal(1, wrapper.find('a').length)
    wrapper.find('a').simulate('click')
    assert.equal(1, wrapper.find('a').length)
  }),

  it('should be safe to click on the last expansion in a set more than once', () => {
    const expansions = ["a", "b", "c"]
    const wrapper = mount(<TestList persistLast={true} expansions={expansions} tag={TAG} {...fakeStore}/>)
    wrapper.find('a').simulate('click')
    wrapper.find('a').simulate('click')
    wrapper.find('a').simulate('click')
  }),

  it('allows resetting an existing inventory property', () => {
    fakeStore.onUpdateInventory = sinon.spy()
    const expansions = ["a", ["b", "c"]]
    let wrapper = mount(<TestList persistLast={true} expansions={expansions} tag={TAG} {...fakeStore}/>)
    wrapper.find('a').simulate('click')
    assert(fakeStore.onUpdateInventory.calledWith(expansions[0], TAG))
    wrapper = mount(<TestList persistLast={true} expansions={expansions} tag={TAG} {...fakeStore} currentExpansion={1}/>)
    wrapper.find('a').first().simulate('click')
    assert(fakeStore.onUpdateInventory.calledWith(expansions[1][0], TAG))
  }),

  it('calls the optional onComplete if supplied when the List is complete', () => {
    const func = sinon.spy()
    const expansions = ["a", "b"]
    var wrapper = mount(<TestList onComplete={func} expansions={expansions} tag={TAG} {...fakeStore}/>)
    wrapper.update()
    assert(!func.called)
    fakeStore.currentExpansion = 1 // Set to last
    wrapper = mount(<TestList onComplete={func} expansions={expansions} tag={TAG} {...fakeStore}/>)
    wrapper.update()
    assert(func.calledOnce)

    // Shouldn't keep calling though
    wrapper.update()
    assert(func.calledOnce)

  }),

  it('does not the onComplete if there are more items in the List', () => {
    const func = sinon.spy()
    const expansions = ["a", "b", "c"]
    const wrapper = mount(<TestList onComplete={func} expansions={expansions} tag={TAG} {...fakeStore}/>)
    wrapper.find('a').simulate('click')
    assert(!func.called)
  }),

  it('provides the final selection value as the first argument to the onComplete callback ', () => {
    const func = sinon.spy()
    const expansions = ["a", "b"]
    fakeStore.currentExpansion = 1 // Set to last
    fakeStore.lastSelection = "a"
    const wrapper = mount(<TestList onComplete={func} expansions={expansions} tag={TAG} {...fakeStore}/>)
    wrapper.update()
    assert(func.calledWith(expansions[0]))
  }),

  it('provides the tag value as the second argument to the onComplete callback ', () => {
    const func = sinon.spy()
    const tag = 'tag-test'
    const expansions = ["a", "b"]
    fakeStore.currentExpansion = 1 // Set to last
    fakeStore.lastSelection = "a"
    const wrapper = mount(<TestList onComplete={func} expansions={expansions} tag={tag} {...fakeStore}/>)
    wrapper.update()
    assert(func.calledWith(expansions[0], tag))
  }),

  it('allows the special value `_last` to represent the last item selected by the user', () => {
    var expansions = ["a", "b", "c"]
    fakeStore.currentExpansion = 0
    var wrapper = mount(<TestList expansions={expansions} tag={TAG} {...fakeStore}/>)
    assert("a" === wrapper.text())
    fakeStore.currentExpansion = 1
    wrapper = mount(<TestList expansions={expansions} tag={TAG} {...fakeStore}/>)
    assert("b" === wrapper.text())
    fakeStore.currentExpansion = 2
    wrapper = mount(<TestList expansions={expansions} tag={TAG} {...fakeStore}/>)
    assert("c" === wrapper.text())
    fakeStore.lastSelection = "a"
    fakeStore.currentExpansion = 2
    expansions = ["a", "b", "_last"]
    wrapper = mount(<TestList expansions={expansions} tag={TAG} {...fakeStore}/>)
    assert("a" === wrapper.text())
  }),

  it('allows the author to set an onLoad function to be called in the constructor', () => {
    const func = sinon.spy()
    const expansions = ["a", "b"]
    const wrapper = mount(<TestList onLoad={func} expansions={expansions} tag={TAG} {...fakeStore}/>)
    assert(func.calledOnce)

  })

})

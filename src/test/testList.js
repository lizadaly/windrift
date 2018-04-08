import React from 'react'
import sinon from 'sinon'

import { assert } from 'chai'
import { shallow, mount } from 'enzyme'

import { List } from '../components/list'

const tag = 't0_test'

const defaultProps = {
  expansions: ['a', 'b', 'c'],
  tag,
  counter: 0,
}

describe('<List />', () => {
  beforeEach(() => {
    defaultProps.onComplete = sinon.spy()
    defaultProps.onCompleteChapter = sinon.spy()
    defaultProps.onCompleteSection = sinon.spy()
    defaultProps.onLoad = sinon.spy()
    defaultProps.onSetExpansions = sinon.spy()
    defaultProps.onUpdateCounter = sinon.spy()
    defaultProps.onUpdateInventory = sinon.spy()
  })
  it('displays the first expansion', () => {
    const wrapper = mount(<List {...defaultProps} />)
    assert.equal('a', wrapper.text())
  })

  it('displays a single item correctly', () => {
    const expansions = ['chicken']
    const wrapper = mount(<List {...defaultProps} expansions={expansions} />)
    assert.equal('chicken', wrapper.text())
  })

  it('displays a list of expansions if an array is the first item', () => {
    const expansions = [['a', 'b', 'c'], 'd']
    const wrapper = mount(<List {...defaultProps} expansions={expansions} />)
    assert.equal('a, b,  and c', wrapper.text())
  })

  it('displays an anchor element', () => {
    const wrapper = mount(<List {...defaultProps} />)
    assert.equal(1, wrapper.find('a').length)
  })

  it('displays each available choice as an anchor', () => {
    const expansions = [['a', 'b', 'c'], 'd']
    const wrapper = mount(<List {...defaultProps} expansions={expansions} />)
    assert.equal(3, wrapper.find('a').length)
  })

  it('allows the author to override the default conjunction', () => {
    const expansions = [['a', 'b', 'c'], 'd']
    const conjunction = 'or'
    const wrapper = mount(<List {...defaultProps} expansions={expansions} conjunction={conjunction} />)
    assert.equal('a, b,  or c', wrapper.text())
  })

  it('allows the author to override the default separator', () => {
    const expansions = [['a', 'b', 'c'], 'd']
    const separator = '|'
    const wrapper = mount(<List {...defaultProps} expansions={expansions} separator={separator} />)
    assert.equal('a|b| and c', wrapper.text())
  })

  it('stops displaying anchors when no more expansions can be clicked on', () => {
    const wrapper = mount(<List {...defaultProps} currentExpansion={0} />)
    assert.equal(1, wrapper.find('a').length)
    wrapper.setProps({ currentExpansion: 2 })
    assert.equal(0, wrapper.find('a').length)
  })

  it('displays the nth expansion based on the current value', () => {
    const wrapper = mount(<List {...defaultProps} currentExpansion={1} />)
    assert.equal('b', wrapper.text())
  })

  it('calls the onSetExpansions reducer method when clicked on', () => {
    const wrapper = mount(<List {...defaultProps} />)
    assert.isFalse(wrapper.instance().props.onSetExpansions.calledOnce)
    wrapper.find('a').simulate('click')
    assert.isTrue(wrapper.instance().props.onSetExpansions.calledOnce)
  })

  it('calls the onUpdateInventory reducer method with the new inventory value when clicked on', () => {
    const wrapper = mount(<List {...defaultProps} />)
    wrapper.find('a').simulate('click')
    assert(wrapper.instance().props.onUpdateInventory.calledWith('a', tag))
  })

  it('calls the onCompleteSection reducer method when more no expansions are available and nextUnit is "section"', () => {
    const wrapper = mount(<List {...defaultProps} currentExpansion={1} nextUnit="section" />)
    wrapper.find('a').simulate('click')
    assert.isTrue(wrapper.instance().props.onCompleteSection.called)
    assert.isFalse(wrapper.instance().props.onCompleteChapter.called)
  })

  it('calls the onCompleteSection reducer method when more no expansions are available and nextUnit is "chapter"', () => {
    const wrapper = mount(<List {...defaultProps} currentExpansion={1} nextUnit="chapter" />)
    wrapper.find('a').simulate('click')
    assert.isFalse(wrapper.instance().props.onCompleteSection.called)
    assert.isTrue(wrapper.instance().props.onCompleteChapter.called)
  })

  it('calls no completion methods when more no expansions are available and nextUnit is "none" or null', () => {
    const wrapper = mount(<List {...defaultProps} currentExpansion={1} nextUnit={null} />)
    wrapper.find('a').simulate('click')
    assert.isFalse(wrapper.instance().props.onCompleteSection.called)
    assert.isFalse(wrapper.instance().props.onCompleteChapter.called)
    wrapper.setProps({ nextUnit: 'none' })
    wrapper.find('a').simulate('click')
    assert.isFalse(wrapper.instance().props.onCompleteSection.called)
    assert.isFalse(wrapper.instance().props.onCompleteChapter.called)
  })

  it('calls the onUpdateCounter method when an expansion is selected', () => {
    const wrapper = mount(<List {...defaultProps} />)
    wrapper.find('a').simulate('click')
    assert(wrapper.instance().props.onUpdateCounter.calledOnce)
  })

  it('leaves the last expansion linked if the `persistLast` prop is true', () => {
    const wrapper = mount(<List {...defaultProps} persistLast />)
    assert.equal(1, wrapper.find('a').length)
    wrapper.find('a').simulate('click')
    assert.equal(1, wrapper.find('a').length)
    wrapper.find('a').simulate('click')
    assert.equal(1, wrapper.find('a').length)
  })

  it('should be safe to click on the last expansion in a set more than once', () => {
    const wrapper = mount(<List {...defaultProps} persistLast />)
    wrapper.find('a').simulate('click')
    wrapper.find('a').simulate('click')
    wrapper.find('a').simulate('click')
  })

  it('allows resetting an existing inventory property', () => {
    const expansions = ['a', ['b', 'c']]
    const wrapper = mount(<List {...defaultProps} persistLast expansions={expansions} />)
    wrapper.find('a').simulate('click')
    assert(wrapper.instance().props.onUpdateInventory.calledWith(expansions[0], tag))
    wrapper.setProps({ currentExpansion: 1 })
    wrapper.find('a').first().simulate('click')
    assert(wrapper.instance().props.onUpdateInventory.calledWith(expansions[1][0], tag))
  })

  it('calls the optional onComplete if supplied when the List is complete', () => {
    const wrapper = shallow(<List {...defaultProps} />)
    assert.isFalse(wrapper.instance().props.onComplete.called)
    wrapper.setProps({ currentExpansion: 2 })
    assert.isTrue(wrapper.instance().props.onComplete.called)
  })

  it('does not the onComplete if there are more items in the List', () => {
    const wrapper = mount(<List {...defaultProps} />)
    wrapper.find('a').simulate('click')
    assert.isFalse(wrapper.instance().props.onComplete.called)
  })

  it('provides the final selection value and tag to the onComplete callback ', () => {
    const wrapper = shallow(<List {...defaultProps} />)
    wrapper.setProps({ currentExpansion: 2, lastSelection: 'a' })
    assert(wrapper.instance().props.onComplete.calledWith('a', tag))
  })

  it('allows the special value `_last` to represent the last item selected by the user', () => {
    const wrapper = mount(<List {...defaultProps} currentExpansion={0} />)
    assert.equal('a', wrapper.text())

    wrapper.setProps({ currentExpansion: 1 })
    assert.equal('b', wrapper.text())

    wrapper.setProps({ currentExpansion: 2 })
    assert.equal('c', wrapper.text())
    wrapper.setProps({
      lastSelection: 'a',
      expansions: ['a', 'b', '_last'],
    })
    assert.equal('a', wrapper.text())
  })

  it('allows the author to set an onLoad function to be called in the constructor', () => {
    const wrapper = shallow(<List {...defaultProps} />)
    assert(wrapper.instance().props.onLoad.calledOnce)
  })
})

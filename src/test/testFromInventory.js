import React from 'react'
import sinon from 'sinon'
import { shallow, mount } from 'enzyme'
import { assert } from 'chai'
import 'jsdom-global/register'

import { FromInventory } from '../components'

describe('<FromInventory />', () => {
  it('returns the last word in a phrase', () => {
    const inv = 'the last word'
    const wrapper = mount(<FromInventory from={inv} />)
    assert.equal('word', wrapper.text())
  })

  it('returns the word in a one-word phrase', () => {
    const inv = 'word'
    const wrapper = mount(<FromInventory from={inv} />)
    assert.equal('word', wrapper.text())
  })

  it('will not accept a non-string value for "inventory"', () => {
    assert.throws(() => (shallow(<FromInventory from={0} />)))
  })

  it('will not accept a non-number value for "offset"', () => {
    assert.throws(() => (shallow(<FromInventory from="word" offset="string" />)))
  })

  it('returns the nth word in a phrase if offset is supplied', () => {
    const inv = 'the last word'
    let n = 1
    let wrapper = mount(<FromInventory from={inv} offset={n} />)
    assert.equal('last', wrapper.text())
    n = 0
    wrapper = mount(<FromInventory from={inv} offset={n} />)
    assert.equal('the', wrapper.text())
  })

  it('sets the `key` of the return value to the original inventory string', () => {
    const inv = 'the last word'
    const wrapper = mount(<FromInventory from={inv} />)
    assert.equal(inv, wrapper.find('span').key())
  })

  it('calls the optional onLoad function on the evaluated item', () => {
    const inv = 'word'
    const func = sinon.spy()
    mount(<FromInventory from={inv} onLoad={func} />)
    assert(func.calledOnce)
  })

  it('calls the optional onLoad function on the evaluated item after it has been processed by its offset', () => {
    const inv = 'the last word'
    const func = sinon.spy()
    mount(<FromInventory from={inv} onLoad={func} />)
    assert(func.calledWith('word'))

    mount(<FromInventory from={inv} onLoad={func} offset={0} />)
    assert(func.calledWith('the'))
  })

  it('is safe to set an onLoad function even if the inventory value is undefined', () => {
    const inv = undefined
    const func = sinon.spy()
    const wrapper = mount(<FromInventory from={inv} onLoad={func} />)
    assert(!func.called)
    assert(wrapper.text() === '')
  })

  it('will return the entire string if offset is null', () => {
    const inv = 'the last word'
    const wrapper = mount(<FromInventory from={inv} offset={null} />)
    assert(wrapper.text() === 'the last word')
  })
})

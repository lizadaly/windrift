import React from 'react'
import sinon from 'sinon'
import { shallow, mount } from 'enzyme'
import { assert } from 'chai'
import 'jsdom-global/register'

import {FromInventory} from '../components'

describe('<FromInventory />', () => {
  before(() => {
    sinon.stub(console, 'error', (warning) => { throw new Error(warning) })
  }),
  after(() => {
    console.error.restore()
  }),

  it('returns the last word in a phrase', () => {
    const inv = "the last word"
    const wrapper = mount(<FromInventory inventory={inv} />)
    assert.equal("word", wrapper.text())
  }),

  it('returns the word in a one-word phrase', () => {
    const inv = "word"
    const wrapper = mount(<FromInventory inventory={inv} />)
    assert.equal("word", wrapper.text())
  }),

  it('will not accept a non-string value for "inventory"', () => {
    assert.throws(() => (shallow(<FromInventory inventory={0} />), Error))
  }),

  it('will not accept a non-number value for "offset"', () => {
    assert.throws(() => (shallow(<FromInventory inventory="word" offset="string"/>), Error))
  }),

  it('returns the nth word in a phrase if offset is supplied', () => {
    const inv = "the last word"
    let n = 1
    let wrapper = mount(<FromInventory inventory={inv} offset={n}/>)
    assert.equal("last", wrapper.text())
    n = 0
    wrapper = mount(<FromInventory inventory={inv} offset={n}/>)
    assert.equal("the", wrapper.text())
  }),

  it('returns the last word in a phrase if offset exceeds the string length', () => {
    const inv = "the last word"
    let n = 10
    const wrapper = mount(<FromInventory inventory={inv} offset={n} />)
    assert.equal("word", wrapper.text())
  }),

  it('sets the `key` of the return value to the original inventory string', () => {
    const inv = "the last word"
    const wrapper = mount(<FromInventory inventory={inv} />)
    assert.equal(inv, wrapper.find('span').key())
  })

})

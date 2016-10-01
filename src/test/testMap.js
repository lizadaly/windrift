import React from 'react'
import sinon from 'sinon'
import { shallow, mount } from 'enzyme'
import { assert } from 'chai'
import 'jsdom-global/register'

import {Map} from '../components'

describe('<Map />', () => {
  before(() => {
    sinon.stub(console, 'error', (warning) => { throw new Error(warning) })
  }),
  after(() => {
    console.error.restore()
  }),

  it('returns a matching key `from` from an object `to` ', () => {
    const from = "lock"
    const matchText = "the rusty lock"
    const to = {lock: matchText, box: "other text"}
    const wrapper = mount(<Map from={from} to={to} />)
    assert.equal(matchText, wrapper.text())
  }),

  it('uses the last-word default to match phrase `from`', () => {
    const from = "a rusty lock"  // Only should care about 'lock'
    const matchText = "The lock withers under your gaze"
    const to = {lock: matchText}
    const wrapper = mount(<Map from={from} to={to} />)
    assert.equal(matchText, wrapper.text())
  }),

  it('uses the `offset` parameter to match phrase `from`', () => {
    const from = "a rusty lock"  // Only should care about 'rusty'
    const matchText = "The lock withers under your gaze"
    const to = {rusty: matchText}
    const wrapper = mount(<Map from={from} to={to} offset={1} />)
    assert.equal(matchText, wrapper.text())
  }),

  it('when the `to` value is a string, return wrapped HTML', () => {
    const from = "a rusty lock"
    const matchText = "The lock withers under your gaze"
    const to = {lock: matchText}
    const wrapper = shallow(<Map from={from} to={to} />)
    assert.equal(1, wrapper.find('span').length)
  }),

  it('the wrapped HTML should include the output as the `key`', () => {
    const from = "a rusty lock"
    const matchText = "The lock withers under your gaze"
    const to = {lock: matchText}
    const wrapper = shallow(<Map from={from} to={to} />)
    assert.equal(matchText, wrapper.find('span').key())
  }),

  it('the component should accept only strings as the `from` parameter', () => {
    const from = 1
    const to = {"a": "b"}
    assert.throws(() => shallow(<Map from={from} to={to} />), Error)
  }),

  it('the component should accept only objects as the `to` parameter', () => {
    const from = "1"
    const to = "1"
    assert.throws(() => shallow(<Map from={from} to={to} />), Error)
  }),

  it('the component should return null if no `from` parameter was supplied', () => {
    const from = null
    const to = {"a": "b"}
    const wrapper = shallow(<Map from={from} to={to} />)
    assert.isNull(wrapper.type())
  }),

  it('Keys in the `to` map should match regardless of `from` case', () => {
    const from = "SHOUTING"
    const matchText = "I'm not shouting, you're shouting"
    const to = {"shouting": matchText}
    const wrapper = mount(<Map from={from} to={to} />)
    assert.equal(matchText, wrapper.text())
  }),

  it('Keys in the `to` map should match regardless of `from` case', () => {
    const from = "SHOUTING"
    const matchText = "I'm not shouting, you're shouting"
    const to = {"shouting": matchText}
    const wrapper = mount(<Map from={from} to={to} />)
    assert.equal(matchText, wrapper.text())
  })


})

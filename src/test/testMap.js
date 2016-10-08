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

  it('when the `to` value is a string, returns wrapped HTML', () => {
    const from = "a rusty lock"
    const matchText = "The lock withers under your gaze"
    const to = {lock: matchText}
    const wrapper = shallow(<Map from={from} to={to} />)
    assert.equal(1, wrapper.find('span').length)
  }),

  it('includes the output as the `key` when the result is wrapped HTML', () => {
    const from = "a rusty lock"
    const matchText = "The lock withers under your gaze"
    const to = {lock: matchText}
    const wrapper = shallow(<Map from={from} to={to} />)
    assert.equal(matchText, wrapper.find('span').key())
  }),

  it('accepts only strings as the `from` parameter', () => {
    const from = 1
    const to = {"a": "b"}
    assert.throws(() => shallow(<Map from={from} to={to} />), Error)
  }),

  it('accepts only objects as the `to` parameter', () => {
    const from = "1"
    const to = "1"
    assert.throws(() => shallow(<Map from={from} to={to} />), Error)
  }),

  it('return nulls if no `from` parameter was supplied', () => {
    const from = null
    const to = {"a": "b"}
    const wrapper = shallow(<Map from={from} to={to} />)
    assert.isNull(wrapper.type())
  }),

  it('does case-insensitive mapping of the `from` value', () => {
    const from = "SHOUTING"
    const matchText = "I'm not shouting, you're shouting"
    const to = {"shouting": matchText}
    const wrapper = mount(<Map from={from} to={to} />)
    assert.equal(matchText, wrapper.text())
  }),

  it('when the `to` value is a React node, returns an equivalent React Node', () => {
    const from = "a rusty lock"
    const text = "A paragraph for your thoughts?"
    const matchText = <foo>{text}</foo>
    const to = {lock: matchText}
    const wrapper = shallow(<Map from={from} to={to} />)
    assert.equal(1, wrapper.find('foo').length)
    assert.equal(text, wrapper.childAt(0).text())
  }),

  it('when the `to` value is a function, calls that function', () => {
    const from = "a rusty lock"
    const text = "Hello from func"
    const func = () => (<p>{text}</p>)
    const to = {lock: func}
    const wrapper = shallow(<Map from={from} to={to} />)
    assert.equal(text, wrapper.childAt(0).text())
  }),

  it('when the `from` key does not match anything in `to`, returns null', () => {
    const from = "foo"
    const to = {lock: "box"}
    const wrapper = shallow(<Map from={from} to={to} />)
    assert.isNull(wrapper.type())
  }),

  it('when the `from` string evaluates to undefined and there is an undefined key in `to`, return the value for `unselected`', () => {
    const from = undefined
    const to = {lock: "box", unselected: "default"}
    const wrapper = mount(<Map from={from} to={to} />)
    assert.equal("default", wrapper.text())
  })


})

import 'jsdom-global/register'
import React from 'react'
import sinon from 'sinon'
import { shallow, mount } from 'enzyme'
import { assert } from 'chai'

import {List, Link} from '../components'

describe('<Link />', () => {
  before(() => {
    sinon.stub(console, 'error', (warning) => { throw new Error(warning) })
  }),
  after(() => {
    console.error.restore()
  }),

  it('renders an anchor link if an onClick handler is supplied', () => {
    const func = () => {}
    const wrapper = shallow(<Link text="test" handler={func} />)
    assert.equal(1, wrapper.find('a').length)
  }),

  it('will not accept a non-string value for "text"', () => {
    const func = () => {}
    assert.throws(() => (shallow(<Link text={0} handler={func} />), Error))
  }),

  it('will not accept a non-function value for "handler"', () => {
    const func = "string"
    assert.throws(() => (shallow(<Link text="foo" handler={func} />), Error))
  }),

  it('renders an anchor link if an onClick handler is supplied', () => {
    const func = () => {}
    const wrapper = shallow(<Link text="test" handler={func} />)
    assert.equal(1, wrapper.find('a').length)
  }),

  it('renders plain HTML if no onClick handler is supplied', () => {
    const wrapper = shallow(<Link text="test" handler={null} />)
    assert.equal(1, wrapper.find('span').length)
    assert.equal(0, wrapper.find('a').length)
  }),

  it('renders the text passed inside an anchor when an onClick handler is supplied', () => {
    const func = () => {}
    const text = "Sample text"
    const wrapper = shallow(<Link text={text} handler={func} />)
    assert.equal(text, wrapper.text())
  }),

  it('renders the text passed inside a span when no onClick handler is supplied', () => {
    const text = "Sample text"
    const wrapper = shallow(<Link text={text} />)
    assert.equal(text, wrapper.text())
  }),

  it('will fire the handler when clicked', () => {
    const func = sinon.spy()
    const wrapper = mount(<Link text="text" handler={func} />)
    wrapper.find('a').simulate('click')
    assert(func.calledOnce)
  })

})

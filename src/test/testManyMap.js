import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import 'jsdom-global/register'

import { ManyMap } from '../components'

describe('<ManyMap />', () => {
  beforeEach(() => {
    sinon.stub(console, 'error').callsFake((warning) => { throw new Error(warning) })
  })

  afterEach(() => {
    console.error.restore() // eslint-disable-line no-console
  })

  it('returns null if the `from ` array is empty ', () => {
    const from = null
    const to = { a: 'b' }
    const wrapper = shallow(<ManyMap from={from} to={to} />)
    assert.isNull(wrapper.type())
  })

  it('returns matching values `from` from an object `to` ', () => {
    const from = ['lock']
    const matchText = 'the rusty lock'
    const to = { lock: matchText, box: 'other text' }
    const wrapper = shallow(<ManyMap from={from} to={to} />)
    assert.equal(matchText, wrapper.text())
  })

  it('returns an Object containing matching values `from` from an object `to` ', () => {
    const from = ['lock']
    const matchText = 'the rusty lock'
    const to = { lock: matchText, box: 'other text' }
    const wrapper = shallow(<ManyMap from={from} to={to} />)
    // We expect <span><span key={}>text</span></span>
    assert.equal(2, wrapper.find('span').length)
    assert.equal(1, wrapper.childAt(0).find('span').length)
  })

  it('returns multiple matching values `from` from an object `to` ', () => {
    const from = ['lock', 'box']
    const to = { lock: 'this', box: 'that' }
    const wrapper = shallow(<ManyMap from={from} to={to} />)
    assert.equal(3, wrapper.find('span').length)
    assert.equal('thisthat', wrapper.text())
  })
})

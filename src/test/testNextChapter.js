import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { assert } from 'chai'

import { NextChapter, List } from '../components'

describe('<NextChapter />', () => {
  beforeEach(() => {
    sinon.stub(console, 'error').callsFake((warning) => { throw new Error(warning) })
  })

  afterEach(() => { console.error.restore() }) // eslint-disable-line no-console

  it('renders a next chapter List element', () => {
    const wrapper = shallow(<NextChapter chapter={0} />)
    assert.equal(1, wrapper.find(List).length)
  })

  it('renders a div with the next-chapter-link class', () => {
    const wrapper = shallow(<NextChapter chapter={0} />)
    assert.equal(1, wrapper.find('div.next-chapter-link').length)
  })

  it('renders a set of expansions with the default label text `Continue`', () => {
    const wrapper = shallow(<NextChapter chapter={0} />)
    const l = wrapper.find(List)
    assert.equal(2, l.prop('expansions').length)
    assert.equal('Continue', l.prop('expansions')[0])
  })

  it('renders a set of expansions with the label text supplied', () => {
    const label = 'Foo'
    const wrapper = shallow(<NextChapter chapter={0} label={label} />)
    const l = wrapper.find(List)
    assert.equal(2, l.prop('expansions').length)
    assert.equal(label, l.prop('expansions')[0])
  })

  it('renders a Link with nextUnit set to "chapter"', () => {
    const wrapper = shallow(<NextChapter chapter={0} />)
    const l = wrapper.find(List)
    assert.equal('chapter', l.prop('nextUnit'))
  })

  it('will not accept a non-integer value for "chapter"', () => {
    assert.throws(() => (shallow(<NextChapter chapter="foo" />)))
  })
})

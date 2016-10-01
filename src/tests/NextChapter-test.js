import React from 'react'
import sinon from 'sinon'
import { shallow, render } from 'enzyme'
import { expect } from 'chai'

import {NextChapter, List, Link} from '../components'

var rewire = require('rewire')
var comp = rewire('../components/index.js')
var _List = comp.__get__('_List')

describe('<NextChapter />', () => {
  it('renders a next chapter List element', () => {
    const wrapper = shallow(<NextChapter chapter="0" />)
    expect(wrapper.find(List)).to.have.length(1)
  }),

  it('renders a div with the next-chapter-link class', () => {
    const wrapper = shallow(<NextChapter chapter="0" />)
    expect(wrapper.find('div.next-chapter-link')).to.have.length(1)
  }),

  it('renders a set of expansions with the default label text `Continue`', () => {
    const wrapper = shallow(<NextChapter chapter="0" />)
    const l = wrapper.find(List)
    expect(l.prop('expansions')).to.have.length(2)
    expect(l.prop('expansions')[0]).to.equal("Continue")
  }),
  it('renders a set of expansions with the label text supplied', () => {
    const label = "Foo"
    const wrapper = shallow(<NextChapter chapter="0" label={label}/>)
    const l = wrapper.find(List)
    expect(l.prop('expansions')).to.have.length(2)
    expect(l.prop('expansions')[0]).to.equal(label)
  })
})

import React from 'react'
import sinon from 'sinon'
import { shallow, mount } from 'enzyme'
import { assert } from 'chai'
import 'jsdom-global/register'

import {AllButSelection} from '../components'

describe('<AllButSelection />', () => {
  before(() => {
    sinon.stub(console, 'error', (warning) => { throw new Error(warning) })
  }),
  after(() => {
    console.error.restore()
  }),

  it('displays a string of all the items ', () => {
    const selection = "a"
    const expansions = ["a", "b", "c"]
    const wrapper = mount(<AllButSelection selection={selection} expansions={expansions} />)
    assert.equal("b and c", wrapper.text())
  })
})

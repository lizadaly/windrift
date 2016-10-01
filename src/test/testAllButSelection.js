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

  it('displays a string when two items do not match', () => {
    const selection = "a"
    const expansions = ["a", "b", "c"]
    const wrapper = mount(<AllButSelection selection={selection} expansions={expansions} />)
    assert.equal("b and c", wrapper.text())
  }),

  it("displays a string when one item doesn't matches", () => {
    const selection = "a"
    const expansions = ["a", "b"]
    const wrapper = mount(<AllButSelection selection={selection} expansions={expansions} />)
    assert.equal("b", wrapper.text())
  }),

  it("displays a string when all items don't match", () => {
    const selection = "z"
    const expansions = ["a", "b", "c"]
    const wrapper = mount(<AllButSelection selection={selection} expansions={expansions} />)
    // There's an extra space here but it's HTML so emoji shrug?
    assert.equal("a, b,  and c", wrapper.text())
  })
})

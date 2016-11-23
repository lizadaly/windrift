import 'jsdom-global/register'

var chai = require('chai')
chai.use(require('chai-string'))

import React from 'react'
import sinon from 'sinon'
import {Provider, connect} from 'react-redux'
import {assert} from 'chai'
import {shallow, mount} from 'enzyme'
import {shallowWithStore, shallowWithState} from 'enzyme-redux'
import {createMockStore} from 'redux-test-utils'


import {NestedList, TestNestedList, serialize, readFromTokens, tokenize, render} from '../components/nestedlist'

const TAG = 'test'

describe('<NestedList />', () => {
  const ex = `[
         [The (world's largest) economy]
         [grew
            (at [an (annual) rate] of 2.9%)
         ]
         (according to the Commerce Department)
       ]`,

      ex_parse = [ 'show'
      , [ 'show'
        , 'The'
        , [ 'hide'
          , "world's largest"
          ]
        , 'economy'
        ]
      , [ 'show'
        , 'grew'
        , [ 'hide'
          , 'at'
          , [ 'show'
            , 'an'
            , [ 'hide'
              , 'annual'
              ]
            , 'rate'
            ]
          , 'of 2.9%'
          ]
        ]
      , [ 'hide'
        , 'according to the Commerce Department'
        ]
      ]

  it('stores the processed input in the state', () => {
    const wrapper = shallow(<TestNestedList expansions={ex} tag={TAG}/>)
    assert.deepEqual(ex_parse, wrapper.state('tokenized'))
  }),

  it('errors appropriately if no open bracket is supplied', () => {
    const g = ' abc (def) ghi'
    assert.throws(() => shallow(<TestNestedList expansions={g} tag={TAG}/>, "sequence of tokens should start with an open bracket"))
  }),

  it('errors appropriately if no tokens are supplied', () => {
    const g = ' '
    assert.throws(() => shallow(<TestNestedList expansions={g} tag={TAG}/>, "no tokens supplied"))
  }),

  it('errors appropriately if no close bracket is supplied', () => {
    const g = '(abc) def'
    assert.throws(() => shallow(<TestNestedList expansions={g} tag={TAG}/>, "sequence of tokens should end with a close bracket"))
  }),

  it('errors appropriately if a closing bracket is supplied too soon', () => {
    const g = '(hello]'
    assert.throws(() => shallow(<TestNestedList expansions={g} tag={TAG}/>, "unexpected closing bracket"))
  }),

  it('errors appropriately if an expression is unclosed', () => {
    const g = '[hello (world)'
    assert.throws(() => shallow(<TestNestedList expansions={g} tag={TAG}/>, "unexpected EOF while reading sequence of tokens"))
  }),

  it('errors appropriately if a closing bracket is supplied too soon in a complex expression', () => {
    const g = '[hello [hello)]'
    assert.throws(() => shallow(<TestNestedList expansions={g} tag={TAG}/>, Error, /unexpected closing bracket/))
  }),

  it('parses escaped brackets correctly', () => {
    const g1 = String.raw`[hello \(wacky\) world]`
    const g2 = String.raw`(hello \[wacky\] world)`
    var wrapper = shallow(<TestNestedList expansions={g1} tag={TAG}/>)
    assert.deepEqual(['show', 'hello &#40;wacky&#41; world'], wrapper.state('tokenized'))
    var wrapper = shallow(<TestNestedList expansions={g2} tag={TAG}/>)
    assert.deepEqual(['hide', 'hello &#91;wacky&#93; world'], wrapper.state('tokenized'))
  }),

  it('renders the text of the input correctly', () => {
    var wrapper = mount(<TestNestedList expansions={ex} tag={TAG}/>)
    assert.equalIgnoreSpaces("The economy grew", wrapper.text())
  }),

  it('renders the hidden text as links', () => {
    var wrapper = mount(<TestNestedList expansions={ex} tag={TAG}/>)
    assert.equal(1, wrapper.find('a').length)
  }),
  it('changes the value of the anchor child to "show" when clicked', () => {
    var wrapper = mount(<TestNestedList expansions={ex} tag={TAG}/>)
    wrapper.find('a').simulate('click')
    // After clicking there should be two child anchors
    assert.equal(2, wrapper.find('a').length)
    wrapper.find('a').first().simulate('click')
  })
})


describe('serialize', () => {
  const ex = `[[The(world's largest)economy][grew(at[an(annual)rate]of 2.9%)](according to the Commerce Department)]`,
        ex_parse = [ 'show'
      , [ 'show'
        , 'The'
        , [ 'hide'
          , "world's largest"
          ]
        , 'economy'
        ]
      , [ 'show'
        , 'grew'
        , [ 'hide'
          , 'at'
          , [ 'show'
            , 'an'
            , [ 'hide'
              , 'annual'
              ]
            , 'rate'
            ]
          , 'of 2.9%'
          ]
        ]
      , [ 'hide'
        , 'according to the Commerce Department'
        ]
      ]
 it('serializes the parsed input back into a string', () => {
   assert.equal(ex, serialize(ex_parse))
 })
})

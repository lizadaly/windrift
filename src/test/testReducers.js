import React from 'react'
import { assert } from 'chai'

import * as r from '../reducers'
import * as a from '../actions'

describe('bookmarks()', () => {
  let action, state
  beforeEach(() => {
    action = {type: null}
    state = [0]
  }),
  it('defaults to a one-item array containing zero: first chapter, first section', () => {
    assert.deepEqual([0], r.bookmarks(state, action))
  }),

  it('creates a new chapter by adding a new item to the array and setting its value to zero', () => {
    action.type = a.SHOW_NEXT_CHAPTER
    assert.deepEqual([0, 0], r.bookmarks(state, action))
  }),

  it('creates a new section by incrementing the value of the last item in the array', () => {
    action.type = a.SHOW_NEXT_SECTION
    assert.deepEqual([1], r.bookmarks(state, action))
  }),

  it('only increments the last item in the array', () => {
    action.type = a.SHOW_NEXT_SECTION
    state = [1,0]
    assert.deepEqual([1,1], r.bookmarks(state, action))
  })


})

describe('inventory()', () => {
  let state, action
  const actionCreator = a.updateInventory
  const tag = 't0_test'
  const sel = 'test'
  const inv = {
    tag: tag,
    sel: sel
  }
  beforeEach(() => {
    state = {}
    action = {type: null}
  }),

  it('defaults to an empty object', () => {
    assert.deepEqual({}, r.inventory(state, action))
  }),

  it('adds the selection to the inventory', () => {
    assert.deepEqual({t0_test: 'test'}, r.inventory(state, actionCreator(sel, tag)))
  }),

  it('modifies an existing selection to the inventory', () => {
    let sel = 'test1'
    let state1 = r.inventory(state, actionCreator(sel, tag))
    assert.deepEqual({t0_test: 'test1'}, state1)
    sel = 'test2'
    let state2 = r.inventory(state1, actionCreator(sel, tag))
    assert.deepEqual({t0_test: 'test2'}, state2)
  }),

  it('adds a new object inventory with a new tag', () => {
    let tag1 = 't0_test'
    let state1 = r.inventory(state, actionCreator(sel, tag1))
    assert.deepEqual({t0_test: sel}, state1)
    let tag2 = 't0_test2'
    let sel2 = 'sel2'
    let state2 = r.inventory(state1, actionCreator(sel2, tag2))
    assert.deepEqual({t0_test: sel, t0_test2: sel2}, state2)
  })

})

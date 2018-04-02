import { assert } from 'chai'

// Importing non-undo components until https://github.com/omnidan/redux-undo/issues/120
// is fixed
import { bookmarks } from '../reducers/bookmarks'
import { inventory } from '../reducers/inventory'
import { expansions } from '../reducers/expansions'
import { counter } from '../reducers/counter'

import * as a from '../actions'

describe('bookmarks()', () => {
  let state
  beforeEach(() => {
    state = [0]
  })

  it('defaults to a one-item array containing zero: first chapter, first section', () => {
    const action = { type: null }
    assert.deepEqual([0], bookmarks(state, action))
  })

  it('creates a new chapter by adding a new item to the array and setting its value to zero', () => {
    assert.deepEqual([0, 0], bookmarks(state, a.showNextChapter()))
  })

  it('creates a new section by incrementing the value of the last item in the array', () => {
    assert.deepEqual([1], bookmarks(state, a.showNextSection()))
  })

  it('only increments the last item in the array when showing the next section', () => {
    state = [1, 0]
    assert.deepEqual([1, 1], bookmarks(state, a.showNextSection()))
  })

  it('allows jumping to a later section via overriding the default nextSection value', () => {
    state = [1, 0]
    assert.deepEqual([1, 3], bookmarks(state, a.showNextSection(3)))
  })
})

describe('inventory()', () => {
  let state
  let action
  const actionCreator = a.updateInventory
  const tag = 't0_test'
  let sel = 'test'

  beforeEach(() => {
    state = {}
    action = { type: null }
  })

  it('defaults to an empty object', () => {
    assert.deepEqual({}, inventory(state, action))
  })

  it('adds the selection to the inventory', () => {
    assert.deepEqual({ t0_test: 'test' }, inventory(state, actionCreator(sel, tag)))
  })

  it('modifies an existing selection to the inventory', () => {
    sel = 'test1'
    const state1 = inventory(state, actionCreator(sel, tag))
    assert.deepEqual({ t0_test: 'test1' }, state1)
    sel = 'test2'
    const state2 = inventory(state1, actionCreator(sel, tag))
    assert.deepEqual({ t0_test: 'test2' }, state2)
  })

  it('adds a new object inventory with a new tag', () => {
    const tag1 = 't0_test'
    const state1 = inventory(state, actionCreator(sel, tag1))
    assert.deepEqual({ t0_test: sel }, state1)
    const tag2 = 't0_test2'
    const sel2 = 'sel2'
    const state2 = inventory(state1, actionCreator(sel2, tag2))
    assert.deepEqual({ t0_test: sel, t0_test2: sel2 }, state2)
  })

  it('sets a placeholder value for a tag if sel is undefined and not already set', () => {
    const state1 = inventory(state, actionCreator(undefined, tag))
    assert.deepEqual({ t0_test: undefined }, state1)
  })

  it('will not overwrite a previously defined value if sel is undefined', () => {
    const state1 = inventory(state, actionCreator(sel, tag))
    assert.deepEqual({ t0_test: sel }, state1)
    const state2 = inventory(state1, actionCreator(undefined, tag))
    // Should remain sel, not overwrite with undefined
    assert.deepEqual({ t0_test: sel }, state2)
  })
})
describe('expansions()', () => {
  let state
  const tag = 't0_test'
  const sel = 'test'
  beforeEach(() => {
    state = {}
  })
  it('defaults to an empty obj', () => {
    assert.deepEqual({}, expansions(state, { type: a.SET_EXPANSIONS, expansion: {} }))
  })
  it('returns an object with the current expansion and a list of expansions', () => {
    assert.deepEqual(
      { t0_test: { currentExpansion: 0, expansions: [sel] } },
      expansions(state, a.setExpansions([sel], tag, 0))
    )
  })
})

describe('counter()', () => {
  let state
  beforeEach(() => {
    state = 0
  })
  it('defaults to 1', () => {
    assert.equal(1, counter(state, { type: a.UPDATE_STATE_COUNTER }))
  })
  it('increments the turn counter', () => {
    const state1 = counter(state, a.updateStateCounter())
    assert.equal(2, counter(state1, a.updateStateCounter()))
    const state2 = counter(state1, a.updateStateCounter())
    assert.equal(3, counter(state2, a.updateStateCounter()))
  })
})

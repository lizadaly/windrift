import React from 'react'

import { assert, expect } from 'chai'
import { shallow } from 'enzyme'
import checkPropTypes from 'check-prop-types'

import { Game } from '../components/game'

describe('<Game />', () => {
  const config = {
    pagination: 'by-section',
  }
  const MockChapter = () => null

  const chapters = {
    chapter1: { default: MockChapter },
    chapter2: { default: MockChapter },
  }
  const chaptersList = (filename) => chapters[filename]
  chaptersList.keys = () => ['chapter1', 'chapter2']

  const defaultProps = { config, chaptersList, currentChapter: 0 }

  it('complains if there is no well-formed chaptersList', () => {
    const props = { ...defaultProps, chaptersList: () => {} }
    expect(checkPropTypes(Game.propTypes, props, 'prop', Game.currentChapter))
      .contains('chaptersList must include a keys func')
  })

  it('complains if the chaptersList has zero chapters', () => {
    const props = { ...defaultProps, chaptersList: { keys: () => [] } }
    expect(checkPropTypes(Game.propTypes, props, 'prop', Game.currentChapter))
      .contains('chaptersList must include at least one chapter')
  })

  it('should error if the currentChapter counter is negative', () => {
    const props = { ...defaultProps, currentChapter: -1 }
    expect(checkPropTypes(Game.propTypes, props, 'prop', Game.currentChapter))
      .contains('currentChapter must be a positive integer')
  })
  it('should error if the currentChapter counter is not a number', () => {
    const props = { ...defaultProps, currentChapter: 'x' }
    expect(checkPropTypes(Game.propTypes, props, 'prop', Game.currentChapter))
      .contains('currentChapter must be a positive integer')
  })

  it('should error if the currentChapter counter is out of bounds', () => {
    const props = { ...defaultProps, currentChapter: 3 }
    expect(() => shallow(<Game {...defaultProps} currentChapter={3} />)).to.throw(Error)
    expect(checkPropTypes(Game.propTypes, props, 'prop', Game.currentChapter))
      .contains('currentChapter cannot be greater than the total number of chapters')
  })

  it('renders a game with valid props', () => {
    const wrapper = shallow(<Game {...defaultProps} />)
    assert(wrapper.find('div.game').exists())
  })

  it('returns the correct number of visible chapters based on pagination settings', () => {
    const wrapper = shallow(<Game {...defaultProps} />)
    expect(wrapper.instance().chapters).to.have.lengthOf(2)
    // One chapter is visible at the start
    expect(wrapper.instance().getVisibleChapters()).to.have.lengthOf(1)

    // Now expect both
    wrapper.setProps({ currentChapter: 1 })
    expect(wrapper.instance().getVisibleChapters()).to.have.lengthOf(2)
  })

  it('renders just one chapter when at the start', () => {
    const wrapper = shallow(<Game {...defaultProps} />)
    assert(wrapper.find('div.current-chapter').exists())
    // There should be no other chapter but the current
    assert(!wrapper.find('div.chapter').exists())
  })

  it('renders two chapters when current is > 1', () => {
    const wrapper = shallow(<Game {...defaultProps} currentChapter={1} />)
    assert(wrapper.find('div.current-chapter').exists())
    assert(wrapper.find('div.chapter').exists())
  })

  it('renders only the current chapter with chapter pagination on', () => {
    const wrapper = shallow(<Game {...defaultProps} config={{ pagination: 'by-chapter' }} currentChapter={1} />)
    assert(wrapper.find('div.current-chapter').exists())
    assert(!wrapper.find('div.chapter').exists())

    // Turning off chapter pagination will make div.chapter exist
    wrapper.setProps({ config: { pagination: 'by-section' } })
    assert(wrapper.find('div.current-chapter').exists())
    assert(wrapper.find('div.chapter').exists())
  })

  it('initalizes a set of chapters into a sorted array of connected chapter components', () => {
    const wrapper = shallow(<Game {...defaultProps} />)

    const c = {
      chapter3: { default: () => (<div>chapter3</div>) },
      chapter2: { default: MockChapter },
      chapter1: { default: MockChapter },
    }
    const cl = (filename) => c[filename]
    // Make the list "unsorted"
    cl.keys = () => ['chapter3', 'chapter1', 'chapter2']

    const inited = wrapper.instance().initializeChapters(cl)
    expect(inited[0].props.chapterId).to.equal(0)
    expect(inited[1].props.chapterId).to.equal(1)

    // Test that it's a connected component
    expect(inited[0]).to.have.property('type').with.property('propTypes').with.property('store')
  })
})

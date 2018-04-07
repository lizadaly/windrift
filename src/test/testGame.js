import 'jsdom-global/register'
import React from 'react'
import sinon from 'sinon'

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
    expect(() => shallow(<Game currentChapter={0} config={config} chaptersList={() => {}} />)).to.throw(Error)
      .that.has.property('message')
      .that.contains('chaptersList must include a keys func')
  })

  it('complains if the chaptersList has zero chapters', () => {
    expect(() => shallow(<Game
      currentChapter={0}
      config={config}
      chaptersList={{
        keys: () => [],
      }}
    />)).to.throw(Error)
      .that.has.property('message')
      .that.contains('chaptersList must include at least one chapter')
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


  it('renders a game with a couple simple chapters', () => {
    const wrapper = shallow(<Game {...defaultProps} />)
    assert(wrapper.find('div.game').exists())
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
})

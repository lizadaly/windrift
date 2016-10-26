const React = require('react')
import { List, RenderSection } from 'windrift'

const materials = ['A house of leaves', 'A house of plastic', 'A house of steel', 'A house of brick', 'A house of sand',
   'A house of discarded clothing', 'A house of weeds', 'A house of wood', 'A house of roots',
   'A house of paper', 'A house of broken dishes', 'A house of mud', 'A house of glass', 'A house of dust']

const locations = ['on an island', 'in a deserted church', 'among other houses', 'by a river', 'in heavy jungle undergrowth',
  'underwater', 'among small hills', 'in a place with both heavy rain and bright sun', 'on the sea', 'in a desert',
  'in a cold, windy climate', 'in southern France', 'in Michigan', 'in dense woods']

const lighting = ['using natural light', 'using all available lighting', 'using electricity', 'using candles']

const inhabited = ['inhabited by all races of men represented wearing predominantly red clothing',
  'inhabited by people who sleep almost all the time', 'inhabited by fishermen and families', 'inhabited by various birds and fish',
  'inhabited by French- and German-speaking people', 'inhabited by lovers', 'inhabited by people who sleep very little',
  'inhabited by collectors of all types', 'inhabited by people who enjoy eating together', 'inhabited by vegetarians',
  'inhabited by friends', 'inhabited by little girls']

var sections = []

export default ({currentSection, inventory}) => {

  sections.push([<Stanza key={currentSection} />])

  return <RenderSection currentSection={currentSection} sections={sections} />
}

const Stanza = () => {
  var line = <div className="stanza">
    <p>{ wrap(rand(materials)) }</p>
    <p>{ wrap(rand(locations)) }</p>
    <p>{ wrap(rand(lighting)) }</p>
    <p>{ wrap(rand(inhabited)) }</p>
  </div>
  return line
}

const wrap = (line) => {
  var words = line.split(' ')
  var i = randFromLen(words)
  var ret = words.map((word, index) => {
    if (index === i)
      return <span key={word}><List expansions={[word, word]} tag={word} />{' '}</span>
    return <span key={word}>{word}{' '}</span>
  })
  return ret
}

const rand = (items) => {
  return items[randFromLen(items)]
}
const randFromLen = (items) => (
  Math.floor(Math.random() * items.length)
)

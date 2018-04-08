// test/global.js
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import jsdom from 'jsdom'

const { JSDOM } = jsdom

global.dom = new JSDOM('<!doctype html><html><body><div id="article"></div></body></html>', { runScripts: 'dangerously' })
global.window = global.dom.window
global.document = window.document
global.navigator = window.navigator

// Configure enzyme
configure({ adapter: new Adapter() })

// Cause propTypes warnings
const propTypeWarningMatch = sinon.match((warning) => typeof (warning) === 'string' &&
      warning.indexOf('Warning: Failed prop type:') > -1)

sinon.stub(console, 'error')

console.error.withArgs(propTypeWarningMatch).callsFake((warning) => {
  throw new ReferenceError(warning)
})

console.error.callThrough()

// test/global.js
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

import jsdom from 'jsdom'
const { JSDOM } = jsdom

global.dom = new JSDOM('')
global.window = global.dom.window
global.document = window.document
global.navigator = window.navigator


configure({ adapter: new Adapter() })

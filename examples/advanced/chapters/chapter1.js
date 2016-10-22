const React = require('react')
const ReactDOM = require('react-dom')
import { Map, List, FromInventory, RenderSection, NextChapter} from 'windrift'

export default ({currentSection, inventory}) => {

  const listOnCompleteColor = (item) => {
    document.getElementById('block1').style.backgroundColor = item
  }

  const sections = [
    <section>
      <h2>Advanced usage</h2>

      <h4>Changing the UI in response to a user selection</h4>
      <p>
        Suppose you want to change the user experience in some way in
        response to a user's selection, like by picking a favorite color:
      </p>
      <div className="block-container">
        <small>Block 1</small>
        <div className="block" style={{backgroundColor: inventory.t1 || 'white'}}></div>
        <p>
          Pick a color: <List expansions={[["chartreuse", "violet"], "_last"]} tag="t1" conjunction="or" />
        </p>
      </div>

      <h5>Method 1: Use declarative values only <span className="success label">Recommended</span></h5>


      <p>
        Whenever feasible, just use the
        <code>inventory</code> directly in your Chapter markup, following React's
        constraints around HTML and CSS grammar:
      </p>

      <h5>Element source</h5>
      <pre>{`<div className="block" style={{backgroundColor: inventory.t1 || 'white'}}></div>
      `}</pre>

      <h5>List code</h5>
      <pre>{`<List expansions={[["chartreuse", "violet"], "_last"]}
      tag="t1" conjunction="or" />

`}</pre>

      <p>
        Make sure you provide a default value (here "white"). Before the user
        has made a selection, the inventory value will return undefined, and that
        value may be invalid for some properties (like size-based ones).
      </p>
      <p>
        <b>TL;DR: this is the preferred method.</b> The next two methods are ones
        you might consider as you get further into Windrift, but have significant
        drawbacks.
      </p>
      <hr/>
      <h5>Method 2: UI changes via lifecycle callbacks <span className="warning label">Caution</span></h5>
      <p>
        The Windrift Map and List components accept a number of callbacks that fire
        lifecycle events:
      </p>
      <ul>
        <li><code>List</code> and <code>Map</code> both accept an <code>onLoad</code>
          function, which fires <em>exactly once</em>—when the Chapter containing
          the component is mounted. It will not re-fire when the user moves forward or
          back through history.
        </li>
        <li><code>List</code> accepts an <code>onComplete</code> function, which fires
        any time the List is exhausted (including when the user hits "back" and re-selects
        the last expansion). The onComplete function receives the last selection for that
        List as its first argument.</li>
        <li><code>Map</code> accepts an <code>onChange</code> function, which
        fires any time the Map has received new props (typically meaning the related
        inventory value has been updated).</li>
      </ul>

      <h5>Callback</h5>
      <pre>{`const listOnCompleteColor = (item) => {
    document.getElementById('block1').style.backgroundColor = item
}
      `}</pre>

      <h5>List code</h5>
      <pre>{`<List expansions={[["cyan", "goldenrod"], "_last"]}
      onComplete={listOnCompleteColor}
      conjunction="or" tag="t2" />
      `}</pre>
      <div className="block-container">

        <small>Block 2</small>
        <div className="block" id="block1"></div>

        <p>
          <List expansions={[["cyan", "goldenrod"], "_last"]} tag="t2" conjunction="or" onComplete={listOnCompleteColor} />
        </p>
      </div>
      <p>
        Note that if you now use the browser "back" button, Windrift will undo the List expansion,
        but the color will remain the same—the system has no awareness of what your callback
        did. <b>For this reason, it is not advised to enable both state-modifying callbacks and
        undo.</b>
      </p>

      <hr/>
      <h5>Method 3: UI changes via Map values <span className="warning label">Caution</span></h5>

      <p>
        Maps can accept a wildcard key <code>_any</code> that will match any defined inventory
        value, and they can also return a function rather than a string or HTML node.
        By combining these two properties, you can implement a kind of primitive event
        handler yourself. But it's not suitable for all use cases:
      </p>

      <h5>Element source</h5>
      <pre>{`<div className="block" id="block3"></div>
      `}</pre>

      <h5>List and Map code</h5>
      <pre>{`<List expansions={[["coral", "yellowgreen"], "_last"]} tag="t3" conjunction="or" />

<Map from={inventory.t3} to={{
  '_undefined': () => {
    setTimeout(() => {document.getElementById('block3').style.backgroundColor = 'white'}, 50)
    return null
  },
  '_any': () => {
    setTimeout(() => {document.getElementById('block3').style.backgroundColor = inventory.t3}, 50)
    return null
  }
}} />`}</pre>

      <div className="block-container">
        <small>Block 3</small>
        <div className="block" id="block3"></div>
        <p>
          <List expansions={[["coral", "yellowgreen"], "_last"]} tag="t3" conjunction="or" />
          <Map from={inventory.t3} to={{
            '_undefined': () => {
              setTimeout(() => {document.getElementById('block3').style.backgroundColor = 'white'}, 50)
              return null
            },
            '_any': () => {
              setTimeout(() => {document.getElementById('block3').style.backgroundColor = inventory.t3}, 50)
              return null
            }
          }} />
        </p>
      </div>

      <p>
        That looks gross, of course. But it‘s useful to understand <i>why</i> the code
        is so ugly:
      </p>
      <ul>
        <li>You need to define both <code>_undefined</code> and <code>_any</code>{' '}
      keys, so that the Map will properly "undo" itself when the reader uses the
      back button.</li>
      <li>Your Map function needs to explicitly return <code>null</code>, because
      it's evaluated as the Map's <code>render()</code> function. Returning nothing
      (undefined) will cause React to complain.</li>

      <li><p>A Map's <code>to</code> values are evaluated during the component's <code>render()</code>
        method, which imposes a number of constraints: you can't modify any state (so no
        dispatching any actions that modify the global store), and <b>you aren't guaranteed
        that any other elements in the DOM are available yet</b>. If you run the code
        without the timer, you'll probably get a runtime exception that <code>#block3</code>
        doesn't exist. This seems counter-intuitive when the div is defined before the Map,
        but React renders elements in its own sweet time. There are two solutions for this:
        </p>
        <ul>
          <li>Blindly set a timer, as in this example. Your transition may be visibly
          delayed, and on slow browsers or long chapters it may fire before the DOM is actually done.
          </li>
          <li>Use a library like <a href="https://github.com/uzairfarooq/arrive">arrive.js</a>,
            which will listen for the availability of an element by selector (<a href="https://github.com/uzairfarooq/arrive/issues/42">instructions for integrating with webpack</a>).</li>
        </ul>
      </li>
      </ul>
      <p>
        TL;DR if you're going to do extensive modifications of the DOM
        in your story that can't be accomplished via CSS properties, it's better
        to write custom UI components that listen directly
        to <code>inventory</code> or even to your own custom actions. There's an
        example in the <a href="https://github.com/lizadaly/stone-harbor-game/blob/master/src/chapters/chapter5.js#L202">Stone Harbor</a> repo.
      </p>
    </section>
    ]
   return <RenderSection currentSection={currentSection} sections={sections} />
}

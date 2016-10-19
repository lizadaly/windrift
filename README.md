# Windrift

A framework for writing mutable narratives.

Windrift was used to write [Stone Harbor](https://stoneharborgame.com/), an entry in the 2016 [Interactive Fiction Competition](https://ifcomp.org). It relies heavily on the React/Redux JavaScript frameworks.

You don't need to know anything about React/Redux to understand Windrift's design principles, but you probably need JavaScript experience to be able to effectively write a Windrift story.

## Works

Windrift is designed to produce narratives that are informed by user selection and choice, similar to systems like Twine. In fact, a Windrift story may appear, in its final form, almost indistinguishable from a work authored in Twine.

As an authoring environment, though, it has different goals:

* Twine is optimized for writing _branching_ stories. Windrift is better suited for _mutable_ stories.
* An explicit design goal of Windrift was that a story could be readable from start-to-finish as if no user interaction had occurred. You don't have to author your story this way, but Windrift makes that possible.
* Twine is meant to be approachable to non-programmers. Windrift is a JavaScript framework on top of other JavaScript frameworks. I hope you like JavaScript.
* Windrift stories are easy to unit test, snapshot, and make use of the excellent set of developer tools available for React/Redux out of the box.
* Out of the box, the Windrift UI has been thoroughly tested in all major desktop and mobile browsers and is fully accessible to screenreaders.



## Design

A Windrift story has two conceptual layers:

* The current world model, or <i>state</i>. This is the record of all the choices the user has made in the game, and their current point in the story.

* The <i>rendering</i> of that state, which is the text displayed by the engine at that point in time.

Nothing is tracked "in memory": the state acts as a ledger of events, and the rendering reflects that ledger in the narrative that you write.

The world model is implemented as an <i>immutable</i> object. Each time the user makes a change to the state (as by selecting some text), the old state is discarded and a new one takes it place. It's up to you, the author, whether you keep a record of that change in the state (and thus, the rendering reflects that a change occurred) or leave it out of the new state, as if it never existed.


It is impossible for the rendering to go out of sync with that state. While a typical story is read linearly, moving forward in time, it would be possible (in fact, quite easy) to make a Windrift story that appeared to write over itself, undo itself, or modified itself entirely in response to user selections.

Windrift persists each state snapshot to the user's browser, enabling undo (through the browser back button) and resume (even if the user has navigated away).

## Architecture and components

A Windrift story is composed of a series of <b>chapters</b> contained in individual files. Each chapter is made up of <b>sections</b> that are revealed in response to a user interaction.

(The section/chapter division is primarily for the author's benefit. You could write an entire novel's worth of text in a single chapter if you like.)

### Lists
The primary mode of interaction with a Windrift story is via Lists.

A List is an array of choices—called *expansions*—that are presented sequentially. Each item in a List is rendered as a clickable link. Lists are identified by a unique label—called a *tag*—that the author assigns.

#### Flat List
A flat list is an array of individual strings. As the user clicks on each list item, the next will be revealed,  replacing the previous. You might use this device to have a character appear to stammer or talk over themselves:

Given this List: `['awkward', 'interesting', 'wonderful']`

...the rendering will display this text, in sequence, with each choice replacing the previous as the user clicks on the hyperlinks:

1. "Uh, yeah, it's really _awkward_ to see you"
2. "Uh, yeah, it's really _interesting_ to see you"
3. "Uh, yeah, it's really wonderful to see you"

The last item in any List is not a hyperlink, and that text remains after the list sequence is completed.

#### Choice List
It's more common for a List to be composed of a mix of strings and arrays. Each expansion is rendered sequentially, but when an expansion is itself an array, Windrift will present all items at once, giving the player the ability to pick a choice:

Given a List tagged as `dinner_choice`:

`['the usual', ['mutton pudding', 'salad cake', 'pine nut loaf']]`

The rendering will produce, in sequence:

1. "What do you want for dinner? We got _the usual_."
2. "What do you want for dinner? We got _mutton pudding_, _salad cake_, or _pine nut loaf_."

If the player choose the second item:

3. "What do you want for dinner? We got salad cake."

#### List completion

When the player has selected the final item in a list, two events are triggered:

1. The choice is added to the player's _inventory_
2. The next section or chapter is revealed

### Inventory

When a final choice is made in a list, it goes into the reader's `inventory`, the part of the state containing all the selections they've made. The inventory is made up of buckets each named with a List `tag`, and is accessible as `inventory.tagname` at any point in the story.

### Maps

Maps are the primary way to implement conditionals: "If the player chose <i>mutton pudding</i>, show them this text about how it was dry and tasteless."

Maps take a string `from`, to be evaluated, and an Object `to`, which is the map (or dictionary) of expected values and the text to return in response.

```
from: 'inventory.dinner_choice'
to: {
  'mutton pudding': 'It was dry and tasteless',
  'salad cake': 'Just like mom used to make!',
  'pine nut loaf': 'You call this a loaf?'
}
```    

Any string can be passed to a Map, but typically you'll pass in a specific inventory value, as above.

The combination of Lists and Maps can unlock a surprising amount of interactivity.

### Other components

Windrift offer a few other components for rendering text that you'll probably use less often:

**AllButSelection** takes an array and a string, and returns all items but that string. It's used to produce renderings like this:

1. "What do you want for dinner? We got _mutton pudding_, _salad cake_, or _pine nut loaf_."
2. "What do you want for dinner? We got pine nut loaf. Actually, good choice, since it turns out we're all out of mutton pudding and salad cake."

**ManyMap** is similar to *Map* but takes an array `from` rather than a single value. It will return all matching values in the `to` object for any item in the `from` array. This is useful when you want to display text based on _multiple_ choices the user has made across different Lists.

## Writing in Windrift

From here on out, some familiarity with React/Redux is assumed.

### The store

Windrift uses the Redux global store to manage the game state and tracks four values:

* **Bookmarks**
   This data structure tracks where the user is in the story as the current chapter and current section. It's initialized as chapter 0, section 0 and increments each time the `showNextSection` and `showNextChapter` action creators are called.

* **Inventory**
  An Object of key/value pairs, where the key is a given List `tag`, and the value is the most-recent selection from that List.

* **Expansions**
  An Object of key/value pairs, where the key is a given List `tag` and the value is an Object containing the array of possible expansions for this List, and an index value into that array as `currentExpansion`, reflecting how far the user has progressed in clicking through the expansions.

* **Counter**
  A simple integer value that increments at each step through the story. This is used exclusively to manage persisting the game state to the web browser so that resume and back/forward through browser history work properly.

### Story lifecycle

Windrift initializes all the chapters that are available in the story by collecting all files in `chapters/*.js`. Files can be named how you like, as long as they can be evaluated in alphabetical order (e.g. `1.js` or `chapter1.js`)

Each chapter is a React component with a lightweight signature:

1. A Chapter should be a _stateless functional component_
2. A Chapter is required to return a `<RenderSection>`

The `<RenderSection>` component must pass two props:

1. `currentSection`, which just passes along the Chapter's own `currentSection` prop
2. `sections`, returning an array of React nodes, typically HTML `<section>` elements

### Example: A minimal Chapter
```jsx
const React = require('react')

export default ({currentSection, inventory}) => {
  var sections = [
    <section>
      <h2>Cloak of Darkness</h2>
      <p>You are standing in a spacious hall, splendidly decorated in red and gold, with glittering chandeliers overhead. The entrance from the street is to the north, and there are doorways south and west.</p>
    </section>
  ]
  return <RenderSection currentSection={currentSection} sections={sections} />
}
```

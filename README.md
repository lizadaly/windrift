# Windrift

A framework for writing mutable narratives.

Windrift was used to write [Stone Harbor](https://stoneharborgame.com/), an entry in the 2016 [Interactive Fiction Competition](https://ifcomp.org). It relies heavily on the React/Redux JavaScript frameworks.

You don't need to know anything about React/Redux to understand Windrift's design principles, but you probably need JavaScript experience to be able to effectively write a Windrift story.

## Project structure

This repository contains the Windrift core library. You may be interested in quickly browsing some of
the example stories:

* [Windrift starter](https://lizadaly.github.io/windrift/examples/starter/), the demo story supplied with the
[starter project](https://github.com/lizadaly/windrift-starter). [[source code](https://github.com/lizadaly/windrift-starter/blob/master/chapters/chapter1.js)]
* [Cloak of Darkness](https://lizadaly.github.io/windrift/examples/cloak-of-darkness/), the canonical "sample game" for interactive  fiction systems. [[source code](https://github.com/lizadaly/windrift/tree/master/examples/cloak-of-darkness)]
* [Stone Harbor excerpt](https://lizadaly.github.io/windrift/examples/stone-harbor-excerpt), the Prologue from Stone Harbor,
updated to work with the latest Windrift. [[source code](https://github.com/lizadaly/windrift/tree/master/examples/stone-harbor-excerpt)]
* [Advanced usage](https://lizadaly.github.io/windrift/examples/advanced/), changing the UI in response to reader choices. [[source code](https://github.com/lizadaly/windrift/tree/master/examples/advanced)]

### Starter project

*If you are interested in writing a narrative with Windrift, [use this repository](https://github.com/lizadaly/windrift-starter).*

The [starter project](https://github.com/lizadaly/windrift-starter) contains all of the machinery necessary to create a Windrift web application, including a development web server and deployment instructions.

## Works

Windrift is designed to produce narratives that are informed by user selection and choice, similar to systems like Twine. A Windrift story may appear, in its final form, almost indistinguishable from a work authored in Twine.

As an authoring environment, though, it has different goals:

* Twine is optimized for writing _branching_ stories. Windrift is better suited for _mutable_ stories.
* An explicit design goal of Windrift was that a story could be readable from start-to-finish as if no user interaction had occurred. You don't have to author your story this way, but Windrift makes that possible.
* Twine is meant to be approachable to non-programmers. Windrift is a JavaScript framework on top of other JavaScript frameworks. I hope you like JavaScript.
* Windrift stories are easy to unit test, snapshot, and make use of the excellent set of developer tools available for React/Redux out of the box. Everything about Windrift's design is meant to be consistent with current best practices in web development.
* The Windrift UI has been thoroughly tested in all major desktop and mobile browsers and is fully accessible to screenreaders.

## Design

### Redux principles

Windrift was made to leverage the React/Redux frameworks, which I think have interesting properties that can apply to narrative-driven games.

Redux manages an application's state through a series of _actions_, or assertions about _events that occurred_. Instead of calling functions like, "Change the `counter` variable from _X_ to _X+1_," a Redux application instead creates a message: "The _counter_ was incremented."

These messages are funneled through functions called _reducers_, which take the message, any data that goes along with it, the previous snapshot of the world, and return a new value in response to the message. In the counter example, a reducer would look at the previous version of the counter, add one to it, and return the new value.

Finally, event listeners are assigned to any UI components that might need to know about these changes—for example, in a application where a turn counter was visible in the status bar, a `Counter` component could be written that updates itself every time the counter value changes.

The above is all vanilla React/Redux and is used to write thousands of web applications. I was interested in how this message/event model could apply to narrative games, by reducing them to a series of messages about things that happened, and components that return updated text in response to those changes.

### The Inventory

The core Windrift library provides one global bucket for these messages, called the _inventory_, after the traditional interactive fiction word for "Stuff the player is carrying." (In practice, the _inventory_ is more likely to be a record of the series of choices a user made, rather than a list of objects in their possession.)

The inventory can be thought of as a catch-all for messages of the type, "The user picked choice B out of A, B, C." Without the inventory, a Windrift author would have to write an _action_, a _reducer_ and a _listener_ for every choice presented in the game. Because most choices in a narrative game are ephemeral, it makes sense to provide a single action/reducer/store for these kinds of interactions. More complex transformations are possible by writing custom actions and reducers.

With the exception of the tarot deck, _Stone Harbor_ only uses the inventory for its interactions and responses. A Windrift story that uses just the core components could almost certainly be implemented just as well in Twine or other systems. Using Redux principles _does_ enable more complex stories to be written that would be difficult or error-prone if implemented in more traditional hypertext systems.

### The timeline

Windrift has an implicit sense of time. It provides a global `counter` that increments on each user choice or interaction. At each user interaction, a few events happen in the background:

* The users' choice is persisted to the Redux `store` (as part of the `inventory`)
* The current global counter value is pushed to the user's browser history.
* The entire world model (the Redux `store`) is saved off in an array called `past`. See the section below on the Redux store for more details on the past/future.

Authors can decide whether a particular user action should trigger one of three timeline-based actions:

* Advance to the next section
* Advance to the next chapter
* Do nothing

### Story structure

A Windrift story is composed of a series of <b>chapters</b> contained in individual files. Each chapter is made up of <b>sections</b> that are revealed in response to a user interaction.

The section/chapter division is primarily for the author's benefit. You could write an entire novel's worth of text in a single chapter if you like. You don't have to call them "chapers" or express the division to the reader if you don't want.

Chapters and sections are currently modeled as arrays: it's easy to move forward or back with relative offsets, but not particularly easy to index into arbitrarily. An obvious area for future development would be a structural model that more easily permitted jumping to named chapters/sections.

### Lists
The primary mode of interaction with a Windrift story is via Lists.

A List is an array of choices—called *expansions*—that are presented sequentially. Each item in a List is rendered as a clickable link. Lists are identified by a unique label—called a *tag*—that the author assigns. This tag becomes the reference to the choice in the inventory.

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

When a final choice is made in a list, it goes into the reader's `inventory`, the part of the state containing all the selections they've made. The inventory is made up of buckets indexed by List `tag`. The value in each bucket is accessible as `inventory.tagname` at any point in the story.

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

Maps can return a variety of types:

* Plain text (this is most common)
* HTML, of arbitrary complexity
* A function, which executes arbitrary code

The combination of Lists and Maps can unlock a surprising amount of interactivity:

* A List can take, as its `expansions` argument, a function rather than a handwritten array.
* A Map can return a List, or other Maps.
* Both Lists and Maps can accept various callbacks to execute arbitrary code during their lifecycles.

See the [Advanced demo](https://lizadaly.github.io/windrift/examples/advanced/) for some ways to
use Lists and Maps to create rich experiences.

### Other components

**AllButSelection** takes an array and a string, and returns all items but that string. It's used to produce renderings like this:

1. "What do you want for dinner? We got _mutton pudding_, _salad cake_, or _pine nut loaf_."
2. "What do you want for dinner? We got pine nut loaf. Actually, good choice, since it turns out we're all out of mutton pudding and salad cake."

**ManyMap** is similar to *Map* but takes an array `from` rather than a single value. It will return all matching values in the `to` object for any item in the `from` array. This is useful when you want to display text based on _multiple_ choices the user has made across different Lists.

**FromInventory** returns an item from the inventory with some transformations applied to it. By default, it returns the last word of a multiword string, to enable you to write:

```
You select the _purple spangled basset hound_ as your spirit animal.
The _basset hound_ squirms in your grasp.
```

`FromInventory` takes a string (usually an inventory item) and returns the string offset by the value of the `offset` parameter (usually -1, for the last word, but here it would be -2.) It takes an optional `onLoad` callback which will pass the inventory string through an arbitrary transformation—for example, you might use this to upcase a term.

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

Windrift initializes all the chapters that are available in the story by collecting all files in `chapters/*.js`. Files can be named how you like, as long as they can be evaluated in alphabetical order (e.g. `1.js` or `chapter1.js`—if you think you'll have more 9 chapters, be sure to zero-pad the filenames.)

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
      <h2>West of House</h2>
      <p>You are standing just off to the side of the famously cantankerous fictional doctor.</p>
    </section>
  ]
  return <RenderSection currentSection={currentSection} sections={sections} />
}
```

Plenty more examples and next steps for getting started with Windrift are available in the [starter project](https://github.com/lizadaly/windrift-starter).

### The Redux store and history

Under the hood, Windrift uses [redux-undo](https://github.com/omnidan/redux-undo) to record a ledger of every interaction at every point in time. Each time the user advances through the story, the entire state is copied into the `past`, an array of snapshots starting from time 0.

When a reader plays for 15 turns and hits the browser back button, an event is fired that pulls the history at time step -1. The entire game state is reconstituted at time stamp 14, and the old timestep 15 is now in the `future`. If the reader then hits the browser forward button, the entire state snapshot is pulled from the future and reconstituted as the present.

In turn, the whole past/present/future store is saved via [redux-persist](https://github.com/rt2zz/redux-persist) to the browser's `localStorage` object. If the reader refreshes the browser or returns to the story after a period of time, the entire store is reconstituted from `localStorage`.

The Windrift base components only know about the `present`; they do not have any direct access to the past or the future versions of the store. It is possible to imagine a story that made use of this additional data to implement more sophisticated state changes, but that's for a future enhancement.

## A note about Stone Harbor

You're welcome to browse the [Stone Harbor source](https://github.com/lizadaly/stone-harbor-game) as a Windrift
reference, but Windrift has moved on since the story was written and the two are not entirely compatible.
Of interest might be the [tarot deck implementation](https://github.com/lizadaly/stone-harbor-game/blob/master/src/chapters/chapter5.js#L202), which uses
a custom component with custom actions and reducers.

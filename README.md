# Windrift

A React/Redux interactive narrative framework.

Windrift was used to write [Stone Harbor](https://stoneharborgame.com/), an entry in the 2016 [Interactive Fiction Competition](https://ifcomp.org).

The best way to see Windrift in action is to play the demo game and instructions. For static presentation, I'll use the convention of numbered lines to indicate state changes.

## Fundamentals

Typically, a Windrift story will be composed of a series of <b>chapters</b>, or discrete units of text that you'd like to treat as a unit. Each chapter is made up of <b>sections</b> that are revealed in response to a user interaction.

(The section/chapter division is primarily for the author's benefit. You could write an entire novel's worth of text in a single chapter if you like.)

### Lists
Clickable text is presented in the form of a `List` component. A List is an array of choices—called *expansions*—for a user to click on, presented sequentially. Lists are labelled with a *tag*, which needs to be unique throughout the entire game.

#### Flat List
A simple flat list will display each item one at a time, replacing the previous. This is a good way to have a character stutter something, or talk over themselves:

Given this List: `['awkward', 'interesting', 'wonderful']`...

...the reader will be presented with this text in succession:

1. "Uh, yeah, it's really <u>awkward</u> to see you"
2. "Uh, yeah, it's really <u>interesting</u> to see you"
3. "Uh, yeah, it's really <u>wonderful</u> to see you"

#### Choice List
It's more common for a List to be composed of an _array of arrays_, which effectively gives the player the ability to choose one of many items:

List: `['the usual', ['mutton pudding', 'salad cake', 'pine nut loaf']]`

1. "What do you want for dinner? We got <u>the usual</u>."
2. "What do you want for dinner? We got <u>mutton pudding</u>, <u>salad cake</u>, or <u>pine nut loaf</u>."

If the player choose the first item:

3. "What do you want for dinner? We got <u>salad cake</u>."

#### List completion

When the player has selected the final item in a list, two events are triggered:

1. The choice is added to the player's _inventory_
2. The next section or chapter is revealed

### Inventory

When a final choice is made in a list, it goes into the reader's `inventory`, a global bucket of all the choices they've made. The choice they made for a list is saved in that list's `tag`, and is accessible as `inventory.tagname` at any point in the story.

(Since `tagname` must be unique across the whole story, I prepend my tags with the chapter number, like `c1_book`.)

### Maps

Maps are the primary mechanism for conditionals: "If the reader chose <i>mutton pudding</i>, show them this text about how it was dry and tasteless."

Maps take a string `from`, to be evaluated, and an Object `to`, which is the map (or dictionary) of expected values and the text to return in response.

```
from: 'inventory.c2_dinner_choice'
to: {
  'mutton pudding': 'It was dry and tasteless',
  'salad cake': 'Just like mom used to make!',
  'pine nut loaf': 'You call this a loaf?'
}
```     
Any string can be passed to a Map, but typically you'll pass in a specific inventory value.

The combination of Lists and Maps is powerful enough to unlock a surprising amount of interactivity. Maps will return nothing if there's no match for the value in `from` with a key in `to`, which makes them safe to embed in text even before the user has made a selection. Passing the special key `undefined` allows you to set a default Map, so you can have text _change_ in response to a List selection, not just appear:



## Writing in Windrift


Each chapter is a React component with a lightweight signature:

1. A Chapter should be a _stateless functional component_
2. A Chapter is required to return a `<RenderSection>`

The `<RenderSection>` component must pass two props:

1. `currentSection`, which just passes along the Chapter's own `currentSection` prop
2. `sections`, returning an array of React nodes, typically HTML `<section>` elements

### Example: A minimal Chapter
```javascript
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

It's possible to write stateful components, but I recommend that any custom state be managed as Redux actions.

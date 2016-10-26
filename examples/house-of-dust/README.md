# The House of Dust

View online: <a href="https://lizadaly.github.io/windrift/examples/house-of-dust/">The House of Dust</a>

This is an adaptation of <a href="http://www.centerforthehumanities.org/james-gallery/exhibitions/house-of-dust">_The House of Dust_</a> (1967), an early computer-generated poem
by Alison Knowles and James Tenney.

This example illustrates using <a href="https://github.com/lizadaly/windrift">Windrift</a> to
generate new section content dynamically, rather than
by authoring section items directly.

Random words in each stanza are hyperlinked. When the user selects a word, a new stanza is generated. Each word can only be selected once. When all the words of the poem have been selected, the poem is "complete."

## Technical details

### The Chapter

The code for the actual game text is a very brief Windrift Chapter:

```jsx
var sections = []

export default ({currentSection, inventory}) => {

  sections.push([<Stanza key={currentSection} />])

  return <RenderSection currentSection={currentSection} sections={sections} />
}
```

The Stanza component returns a complete iteration of the poem assembled from its components.

```jsx
const Stanza = () => {
  var line = <div className="stanza">
    <p>{ wrap(rand(materials)) }</p>
    <p>{ wrap(rand(locations)) }</p>
    <p>{ wrap(rand(lighting)) }</p>
    <p>{ wrap(rand(inhabited)) }</p>
  </div>
  return line
}
```

For each line of the poem, one word is chosen randomly to be a hyperlink. This is rendered as a Windrift List:

```jsx
<List expansions={[word, word]} tag={word} />
```

### The story loop

* For each randomly assembled line, pick one word and create a `List` object rather than a text node.
* Assign the `tag` for that `List` to be the word, example, "dust." "Dust" is now hyperlinked.
* When a hyperlink is clicked, apply the default Windrift `List` behavior:
  * Set the value of the List's `tag` to the value selected by the user: `inventory.dust = "dust"`
  * Increment the current section counter
* Per default Windrift behavior, when the current section counter is incremented, the chapter is re-rendered.
* When the chapter is re-rendered, a new Stanza is added.
* Any occurrences of the selected word are marked by Windrift as clicked, because they share the same inventory value: `inventory.dust`. All current and future re-occurrences of "dust" will no longer be hyperlinked.

#### Implementation detail

Note that refreshing the page doesn't produce the same poem—this is because the `stanzas` array is stored in-memory rather than propagated to the Redux store. If this were a real work rather than a demo, you'd want to create a "Stanza was added" action to store the generated poem and provide some stability.

## References

* <a href="http://zachwhalen.net/pg/dust/">A JS adaption in the original visual style</a> by Zach Whalen
* <a href="http://nickm.com/memslam/a_house_of_dust.html">Another modern adaptation</a> by Nick Montfort

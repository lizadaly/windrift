# Cloak of Darkness example game in Windrift

[Playable demo](https://lizadaly.github.io/windrift/examples/cloak-of-darkness/)

This is an implementation of the canonical [Cloak of Darkness](http://www.firthworks.com/roger/cloak/) game
in Windrift. It's a pretty good way to get a sense of what Windrift is good and not-so-good at.

## The Cloak specification in hypertext

The "spec" is meant for parser games, so some of what it's trying to do isn't applicable to
a hypertext engine like Windrift. A few other people have gamely tried to adapt Cloak to
hypertext games; the most successful one I've seen is [Iain Merrick's Twine 1.4 adaptation](http://www.philome.la/iainmerrick/cloak-of-darkness/play). I'll use Iain's implementation as a baseline for comparison against Windrift. Please see his [thoughtful writeup](http://xyzzyawards.org/?p=293) on how he approached the problem.

## The good

* Windrift gives you full control over the browser, so you can make interesting visual layouts, including arbitrary font selection and CSS. This Cloak of Darkness should look pretty good on a mobile device as well as in a normal browser.

## The bad
* Much like [Iain's Twine version](http://www.philome.la/iainmerrick/cloak-of-darkness/play), translating this to hypertext is a little clunky. It's hard to reasonably implement a concept like "do anything but go north again", though arguably that's not the fault of a hypertext system—hypertext systems almost by definition present the reader with _choices_, not open-ended worlds to explore.

## The ugly
* Iain's version allows the reader to go back to any room as often as they want, making the narrative feel more branch-y. This was explicitly _not_ a design goal of Windrift: I wanted a system biased towards telling a linear narrative that could be nudged, not fully redirected. But Windrift is still a bit more restrictive than I'd like it to be in terms of allowing for looping narratives.
* Windrift only has one bucket for player choices—the inventory. Adding more explicit state variables ("user did ruin the end game message") would be more in keeping with how traditional IF is authored, and could be better for a range of stories that weren't necessarily parser-derived. An author could do this with custom components, but it could be easier.

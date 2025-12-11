# Windrift

A JavaScript framework for writing mutable narratives

![Integration tests](https://github.com/lizadaly/windrift/actions/workflows/playwright.yml/badge.svg)

Windrift has been used to author interactive hypertext stories including the award-winning [Harmonia](https://lizadaly.com/pages/harmonia/) in 2017, [Stone
Harbor](https://stoneharborgame.com/) in 2016, and [The Ballroom](https://lizadaly.com/projects/the-ballroom/) in 2019, all by Liza Daly. It was
also used by Enrique Henestroza Anguiano to write <a
href="http://springthing.net/2018/play_online/TheImposter/index.html">The
Imposter</a> (2018) and José Carlos Dias to produce the [Portuguese translation of Stone Harbor](https://stoneharborgame.com/pt/) in 2021.

## Documentation

The [official manual](https://windrift.app/manual) is continuously published as features are added and is itself a Windrift story. The manual is the best way to quickly get an overview of Windrift. Corrections and requests for coverage are gratefully accepted.

## Example stories

Stories demonstrating use of Windrift from the basic to the advanced are available as part of the [official manual](https://windrift.app/manual), as well as in the [Windrift Playground](https://playground.windrift.app/). Source code is available for all example stories.

## Quick start

### Dependencies

To ensure you're using a fully-compatible version of Node, use [Node Version Manager](https://github.com/nvm-sh/nvm). Follow its installation process for your platform and then run:

```
nvm install 22
nvm use 22
```

Then to install Windrift:

```
npm install
```

### To start a new story

```
npm run new <story-id>
```

The story identifier must be a single string, like "west-of-house" or "colossal-cave." See the [manual](https://windrift.app/manual) for details.

### To run the local development environment

```
npm run dev
```

Other commands, including deployment options, are described in the <a href="https://windrift.app/manual">Windrift manual</a>.

## About Windrift

Windrift is based on [NextJS](https://nextjs.org/) and written in [TypeScript](https://www.typescriptlang.org/).

Windrift is a single NextJS application capable of hosting multiple stories. Authors can take advantage of any affordances offered by NextJS, including the free deployment options via [Vercel](https://vercel.com).

Because the core Windrift code is bundled with each story repository, authors can fully modify or alter any fundamental behavior of the library.

## Contributor acknowledgment

* 6notes: Playwright test suite conversion

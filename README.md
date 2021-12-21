# Windrift

A JavaScript framework for writing mutable narratives, in major version 2.

![Integration tests](https://github.com/lizadaly/windrift/actions/workflows/cypress.yml/badge.svg)

⚠️ **Version 2:** This branch is nearing a production release and is expected to be complete at the end of 2021. You could use it today to start a new Windrift story or migrate an earlier one.

Windrift has been used to author interactive hypertext stories including the award-winning [Harmonia](https://lizadaly.com/pages/harmonia/) in 2017, [Stone
Harbor](https://stoneharborgame.com/) in 2016, and [The Ballroom](https://lizadaly.com/projects/the-ballroom/) in 2019, all by Liza Daly. It was
also used by Enrique Henestroza Anguiano to write <a
href="http://springthing.net/2018/play_online/TheImposter/index.html">The
Imposter</a> (2018) and José Carlos Dias to produce the [Portuguese translation of Stone Harbor](https://stoneharborgame.com/pt/) in 2021.

## Documentation

The [official manual](https://windrift.app/manual) is continuously published as features are added and is itself a Windrift story. The manual is the best way to quickly get an overview of Windrift v2. Corrections and requests for coverage are gratefully accepted.

## Example stories

Stories demonstrating use of Windrift 2 from the basic to the advanced are available as part of the [official manual](https://windrift.app/manual) , as well as in the [Windrift Playground](https://playground.windrift.app/). Source code is available for alll example stories.

## Quick start

### Dependencies

Windrift comes ready to deploy using Vercel, which requires a maximum Node version of 14. To ensure you're using a fully-compatible version of Node, use [Node Version Manager](https://github.com/nvm-sh/nvm). Follow its installation process for your platform and then run:

```
nvm install 14
nvm use 14
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

## About version 2

This is a complete rewrite of Windrift, now based on [NextJS](https://nextjs.org/) and written in [TypeScript](https://www.typescriptlang.org/).

Windrift no longer separates the core library from the web framework, which was previously available as the `windrift-starter` repo. Keeping windrift-starter and windrift core separate made for a confusing installation and update process, and neither was useful without the other.

Windrift 2 unifies them into a single NextJS application, capable of hosting multiple stories. Authors can take advantage of any affordances offered by NextJS, including the free deployment options via [Vercel](https://vercel.com).

Because the core Windrift code is bundled with each story repository, authors can fully modify or alter any fundamental behavior of the library.

The [v1 branch](https://github.com/lizadaly/windrift/tree/v1) is no longer receiving updates.

# Windrift v2

![Integration tests](https://github.com/lizadaly/windrift/actions/workflows/cypress.yml/badge.svg)

⚠️ This branch is in progress and not ready for use by authors. It's expected to be ready before the end of 2021. If you're keen on using Windrift right now, please use the v1 branch.

# Windrift

This is a complete rewrite of Windrift, now based on
<a href="https://nextjs.org/">NextJS</a> and written in TypeScript.

Windrift no longer separates the core library from the web framework, which
was previously available as the <a href="https://github.com/lizadaly/windrift-starter/">windrift-starter</a> repo. Keeping `windrift-starter` and `windrift` core
separate made for a confusing installation and update process, and neither was useful
without the other.

Windrift 2 unifies them into a single NextJS application, capable of hosting
multiple stories. Authors can take advantage of any affordances
offered by NextJS, including the free deployment options via vercel.com.

Because the core Windrift code is bundled with each story repository,
authors can fully modify or alter any fundamental behavior of the
library. This removes the need for some of Windrift 1's cumbersome
callback features and rarely-used props. This stripped-down approach
means that many of Windrift 2's fundamental components are less than
half the length of their Windrift 1 counterparts.

## Online manual

If you're curious, the official manual is continuously published as features are added: https://windrift.app/demo. This is the best way to quickly get an overview of Windrift v2. Corrections and requests for coverage are gratefully accepted.

## Quick start

### Dependencies

Windrift comes ready to deploy using Vercel, which requires a maximum Node version of 14. To ensure you're using the correct version of Node, use [Node Version Manager](https://github.com/nvm-sh/nvm):

```
nvm install 14
nvm use 14
```

Then:

```
npm install
```

### To start a new story

```
npm run new <story-id>
```

The story identifier must be a single string, like "west-of-house" or "colossal-cave."

### To run the local development environment

```
npm run dev
```

Other help commands including deployment options as per the
<a href="https://nextjs.org/">NextJS</a> documentation.

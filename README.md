# Frank's site bootstrap (Nov 2020)

## What is this?

It took me way too long to cobble together all the bits and pieces I personally like/tolerate while bootstraping 
a web app.

This project compiles down to a 14KB `bundle.js` which is the smallest I've managed to get a basic, yet usable, boilerplate for a reactive app that doesn't require me to reinvent several wheels.

## How to use:

1. Copy this project.
2. Change the `name` value of package.json
3. run `npm install`
4. Use the commands from the scripts section of `package.json`
5. That's it! 

## What's included (high-level):

* All typescript, all the time.
* preact, with a basic router.
* jest-based testing
* Auto-format and auto-lint 
* Dev server
* Two production versions
* * Legacy, with wide support
* * Modern, small and fast, for modern browsers 
* Tuned Babel/typescript configs:
* * Tree Shaking works correctly
* * Everything works cleanly during build, dev and test
* * Tuned to absolutely minimize the resulting code size.

## What is this good for?

This is good for **very** simple web apps with client-side rendering. It's not meant to be used for projects with a ton of external dependencies, and assumes that there won't be any *clever* (ab)uses of the javascript engine present.

To be fair, you can simply remove most of the minimizer optimization flags from `webpack.config.js` if something is misbehaving, but unless the settings break a critical upstream dependency, I'd recommend trying to go along with what the optimizer likes to see.

The code minification settings are particularly aggressive, and may not be compatible with various libraries in the wild.

## FAQ:

*Why `import * as preact from 'preact'`, instead of `import {h} from 'preact'`?

> "How can you trust a man who wears both a belt and suspenders? The man can't even trust his own pants." - Frank (Henri Fonda)

If Tree Shaking can't handle this correctly, then it means the project is not configured correctly. Consider it a canary in a coal mine.

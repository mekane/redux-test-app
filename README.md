# Redux Test App

This code base is a sandbox to try out writing a reducer and app structure using the Redux library with React.

## Motivation

This is a useful exercise to me because I watched the Redux videos and wrote a few small apps using my own implementation of the Redux / Flux architecture. So I understand the concept quite well, but not how to use the actual Redux library or how to scale it up from the toy apps I made.

I used TDD to build the reducer, to make sure my state transitions are sensible. I consider that to be the foundation of good practice. I am also curious to see how I naturally break apart reducers and actions as an app grows, and compare that to other examples.

## Getting Started

At the moment all it needs is an `npm install`. There is no build tool set up yet, and the index.html uses an extrememly hacky workaround, which I did to avoid spending time setting up browserify for the 400th time. (I do intend to do that at some point though).

## Next Steps

Having read about the normalizr library, I want to modify the ADD_ITEM action to assign an id, add the id to the items array, and also maintain an 'itemsById' map.


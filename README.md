# fractional-index

A Javascript implementation of fractional indexes for sorting items, as described
originally in: https://observablehq.com/@dgreensp/implementing-fractional-indexing

Given two indexes the library will always return a fractional index at the midpoint
between the two. This is particularly useful for realtime collaboration and cases
where sending an entire set of ordered items back to the server is undesirable.

## Install

`npm install fractional-index`

or

`yarn add fractional-index`

## Usage

```javascript
import fractionalIndex from "fractional-index";

const index = fractionalIndex("a", "b");
```

For start and end of a list pass `null` as the argument, eg:

```javascript
import fractionalIndex from "fractional-index";

const index = fractionalIndex("a", null);
```

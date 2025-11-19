project: AIDD Demo – Counter

intent:
  Implement a tiny pure functional counter module.
  The module should be usable both in Node.js and in the browser.

constraints:

- language: JavaScript ES modules
- style: functional & pure
- do not mutate input objects
- no frameworks
- no database
- no side effects (no logging, no timers, no IO)
- use JSDoc for types where helpful

environment:

- Node.js 24+ (ES modules, node:test)
- Browser compatibility: do not rely on Node-only globals

types:
  type Counter:
    value: number

functions:
  function createCounter(initialValue: number = 0) -> Counter
    steps:
      - if initialValue is not a finite number, throw TypeError
      - return Counter with value = initialValue

  function increment(counter: Counter, amount: number = 1) -> Counter
    steps:
      - validate counter.value is a finite number
      - validate amount is a finite number
      - compute nextValue = counter.value + amount
      - return new Counter with value = nextValue

  function decrement(counter: Counter, amount: number = 1) -> Counter
    steps:
      - validate counter.value is a finite number
      - validate amount is a finite number
      - compute nextValue = counter.value - amount
      - return new Counter with value = nextValue

  function reset(counter: Counter) -> Counter
    steps:
      - validate counter.value is a finite number
      - return new Counter with value = 0

  function getValue(counter: Counter) -> number
    steps:
      - validate counter.value is a finite number
      - return counter.value

output:

- Target file: src/counter.js
- ES module syntax (export functions)
- No external dependencies
- JSDoc typedef for Counter and each function
- Every validation error should throw a TypeError with a clear message

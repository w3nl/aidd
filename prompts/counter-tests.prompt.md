project: AIDD Demo – Counter tests

intent:
  Implement tests for the counter module using Node's built-in test runner.

constraints:

- language: JavaScript ES modules
- test framework: node:test + assert
- keep tests focused and readable
- prefer small test cases over large scenarios
- do NOT nest `test()` inside another `test()`; generate flat, top-level tests
- group logically by prefixing names, e.g. "createCounter: ..."
- STRICT: Use the functional API. Do NOT call instance methods on the counter.
- ESLint: avoid unused variables; if something would be unused, either add an assertion that uses it or prefix with `_`.
- Immutability tests MUST assert both values: `getValue(prev)` unchanged AND `getValue(next)` updated.
- RITEWay: one assertion per test; name as "given `<state>`, when `<action>`, should `<result>`"

environment:

- Node.js 24+
- The module under test is src/counter.js

api:
  functions:
    - createCounter(initialValue = 0) -> Counter
    - increment(counter, amount = 1) -> Counter
    - decrement(counter, amount = 1) -> Counter
    - reset(counter) -> Counter
    - getValue(counter) -> number
  notes:
    - Counter is treated as immutable. Each operation returns a NEW counter.
    - Tests MUST call the exported functions; do not assume methods on Counter.

tests:

<!-- The "describe" groups are organizational only. Output each bullet as its own top-level test with a prefixed name. -->

  describe "createCounter":
    - should create a counter with default value 0
    - should create a counter with a custom initial value
    - should throw TypeError if initialValue is not finite

  describe "increment":
    - should increment by default amount 1 and return a new counter
    - should increment by a custom amount and return a new counter
    - should not mutate the original counter (prev unchanged, next updated)
    - should throw TypeError if amount is not finite

  describe "decrement":
    - should decrement by default amount 1 and return a new counter
    - should decrement by a custom amount and return a new counter
    - should not mutate the original counter (prev unchanged, next updated)
    - should throw TypeError if amount is not finite

  describe "reset":
    - should reset the counter to 0 and return a new counter
    - should not mutate the original counter (prev unchanged, next updated)

  describe "getValue":
    - should return the current value

output:

- Target file: test/counter.test.js
- Import `test` from 'node:test' and `strict as assert` from 'node:assert'
- Import `{ createCounter, increment, decrement, reset, getValue }` from '../src/counter.js'
- Generate ONLY flat, top-level tests named like:
  - "createCounter: given default, when created, should be 0"
  - "increment: given 3, when incremented by 2, should be 5"
- In all tests:
  - NEVER call methods on the counter (no `.increment()`, `.getValue()`, etc.)
  - Use `const next = increment(prev, amount)` (or `decrement`, `reset`)
  - Assert immutability by checking both `prev` and `next` with `getValue(...)`
  - Keep exactly one assertion per test; split when necessary
  - Do not leave variables unused; if unavoidable, prefix with `_`

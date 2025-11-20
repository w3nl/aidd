project: AIDD Demo – Counter tests

intent:
  Define counter behavior via RITEWay-style unit tests (design usage first).

constraints:

- DO NOT define createCounter, increment, decrement, reset, getValue in this file; ONLY import them.
- The test file must contain no export statements for production code.
- language: JavaScript ES modules
- test framework: node:test + assert
- one assertion per test (RITEWay)
- flat tests; no nested test()
- deterministic, pure usage
- functional API only (no instance methods)
- assert immutability (prev unchanged, next updated)
- unused variable rule: prefix with _ if unavoidable
- naming: `<group>`: given `<state>`, when `<action>`, should `<result>`
- each test encodes one falsifiable requirement

environment:

- Node.js 24+

api:
  functions:
    - createCounter(initialValue = 0) -> Counter
    - increment(counter, amount = 1) -> Counter
    - decrement(counter, amount = 1) -> Counter
    - reset(counter) -> Counter
    - getValue(counter) -> number
  notes:
    - pure, immutable; return new Counter objects
    - validate inputs (finite numbers)

tests:

  describe "createCounter":
    - given default, when created, should be 0
    - given 5, when created, should be 5
    - given non-finite initialValue, when created, should throw TypeError

  describe "increment":
    - given 3, when incremented by 1, should be 4
    - given 3, when incremented by 2, should be 5
    - given 3, when incremented by 1, should not mutate original

  describe "decrement":
    - given 3, when decremented by 1, should be 2
    - given 3, when decremented by 2, should be 1
    - given 3, when decremented by 1, should not mutate original

  describe "reset":
    - given 3, when reset, should be 0
    - given 3, when reset, should not mutate original

  describe "validation":
    - given non-finite amount, when increment called, should throw TypeError
    - given non-finite amount, when decrement called, should throw TypeError
    - given non-finite counter value, when any op called, should throw TypeError

output:

- Target file: test/counter.test.js
- Import only: { test } from 'node:test'; assert from 'node:assert/strict'
- Import { createCounter, increment, decrement, reset, getValue } from '../src/counter.js'
- Do not define or export any of those functions here.
- Target file: test/counter.test.js
- Imports: { test } from 'node:test'; assert from 'node:assert/strict'
- Import functions from '../src/counter.js'
- One assertion per test (split immutability into two separate tests if needed)

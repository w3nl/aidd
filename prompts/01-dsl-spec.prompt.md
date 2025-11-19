# Mini Sudolang-ish DSL for Node.js (Sudonode)

This project uses a tiny pseudocode style inspired by Sudolang.

## Sections

A typical prompt file may contain:

- `project` (optional)
- `intent`
- `constraints`
- `environment` (optional)
- `types`
- `functions`
- `tests` (for test prompt files)
- `output`

Example structure:

project: Counter demo

intent:
  A pure functional counter module for Node.js + browser.

constraints:

- language: JavaScript ES modules
- style: functional, pure functions
- no frameworks
- no IO or DB
- Node.js + browser compatible

types:
  type Counter:
    value: number

functions:
  function createCounter(initialValue: number = 0) -> Counter
    steps:
      - return Counter with value = initialValue

  function increment(counter: Counter, amount: number = 1) -> Counter
    steps:
      - compute newValue = counter.value + amount
      - return Counter with value = newValue

output:

- Target file: src/counter.js
- Use JSDoc for types
- Export all public functions

## Conventions

- `types` describe shapes of objects.
- `functions`:
  - `function name(args) -> returnType`
  - `steps:` bullet list describing the logic.
- `constraints` and `output` sections tell the AI how to shape the code file.

## Testing Conventions

- The DSL may use `describe` groups for readability.
- Generated code MUST NOT nest `test()` inside another `test()`.
- Emit flat, top-level tests and prefix names with the group:
  - Example: `test('createCounter: should create a counter with default value 0', ...)`.
- If subtests are ever used, they must be `await t.test(...)`, but prefer flat tests.
- Do not invent instance methods; import and call the functions exactly as specified by the API.
- ESLint: no-unused-vars. Either assert with the variable or name it with a leading `_`.

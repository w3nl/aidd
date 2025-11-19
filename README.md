# AIDD Sudolang-ish Demo (Node.js + ES Modules)

Tiny demo showing how to:

- Use sudolang‑ish prompt DSL files to generate code
- Produce pure, functional JavaScript (ES modules + JSDoc)
- Apply TDD with Node's built-in `node:test`
- Keep everything framework‑agnostic and immutable

## Requirements

- Node.js 24+ (`.nvmrc` set to 25; run `nvm use` if using nvm)
- An OpenAI API key (for code generation)
- Bash or compatible shell

## Setup

```bash
npm install
```

Create a `.env` file with your OpenAI key:

```bash
echo "OPENAI_API_KEY=sk-REPLACE_ME" > .env
```

## Generate Code & Tests

Prompts live in `./prompts/*.prompt.md`.

Generate the counter module + tests + types:

```bash
npm run gen:all
```

Individual generation:

```bash
# Module only
npm run gen:module counter
# Tests only
npm run gen:tests counter
# Type declarations (./types)
npm run gen:types
```

The generation script (`tools/generate-from-prompts.js`) concatenates:

- `prompts/00-aidd-base.prompt.md`
- `prompts/<name>-module.prompt.md` or `prompts/<name>-tests.prompt.md`
Then calls the OpenAI Chat Completion API and writes directly to `src/` or `test/`.

## Linting & Formatting

Run full lint (JS + types + markdown):

```bash
npm run lint
```

Auto-fix JavaScript issues:

```bash
npm run fix
```

ESLint is configured (see `eslint.config.js`) to enforce:

- Pure functional style
- JSDoc presence for functions
- No unused vars (unless prefixed with `_`)
- Import order and formatting

Markdown lint runs via `markdownlint` CLI.

## Testing

Use Node’s built-in test runner:

```bash
npm test
```

Or run an individual test file in VS Code launch config “Test current file”.

## Counter Module API

```js
createCounter(initialValue = 0) -> Counter
increment(counter, amount = 1) -> Counter
decrement(counter, amount = 1) -> Counter
reset(counter) -> Counter
getValue(counter) -> number
```

All functions validate inputs and throw `TypeError` on invalid values. The `Counter` is treated as immutable—operations return a new instance.

## Development Flow (TDD)

1. Edit or add a prompt (`*-module.prompt.md` or `*-tests.prompt.md`).
2. Generate code/tests (`npm run gen:module name`, `npm run gen:tests name`).
3. Run tests (`npm test`).
4. Fix lint issues (`npm run fix`) and re-run tests.
5. Commit small, passing changes.

## Environment & Configuration

- `.nvmrc` pins Node major version.
- `.env` supplies `OPENAI_API_KEY`.
- `jsconfig.json` / `tsconfig.json` enable JS type checking and declaration emit.
- GitHub Actions run lint and tests on push.

## Scripts Summary

| Command                      | Description                                 |
| ---------------------------- | ------------------------------------------- |
| `npm run gen:all`            | Generate module + tests + types for counter |
| `npm run gen:module counter` | Generate `src/counter.js` from prompt       |
| `npm run gen:tests counter`  | Generate `test/counter.test.js` from prompt |
| `npm run gen:types`          | Emit `.d.ts` declarations into `types/`     |
| `npm run lint`               | Lint JS, types, markdown                    |
| `npm run fix`                | Auto-fix JS lint issues                     |
| `npm test`                   | Run all tests                               |

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 *
 */
async function main() {
  const [, , typeArg, nameArg] = process.argv;

  if (!typeArg || !nameArg) {
    console.error(
      "Usage: node tools/generate-from-prompts.js <module|tests> <name>"
    );
    process.exit(1);
  }

  const type = typeArg; // "module" or "tests"
  const name = nameArg; // e.g. "counter"

  const projectRoot = process.cwd();

  const basePromptPath = path.join(
    projectRoot,
    "prompts",
    "00-aidd-base.prompt.md"
  );
  const modulePromptPath = path.join(
    projectRoot,
    "prompts",
    `${name}-${type}.prompt.md`
  );

  // e.g.
  //  - counter-module.prompt.md -> src/counter.js
  //  - counter-tests.prompt.md  -> test/counter.test.js
  const targetPath =
    type === "module"
      ? path.join(projectRoot, "src", `${name}.js`)
      : path.join(projectRoot, "test", `${name}.test.js`);

  const [basePrompt, modulePrompt] = await Promise.all([
    fs.readFile(basePromptPath, "utf8"),
    fs.readFile(modulePromptPath, "utf8"),
  ]);

  const instructionsPath = path.join(projectRoot, ".github", "copilot-instructions.md");
  let instructions = "";
  try {
    instructions = await fs.readFile(instructionsPath, "utf8");
  } catch {
    console.warn('No copilot instructions found')
  }

  const fullPrompt = `${instructions.trim()}\n\n${basePrompt.trim()}\n\n---\n\n${modulePrompt.trim()}`;

  console.log(
    `Generating ${type} for "${name}" from ${path.relative(
      projectRoot,
      modulePromptPath
    )}...`
  );
 const systemContent = type === "tests"
    ? "You are an AI that outputs only JavaScript test code (node:test + assert). Do not include markdown fences. Do NOT define or export production functions; only import them. Use flat tests (no nested test()). Prefer one assertion per test (RITEWay). Avoid unused variables. In tests whose title contains 'should not mutate', call the function and discard the return value instead of assigning it to a variable."
    : "You are an AI that outputs only JavaScript module code. Do not include markdown fences or filename banners.";

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // or whatever model you prefer
    messages: [
      {
        role: "system",
        content: systemContent
      },
      {
        role: "user",
        content: fullPrompt,
      },
    ],
    temperature: 0,
  });

  let code = response.choices[0]?.message?.content ?? "";

  if (!code.trim()) {
    console.error("No code generated, aborting.");
    process.exit(1);
  }

  code = code
    .replace(/^```[\s\S]*?```$/g, "")
    .replace(/^\/\s*src\/[^\n]*\n/, "")
    .replace(/^\/\/\s*filepath:[^\n]*\n/, "")
    .replace(/^\s*```[a-zA-Z]*\s*/g, "")
    .replace(/```$/g, "")
    .trimStart();

  // Heuristic: In “should not mutate” tests, discard returned value to avoid unused var lint errors
  if (type === "tests") {
    const lines = code.split("\n");
    let inNotMutateTest = false;
    const testOpenRegex = /^\s*test\s*\(\s*(['"]).*should not mutate.*\1\s*,\s*\(\s*\)\s*=>\s*\{\s*$/;
    const constAssignCallRegex = /^\s*const\s+[A-Za-z_$][\w$]*\s*=\s*(increment|decrement|reset)\s*\((.*)\)\s*;\s*$/;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (testOpenRegex.test(line)) {
        inNotMutateTest = true;
      }

      if (inNotMutateTest) {
        // Replace `const next = increment(prev, 1);` -> `increment(prev, 1);`
        const m = line.match(constAssignCallRegex);
        if (m) {
          const fn = m[1];
          const args = m[2];
          lines[i] = `${fn}(${args});`;
        }
        // Detect end of current test block by a closing brace at column 0 or dedent
        if (/^\s*\}\s*\)\s*;?\s*$/.test(line) || /^\}\s*$/.test(line)) {
          inNotMutateTest = false;
        }
      }
    }
    code = lines.join("\n");
  }

  // Ensure module typedef, if generating module
  if (type === "module" && !/^\/\*\*/.test(code)) {
    const typedef = `/**
 * @typedef {Object} Counter
 * @property {number} value - Current value.
 */
`;
    if (!code.includes("@typedef {Object} Counter")) {
      code = typedef + code;
    }
  }

  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.writeFile(targetPath, code, "utf8");

  console.log(`Wrote ${type} to ${path.relative(projectRoot, targetPath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

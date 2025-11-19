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

  const fullPrompt = `${basePrompt.trim()}\n\n---\n\n${modulePrompt.trim()}`;

  console.log(
    `Generating ${type} for "${name}" from ${path.relative(
      projectRoot,
      modulePromptPath
    )}...`
  );

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // or whatever model you prefer
    messages: [
      {
        role: "system",
        content:
          "You are an AI that outputs only JavaScript code. Do not include markdown fences.",
      },
      {
        role: "user",
        content: fullPrompt,
      },
    ],
    temperature: 0,
  });

  const code = response.choices[0]?.message?.content ?? "";

  if (!code.trim()) {
    console.error("No code generated, aborting.");
    process.exit(1);
  }

  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.writeFile(targetPath, code, "utf8");

  console.log(`Wrote ${type} to ${path.relative(projectRoot, targetPath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

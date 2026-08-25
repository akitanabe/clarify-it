import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { cli } from "textlint/lib/src/cli.js";
import { loadFromDirAsESM } from "textlint/lib/src/engine/rule-loader.js";
import {
  loadBuiltinPlugins,
  loadTextlintrc,
} from "textlint/lib/src/loader/TextlintrcLoader.js";
import { createLinter } from "textlint/lib/src/createLinter.js";
import { TextlintKernelDescriptor } from "@textlint/kernel";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const rulesDirectory = join(repositoryRoot, "lint/rules");
const textlintArguments = (args) => ["node", "textlint", ...args];

const cases = [
  "approval-scope-expansion",
  "multiple-decision-context-presentation",
  "internal-vocabulary-exposure",
];

const runTextlint = (args) => cli.execute(textlintArguments(args));

const runFixture = (ruleName, fixtureName) =>
  runTextlint([
    "--no-textlintrc",
    "--rulesdir",
    rulesDirectory,
    "--format",
    "json",
    join(repositoryRoot, "lint/fixtures", ruleName, `${fixtureName}.md`),
  ]);

const lintWithRule = async (ruleName, fixtureName) => {
  const rules = await loadFromDirAsESM(rulesDirectory);
  const rule = rules.find(({ ruleId }) => ruleId === ruleName);
  const descriptor = new TextlintKernelDescriptor({
    rules: [rule],
    filterRules: [],
    plugins: [],
  }).concat(await loadBuiltinPlugins());
  const linter = createLinter({ descriptor, cwd: repositoryRoot });
  const fixturePath = join(
    repositoryRoot,
    "lint/fixtures",
    ruleName,
    `${fixtureName}.md`,
  );

  return linter.lintText(await readFile(fixturePath, "utf8"), fixturePath);
};

for (const ruleName of cases) {
  test(`${ruleName}: valid fixture has no finding`, async () => {
    const result = await runFixture(ruleName, "valid");
    const lintResult = await lintWithRule(ruleName, "valid");

    assert.equal(result, 0);
    assert.deepEqual(lintResult.messages, []);
  });

  test(`${ruleName}: invalid fixture has the rule finding`, async () => {
    const result = await runFixture(ruleName, "invalid");
    const lintResult = await lintWithRule(ruleName, "invalid");

    assert.equal(result, 1);
    assert.ok(lintResult.messages.some(({ ruleId }) => ruleId === ruleName));
  });
}

test("current SKILL lint config loads common and clarify-it-specific rules together", async () => {
  const localDescriptor = new TextlintKernelDescriptor({
    rules: await loadFromDirAsESM(rulesDirectory),
    filterRules: [],
    plugins: [],
  });
  const configuredDescriptor = await loadTextlintrc({
    configFilePath: join(repositoryRoot, ".textlintrc.json"),
  });
  const ruleIds = localDescriptor
    .concat(configuredDescriptor)
    .toJSON()
    .rule.map(({ id }) => id);

  assert.deepEqual([...ruleIds].sort(), [
    "skill-lint/historical-defense-instruction",
    "skill-lint/nested-normative-instruction",
    "skill-lint/excessive-conditional-branches",
    "skill-lint/overloaded-instruction",
    "approval-scope-expansion",
    "multiple-decision-context-presentation",
    "internal-vocabulary-exposure",
  ].sort());
});

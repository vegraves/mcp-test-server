import { add, subtract, multiply, divide } from "./calculator.js";
import assert from "assert";

const tests = [
  // add
  ["add: positive numbers",     () => assert.strictEqual(add(2, 3), 5)],
  ["add: negative numbers",     () => assert.strictEqual(add(-2, -3), -5)],
  ["add: mixed signs",          () => assert.strictEqual(add(-2, 3), 1)],
  ["add: decimals",             () => assert.strictEqual(add(0.1, 0.2), 0.30000000000000004)],

  // subtract
  ["subtract: basic",           () => assert.strictEqual(subtract(10, 4), 6)],
  ["subtract: negative result", () => assert.strictEqual(subtract(3, 7), -4)],
  ["subtract: same number",     () => assert.strictEqual(subtract(5, 5), 0)],

  // multiply
  ["multiply: positive",        () => assert.strictEqual(multiply(3, 4), 12)],
  ["multiply: by zero",         () => assert.strictEqual(multiply(5, 0), 0)],
  ["multiply: negative",        () => assert.strictEqual(multiply(-3, 4), -12)],

  // divide
  ["divide: basic",             () => assert.strictEqual(divide(10, 2), 5)],
  ["divide: decimal result",    () => assert.strictEqual(divide(7, 2), 3.5)],
  ["divide: by zero throws",    () => assert.throws(() => divide(5, 0), /Division by zero/)],
];

let passed = 0, failed = 0;
for (const [name, fn] of tests) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (e) {
    console.log(`  ✗ ${name}: ${e.message}`);
    failed++;
  }
}
console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);

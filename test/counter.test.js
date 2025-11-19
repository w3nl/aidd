import { test } from 'node:test';
import { strict as assert } from 'node:assert';

import { createCounter, increment, decrement, reset, getValue } from '../src/counter.js';

test('createCounter: should create a counter with default value 0', () => {
  const counter = createCounter();
  assert.equal(getValue(counter), 0);
});

test('createCounter: should create a counter with a custom initial value', () => {
  const counter = createCounter(5);
  assert.equal(getValue(counter), 5);
});

test('createCounter: should throw TypeError if initialValue is not finite', () => {
  assert.throws(() => createCounter(NaN), TypeError);
  assert.throws(() => createCounter(Infinity), TypeError);
  assert.throws(() => createCounter(-Infinity), TypeError);
});

test('increment: should increment by default amount 1 and return a new counter', () => {
  const counter = createCounter(3);
  const next = increment(counter);
  assert.equal(getValue(next), 4);
});

test('increment: should increment by a custom amount and return a new counter', () => {
  const counter = createCounter(3);
  const next = increment(counter, 2);
  assert.equal(getValue(next), 5);
});

test('increment: should not mutate the original counter (prev unchanged, next updated)', () => {
  const counter = createCounter(3);
  const next = increment(counter);
  assert.equal(getValue(counter), 3);
  assert.equal(getValue(next), 4);
});

test('increment: should throw TypeError if amount is not finite', () => {
  const counter = createCounter(3);
  assert.throws(() => increment(counter, NaN), TypeError);
  assert.throws(() => increment(counter, Infinity), TypeError);
  assert.throws(() => increment(counter, -Infinity), TypeError);
});

test('decrement: should decrement by default amount 1 and return a new counter', () => {
  const counter = createCounter(3);
  const next = decrement(counter);
  assert.equal(getValue(next), 2);
});

test('decrement: should decrement by a custom amount and return a new counter', () => {
  const counter = createCounter(3);
  const next = decrement(counter, 2);
  assert.equal(getValue(next), 1);
});

test('decrement: should not mutate the original counter (prev unchanged, next updated)', () => {
  const counter = createCounter(3);
  const next = decrement(counter);
  assert.equal(getValue(counter), 3);
  assert.equal(getValue(next), 2);
});

test('decrement: should throw TypeError if amount is not finite', () => {
  const counter = createCounter(3);
  assert.throws(() => decrement(counter, NaN), TypeError);
  assert.throws(() => decrement(counter, Infinity), TypeError);
  assert.throws(() => decrement(counter, -Infinity), TypeError);
});

test('reset: should reset the counter to 0 and return a new counter', () => {
  const counter = createCounter(5);
  const next = reset(counter);
  assert.equal(getValue(next), 0);
});

test('reset: should not mutate the original counter (prev unchanged, next updated)', () => {
  const counter = createCounter(5);
  const next = reset(counter);
  assert.equal(getValue(counter), 5);
  assert.equal(getValue(next), 0);
});

test('getValue: should return the current value', () => {
  const counter = createCounter(7);
  assert.equal(getValue(counter), 7);
});
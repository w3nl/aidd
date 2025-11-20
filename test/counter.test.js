import { test } from 'node:test';
import assert from 'node:assert/strict';

import { createCounter, increment, decrement, reset, getValue } from '../src/counter.js';

test('createCounter: given default, when created, should be 0', () => {
    const counter = createCounter();
    assert.equal(getValue(counter), 0);
});

test('createCounter: given custom initial value, when created, should be that value', () => {
    const counter = createCounter(5);
    assert.equal(getValue(counter), 5);
});

test('createCounter: given non-finite initial value, when created, should throw TypeError', () => {
    assert.throws(() => createCounter(NaN), TypeError);
    assert.throws(() => createCounter(Infinity), TypeError);
});

test('increment: given 3, when incremented by 1, should be 4', () => {
    const prev = createCounter(3);
    const next = increment(prev);
    assert.equal(getValue(next), 4);
});

test('increment: given 3, when incremented by 2, should be 5', () => {
    const prev = createCounter(3);
    const next = increment(prev, 2);
    assert.equal(getValue(next), 5);
});

test('increment: given 3, when incremented, should not mutate original counter', () => {
    const prev = createCounter(3);
    const next = increment(prev);
    assert.equal(getValue(prev), 3);
    assert.equal(getValue(next), 4);
});

test('increment: given non-finite amount, when incremented, should throw TypeError', () => {
    const counter = createCounter(3);
    assert.throws(() => increment(counter, NaN), TypeError);
    assert.throws(() => increment(counter, Infinity), TypeError);
});

test('decrement: given 3, when decremented by 1, should be 2', () => {
    const prev = createCounter(3);
    const next = decrement(prev);
    assert.equal(getValue(next), 2);
});

test('decrement: given 3, when decremented by 2, should be 1', () => {
    const prev = createCounter(3);
    const next = decrement(prev, 2);
    assert.equal(getValue(next), 1);
});

test('decrement: given 3, when decremented, should not mutate original counter', () => {
    const prev = createCounter(3);
    const next = decrement(prev);
    assert.equal(getValue(prev), 3);
    assert.equal(getValue(next), 2);
});

test('decrement: given non-finite amount, when decremented, should throw TypeError', () => {
    const counter = createCounter(3);
    assert.throws(() => decrement(counter, NaN), TypeError);
    assert.throws(() => decrement(counter, Infinity), TypeError);
});

test('reset: given 3, when reset, should be 0', () => {
    const prev = createCounter(3);
    const next = reset(prev);
    assert.equal(getValue(next), 0);
});

test('reset: given 3, when reset, should not mutate original counter', () => {
    const prev = createCounter(3);
    const next = reset(prev);
    assert.equal(getValue(prev), 3);
    assert.equal(getValue(next), 0);
});

test('getValue: given counter with value 3, should return 3', () => {
    const counter = createCounter(3);
    assert.equal(getValue(counter), 3);
});
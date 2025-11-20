import { test } from 'node:test';
import assert from 'node:assert/strict';

import { createCounter, increment, decrement, reset, getValue } from '../src/counter.js';

test('createCounter: given default, when created, should be 0', () => {
    const counter = createCounter();
    assert.equal(getValue(counter), 0);
});

test('createCounter: given 5, when created, should be 5', () => {
    const counter = createCounter(5);
    assert.equal(getValue(counter), 5);
});

test('createCounter: given non-finite initialValue, when created, should throw TypeError', () => {
    assert.throws(() => createCounter(NaN), TypeError);
});

test('increment: given 3, when incremented by 1, should be 4', () => {
    const counter = createCounter(3);
    const newCounter = increment(counter, 1);
    assert.equal(getValue(newCounter), 4);
});

test('increment: given 3, when incremented by 2, should be 5', () => {
    const counter = createCounter(3);
    const newCounter = increment(counter, 2);
    assert.equal(getValue(newCounter), 5);
});

test('increment: given 3, when incremented by 1, should not mutate original', () => {
    const counter = createCounter(3);
    increment(counter, 1);
    assert.equal(getValue(counter), 3);
});

test('decrement: given 3, when decremented by 1, should be 2', () => {
    const counter = createCounter(3);
    const newCounter = decrement(counter, 1);
    assert.equal(getValue(newCounter), 2);
});

test('decrement: given 3, when decremented by 2, should be 1', () => {
    const counter = createCounter(3);
    const newCounter = decrement(counter, 2);
    assert.equal(getValue(newCounter), 1);
});

test('decrement: given 3, when decremented by 1, should not mutate original', () => {
    const counter = createCounter(3);
    decrement(counter, 1);
    assert.equal(getValue(counter), 3);
});

test('reset: given 3, when reset, should be 0', () => {
    const counter = createCounter(3);
    const newCounter = reset(counter);
    assert.equal(getValue(newCounter), 0);
});

test('reset: given 3, when reset, should not mutate original', () => {
    const counter = createCounter(3);
    reset(counter);
    assert.equal(getValue(counter), 3);
});

test('validation: given non-finite amount, when increment called, should throw TypeError', () => {
    const counter = createCounter(3);
    assert.throws(() => increment(counter, NaN), TypeError);
});

test('validation: given non-finite amount, when decrement called, should throw TypeError', () => {
    const counter = createCounter(3);
    assert.throws(() => decrement(counter, NaN), TypeError);
});

test('validation: given non-finite counter value, when any op called, should throw TypeError', () => {
    assert.throws(() => increment(createCounter(NaN), 1), TypeError);
});
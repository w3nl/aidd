/**
 * Creates a new Counter instance.
 * @param {number} [initialValue=0] - The initial value of the counter.
 * @returns {Counter} The created Counter instance.
 */
export function createCounter(initialValue?: number): Counter;
/**
 * Increments the counter by a specified amount.
 * @param {Counter} counter - The counter to increment.
 * @param {number} [amount=1] - The amount to increment by.
 * @returns {Counter} A new Counter instance with the incremented value.
 */
export function increment(counter: Counter, amount?: number): Counter;
/**
 * Decrements the counter by a specified amount.
 * @param {Counter} counter - The counter to decrement.
 * @param {number} [amount=1] - The amount to decrement by.
 * @returns {Counter} A new Counter instance with the decremented value.
 */
export function decrement(counter: Counter, amount?: number): Counter;
/**
 * Resets the counter to zero.
 * @param {Counter} counter - The counter to reset.
 * @returns {Counter} A new Counter instance with the value reset to zero.
 */
export function reset(counter: Counter): Counter;
/**
 * Gets the current value of the counter.
 * @param {Counter} counter - The counter to get the value from.
 * @returns {number} The current value of the counter.
 */
export function getValue(counter: Counter): number;
export class Counter {
    constructor(value: any);
    value: any;
}

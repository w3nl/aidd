/**
 * @typedef {object} Counter
 * @property {number} value - The current value of the counter.
 */

/**
 * Creates a new counter with the specified initial value.
 * @param {number} [initialValue] - The initial value of the counter.
 * @returns {Counter} - A new Counter object.
 * @throws {TypeError} - If initialValue is not a finite number.
 */
export const createCounter = (initialValue = 0) => {
    if (typeof initialValue !== 'number' || !isFinite(initialValue)) {
        throw new TypeError('Initial value must be a finite number.');
    }
    return { value: initialValue };
};

/**
 * Increments the counter by a specified amount.
 * @param {Counter} counter - The counter to increment.
 * @param {number} [amount] - The amount to increment the counter by.
 * @returns {Counter} - A new Counter object with the incremented value.
 * @throws {TypeError} - If counter.value or amount is not a finite number.
 */
export const increment = (counter, amount = 1) => {
    if (typeof counter.value !== 'number' || !isFinite(counter.value)) {
        throw new TypeError('Counter value must be a finite number.');
    }
    if (typeof amount !== 'number' || !isFinite(amount)) {
        throw new TypeError('Amount must be a finite number.');
    }
    const nextValue = counter.value + amount;
    return { value: nextValue };
};

/**
 * Decrements the counter by a specified amount.
 * @param {Counter} counter - The counter to decrement.
 * @param {number} [amount] - The amount to decrement the counter by.
 * @returns {Counter} - A new Counter object with the decremented value.
 * @throws {TypeError} - If counter.value or amount is not a finite number.
 */
export const decrement = (counter, amount = 1) => {
    if (typeof counter.value !== 'number' || !isFinite(counter.value)) {
        throw new TypeError('Counter value must be a finite number.');
    }
    if (typeof amount !== 'number' || !isFinite(amount)) {
        throw new TypeError('Amount must be a finite number.');
    }
    const nextValue = counter.value - amount;
    return { value: nextValue };
};

/**
 * Resets the counter to zero.
 * @param {Counter} counter - The counter to reset.
 * @returns {Counter} - A new Counter object with the value reset to zero.
 * @throws {TypeError} - If counter.value is not a finite number.
 */
export const reset = (counter) => {
    if (typeof counter.value !== 'number' || !isFinite(counter.value)) {
        throw new TypeError('Counter value must be a finite number.');
    }
    return { value: 0 };
};

/**
 * Gets the current value of the counter.
 * @param {Counter} counter - The counter to get the value from.
 * @returns {number} - The current value of the counter.
 * @throws {TypeError} - If counter.value is not a finite number.
 */
export const getValue = (counter) => {
    if (typeof counter.value !== 'number' || !isFinite(counter.value)) {
        throw new TypeError('Counter value must be a finite number.');
    }
    return counter.value;
};
export class Counter {
  constructor(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError('Initial value must be a finite number');
    }
    this.value = value;
  }
}

/**
 * Create a new Counter instance.
 * @param {number} [initialValue] - The initial value of the counter.
 * @returns {Counter} The created Counter instance.
 */
export function createCounter(initialValue = 0) {
  return new Counter(initialValue);
}

/**
 * Increment the counter by a specified amount.
 * @param {Counter} counter - The counter to increment.
 * @param {number} [amount] - The amount to increment by.
 * @returns {Counter} A new Counter instance with the incremented value.
 */
export function increment(counter, amount = 1) {
  validateCounter(counter);
  validateAmount(amount);
  const nextValue = counter.value + amount;
  return new Counter(nextValue);
}

/**
 * Decrement the counter by a specified amount.
 * @param {Counter} counter - The counter to decrement.
 * @param {number} [amount] - The amount to decrement by.
 * @returns {Counter} A new Counter instance with the decremented value.
 */
export function decrement(counter, amount = 1) {
  validateCounter(counter);
  validateAmount(amount);
  const nextValue = counter.value - amount;
  return new Counter(nextValue);
}

/**
 * Reset the counter to zero.
 * @param {Counter} counter - The counter to reset.
 * @returns {Counter} A new Counter instance with the value reset to zero.
 */
export function reset(counter) {
  validateCounter(counter);
  return new Counter(0);
}

/**
 * Get the current value of the counter.
 * @param {Counter} counter - The counter to get the value from.
 * @returns {number} The current value of the counter.
 */
export function getValue(counter) {
  validateCounter(counter);
  return counter.value;
}

/**
 * Validate that the counter is a valid Counter instance.
 * @param {Counter} counter - The counter to validate.
 * @throws {TypeError} If the counter is not valid.
 */
function validateCounter(counter) {
  if (!(counter instanceof Counter) || !Number.isFinite(counter.value)) {
    throw new TypeError('Invalid counter');
  }
}

/**
 * Validate that the amount is a finite number.
 * @param {number} amount - The amount to validate.
 * @throws {TypeError} If the amount is not valid.
 */
function validateAmount(amount) {
  if (!Number.isFinite(amount)) {
    throw new TypeError('Amount must be a finite number');
  }
}
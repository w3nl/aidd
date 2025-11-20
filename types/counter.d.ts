export function createCounter(initialValue?: number): Counter;
export function increment(counter: Counter, amount?: number): Counter;
export function decrement(counter: Counter, amount?: number): Counter;
export function reset(counter: Counter): Counter;
export function getValue(counter: Counter): number;
export type Counter = {
    /**
     * - The current value of the counter.
     */
    value: number;
};

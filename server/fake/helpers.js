/**
 * Could be as well imported from npm "compose-function",
 *  but that would bring inconsistency since repeat() here is written from scratch,
 *   as I could not find an npm module for repeat().
 *
 * A common (popular) compose function, also known as pipe
 * Chains functions together. Shortcut to x(y(z(arg)))
 */
export const compose =
  (...funcs) =>
  (arg) =>
    funcs.reduce((res, fn) => fn(res), arg);

/**
 * Functional programming is not a religion - while() is allowed I mean
 * Used to repeat a function, chaining the return value from execution to execution
 */
export const repeat = (times) => (fn) => (arg) => {
  let argument = arg;
  while (times--) {
    argument = fn(argument);
  }
  return argument;
};

/**
 * This function and some others use a faker passed into them.
 *  Well, since faker has its own state and is global, it doesn't make sense.
 *    It could make sense if faker.seed() would generate a new instance of faker, but it doesn't
 *      However, it allows to have multiple instances of faker in the app, each for a different locale
 *
 * Using faker, deterministically (if setting a seed to faker), select a random element from an array
 */
export const randomArrayElement = (faker) => (array) =>
  array[randomArrayIndex(faker)(array)()];

/**
 * Return random index from provided array (also works for strings)
 * It's actually bad to try to reuse this function due to its specific currying
 */
export const randomArrayIndex =
  (faker) =>
  (array) =>
  (offBy = 0) =>
    faker.mersenne.rand(array.length + offBy);

/**
 * Given a float number like 5.75, P( return 5 ) = 25%, P ( return 6 ) = 75%
 */
export const probabilityToInteger = (faker) => (float) =>
  Math.floor(float) + +(float % 1 > faker.datatype.float({ max: 1 }));

/**
 * Swaps a char at leftIndex with a char at leftIndex + 1
 */
export const swapAdjacentChars = (leftIndex) => (string) =>
  string.slice(0, leftIndex) +
  string.slice(leftIndex + 1, leftIndex + 2) +
  string.slice(leftIndex, leftIndex + 1) +
  string.slice(leftIndex + 2, string.length);

/**
 * True if value is in [start, start + length]
 */
export const inProximity = (value, start, length) =>
  value >= start && value <= start + length;

/**
 * Remove chat at index
 */
export const removeChar = (atIndex) => (string) =>
  string.slice(0, atIndex) + string.slice(atIndex + 1, string.length);

/**
 * Inserts a provided char before char at provided index
 */
export const insertChar = (atIndex) => (char) => (string) =>
  string.slice(0, atIndex) + char + string.slice(atIndex, string.length);

/**
 * Converts ['name', 'value'] to { name: 'value }
 */
export const entryToObject = (entry) => Object.fromEntries([entry]);

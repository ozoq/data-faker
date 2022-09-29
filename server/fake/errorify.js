import {
  compose,
  entryToObject,
  inProximity,
  insertChar,
  probabilityToInteger,
  randomArrayElement,
  randomArrayIndex,
  removeChar,
  repeat,
  swapAdjacentChars,
} from "./helpers.js";

/**
 * From an object where every value is a string, returns a random entry [name, value]
 * The larger the string in an entry, the higher the change to get its entry (relatively)
 * BUG: When a string length somehow gets to zero, no error, including insertCharacter() will ever proke
 *  A fix would be to first generate weights on a record, then errorify it many times
 */
const lengthWeightedRandomEntry = (faker) => (object) =>
  compose(objectValuesLengthSum, faker.mersenne.rand, (stopAt) =>
    Object.entries(object).reduce(
      ({ lengthWalked, result }, entry) => ({
        lengthWalked: lengthWalked + entry[1].length,
        result: inProximity(stopAt, lengthWalked, entry[1].length)
          ? entry
          : result,
      }),
      { lengthWalked: 0, result: null }
    )
  )(object).result;

/**
 * In an object where every value is a string, find the sum of these strings lengthes
 */
const objectValuesLengthSum = (object) =>
  Object.values(object).reduce((sum, value) => sum + value.length, 0);

/**
 * Apply a random error to a string
 * Possible errors:
 *  1. Remove random character
 *  2. Add random character at random place
 *  3. Swap two random adjacent characters
 */
const errorifyString = (faker) => (string) =>
  randomArrayElement(faker)([
    (index) => removeChar(index()),
    (index) => insertChar(index())(faker.random.alphaNumeric()),
    (index) => swapAdjacentChars(index(-1)),
  ])(randomArrayIndex(faker)(string))(string);

/**
 * Apply errorifyString() to a string in an entry [name, string]
 */
const errorifyEntry = (faker) => (entry) =>
  [entry[0], errorifyString(faker)(entry[1])];

/**
 * Apply errorifyEntry() to a random entry in an object
 */
const errorifyObject = (faker) => (object) => ({
  ...object,
  ...compose(
    lengthWeightedRandomEntry(faker),
    errorifyEntry(faker),
    entryToObject
  )(object),
});

/**
 * Exported method errorifyObject() to provided object,
 *  this many times as provided by amount
 */
export default (faker) => (amount) => (object) =>
  repeat(probabilityToInteger(faker)(amount))(errorifyObject(faker))(object);

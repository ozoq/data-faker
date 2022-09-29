import localizedFakers from "./localizedFakers.js";
import { compose, randomArrayElement } from "./helpers.js";
import errorify from "./errorify.js";

/**
 * To a record, adds a field with a random name
 */
const addName = (faker) => (record) => ({
  ...record,
  name: faker.name.fullName(),
});

/**
 * To a record, adds a field with a random address
 * Edit this function to support more address formats
 */
const addAddress = (faker) => (record) => ({
  ...record,
  address: randomArrayElement(faker)([
    () =>
      `${faker.address.city()}, ${faker.address.street()} ${faker.address.buildingNumber()}`,
    () =>
      `${faker.address.state()}, ${faker.address.city()}, ${faker.address.street()} ${faker.address.buildingNumber()}`,
  ])(),
});

/**
 * The most important function in this pseudo-module
 * Generates a random record,
 *  in a provided locale,
 *  deterministically by setting a seed,
 *  with a specified amount of errors (see errorify())
 */
export default function fake({ locale, seed, errors }) {
  const faker = localizedFakers[locale];
  faker.seed(seed);

  return compose(
    addName(faker),
    addAddress(faker),
    errorify(faker)(errors)
  )({});
}

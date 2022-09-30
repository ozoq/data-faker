import { faker as fakerNL } from "@faker-js/faker/locale/nl";
import { faker as fakerPL } from "@faker-js/faker/locale/pl";
import { faker as fakerLV } from "@faker-js/faker/locale/lv";
import { randomArrayElement } from "./helpers.js";
import polish from "./alphabets/polish.js";
import latvian from "./alphabets/latvian.js";

export default {
  nl: fakerNL,
  pl: fakerPL,
  lv: fakerLV,
};

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

fakerPL.random.alphaNumeric = () => {
  return randomArrayElement(fakerPL)([...numbers, ...polish]);
};

fakerLV.random.alphaNumeric = () => {
  return randomArrayElement(fakerLV)([...numbers, ...latvian]);
};

const fakerPL_phone_number_original = fakerPL.phone.number;
fakerPL.phone.number = () => {
  return randomArrayElement(fakerPL)([
    () => fakerPL_phone_number_original(),
    () => fakerPL_phone_number_original("###-###-###"),
    () => fakerPL_phone_number_original("#########"),
  ])();
};

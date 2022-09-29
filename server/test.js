import fake from "./fake/fake.js";

const fake1 = fake({
  locale: "pl",
  seed: Number(process.argv[2]),
  errors: Number(process.argv[3]),
});

console.log(fake1);

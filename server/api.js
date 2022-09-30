import { Router } from "express";
import fake from "./fake/fake.js";
import crypto from "crypto";

const router = Router();

router.post("/getFakePage", ({ body }, res) => {
  res.json(
    generateFakePage({
      locale: body.locale ?? "pl",
      seed: parseInt(body.seed) || 0,
      errors: Math.min(parseFloat(body.errors), 1000) || 0,
      from: parseInt(body.from) || 0,
      amount: parseInt(body.amount) || 1,
    })
  );
});

function generateFakePage({ locale, seed, errors, from, amount }) {
  const page = [];
  for (let i = from; i < from + amount; i++) {
    const localSeed = advanceSeed(seed, i);
    console.log(
      `Generating single record with: seed: ${seed}, localSeed: ${localSeed}`
    );
    page.push(
      fake({
        locale,
        seed: localSeed,
        errors,
      })
    );
  }
  return page;
}

function advanceSeed(seed, index) {
  return crypto
    .createHash("md5")
    .update(seed.toString())
    .update(index.toString())
    .digest()
    .readUInt32BE();
}

export default router;

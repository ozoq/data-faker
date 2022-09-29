import fake from "./fake/fake.js";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// I already regret using ES6 modules on nodejs
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../dist")));

app.post("/api/ping", (req, res) => {
  const record = fake({
    locale: req.body.locale ?? "pl",
    seed: Number(req.body.seed),
    errors: req.body.errors ?? 1,
  });
  console.log(record);
  res.json({
    status: "success",
    message: "",
    data: record,
  });
});

export default app;

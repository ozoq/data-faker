import fake from "./fake/fake.js";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import api from "./api.js";

// I already regret using ES6 modules on nodejs
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../dist")));

app.use("/api", api);

export default app;

import express from "express";
import cors from "cors";
import morgan from "morgan";

import { ENV } from "./config/env.js";

const app = express();
const { PORT } = ENV;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log("App running on port", PORT);
});

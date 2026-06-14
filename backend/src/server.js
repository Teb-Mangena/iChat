import express from "express";
import cors from "cors";
import morgan from "morgan";

import { ENV } from "./config/env.js";
import { connectDb } from "./config/db.js";

const app = express();
const { PORT } = ENV;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// check health
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Server started",
  });
});

// API ROUTES

// Connect DB then start the server
startServer();

async function startServer() {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log("App running on port", PORT);
    });
  } catch (error) {
    console.log("Error starting server", error.message);
  }
}

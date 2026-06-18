import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";

import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./config/env.js";
import { connectDb } from "./config/db.js";

import authRoutes from "./routes/auth.route.js";
import job from "./lib/cron.js";

const app = express();
const { PORT, FRONTEND_URL, NODE_ENV } = ENV;

const publicDir = path.join(process.cwd(), "public");

app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use(clerkMiddleware());
app.use(morgan("dev"));

// check health
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Server started",
  });
});

// API ROUTES
app.use("/api/auth", authRoutes);

if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

// Connect DB then start the server
startServer();

async function startServer() {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log("App running on port", PORT);
    });

    if (NODE_ENV === "production") job.start();
  } catch (error) {
    console.log("Error starting server", error.message);
  }
}

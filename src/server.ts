import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";

import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admins";
import userRoutes from "./routes/users";
const app = express();

app.use("/auth", authRoutes);
app.use("/admins", adminRoutes);
app.use("/users", userRoutes);

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => console.info("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
});

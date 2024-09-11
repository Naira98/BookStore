import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config/config";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admins";
import userRoutes from "./routes/users";

const app = express();

export const IMAGES_PATH = path.join(__dirname, "..", "public");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/assets", express.static(IMAGES_PATH));
app.use(cors());

declare module "express" {
  interface Request {
    user?: { userId?: string; type?: string };
  }
}

app.use("/api/auth", authRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => console.info("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
});

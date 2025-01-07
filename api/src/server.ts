import express from "express";
import cors from "cors";
import config from "./config/config";
import authRoutes from "./routes/auth";
import { ERoleType } from "./types/db_types";
import adminRoutes from "./routes/admins";
import userRoutes from "./routes/users";
import { errorHandler } from "./controllers/errorHandler";
import { notFound } from "./controllers/notFound";
import { validateData } from "./middlewares/validations";
import { z } from "zod";
import { headersSchema } from "./schemas/headersSchemas";

export const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

declare module "express" {
  interface Request {
    user?: {
      userId: number;
      role: ERoleType;
    };
  }
}

if (process.env.NODE_ENV !== "test") {
  app.use(validateData(headersSchema, "headers"));
}

app.use("/api/auth", authRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

export const server = app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
});

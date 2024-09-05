import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";

const app = express();

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => console.info("Mongoose Connected"))
  .catch((err) => console.log(err));

app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
});

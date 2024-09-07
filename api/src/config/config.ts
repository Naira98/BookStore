import dotenv from "dotenv";

dotenv.config();

const development = process.env.NODE_ENV === "development";

const MONGO_USER = process.env.MONGO_USER || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.xk4dvlj.mongodb.net/BookStore`;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 1337;

const SESSION_SECRET = process.env.SESSION_SECRET || "mySessionSecretCatDog";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
    dev: development,
  },
  sessions: {
    secret: SESSION_SECRET,
  },
  stripe: {
    secret: STRIPE_SECRET_KEY
  }
};

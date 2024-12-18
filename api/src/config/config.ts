import dotenv from "dotenv";

dotenv.config();

const development = process.env.NODE_ENV === "development";

const MONGO_USER = process.env.MONGO_USER || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.xk4dvlj.mongodb.net/BookStore`;

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || "";

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 1337;

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "secret";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";

const CLOUDINAY_API_NAME = process.env.CLOUDINAY_API_NAME || "";
const CLOUDINAY_API_KEY = process.env.CLOUDINAY_API_KEY || "";
const CLOUDINAY_API_SECRET = process.env.CLOUDINAY_API_SECRET || "";

const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
    dev: development,
  },
  jwt: {
    accessSecret: JWT_ACCESS_SECRET,
    refreshSecret: JWT_REFRESH_SECRET,
  },
  stripe: {
    secret: STRIPE_SECRET_KEY,
  },
  supabase: {
    url: SUPABASE_URL,
    service_key: SUPABASE_SERVICE_KEY
  },
  cloudinay: {
    cloud_name: CLOUDINAY_API_NAME,
    api_key: CLOUDINAY_API_KEY,
    api_secret: CLOUDINAY_API_SECRET
  }
};

export default config;

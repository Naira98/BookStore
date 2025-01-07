import dotenv from "dotenv";

dotenv.config();

const development = process.env.NODE_ENV === "development";

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 1337;

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "secret";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";

const CLOUDINAY_API_NAME = process.env.CLOUDINAY_API_NAME || "";
const CLOUDINAY_API_KEY = process.env.CLOUDINAY_API_KEY || "";
const CLOUDINAY_API_SECRET = process.env.CLOUDINAY_API_SECRET || "";

const PG_user = process.env.PG_user || "";
const PG_password = process.env.PG_password || "";
const PG_host = process.env.PG_host || "";
const PG_port = process.env.PG_port || 5432;
const PG_database = process.env.PG_database || "";

const config = {
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
  cloudinay: {
    cloud_name: CLOUDINAY_API_NAME,
    api_key: CLOUDINAY_API_KEY,
    api_secret: CLOUDINAY_API_SECRET,
  },
  postgres: {
    user: PG_user,
    password: PG_password,
    host: PG_host,
    port: PG_port,
    database: PG_database,
  },
};

export default config;

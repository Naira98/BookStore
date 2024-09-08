import path from "path";
import express, { NextFunction, Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
import session from "express-session";
import { default as connectMongoDBSession } from "connect-mongodb-session";
import { config } from "./config/config";

import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admins";
import userRoutes from "./routes/users";
import User, { IUserModel } from "./models/User";

const app = express();
const mongoDBStore = connectMongoDBSession(session);

const store = new mongoDBStore({
  uri: config.mongo.url,
  collection: "sessions",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  "/books",
  express.static(path.join(__dirname, "..", "public", "books"))
);
app.use(
  "/profiles",
  express.static(path.join(__dirname, "..", "public", "profiles"))
);

declare module "express" {
  interface Request {
    user?: { userId?: string; type?: string };
  }
}

// declare module "express-session" {
//   interface SessionData {
//     userId: ObjectId;
//     isAuth: boolean;
//     type: string;
//   }
// }

// app.use(
//   session({
//     secret: config.sessions.secret,
//     resave: false,
//     saveUninitialized: true,
//     store,
//   })
// );

// app.use(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // console.log(req.session)
//     if (!req.session.userId) {
//       next();
//     } else {
//       const user = await User.findById(req.session.userId).select("-password");
//       if (!user) next();
//       req.user = user;
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json(error);
//   }
// });

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

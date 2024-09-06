import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { config } from "./config/config";
import User from "./models/User";

async function seed() {
  // connect to DB
  mongoose
    .connect(config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

  // insert super admin
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash('admin', salt)
  const newSuperAdmin = new User({
    fullName: "Super Admin",
    email: "super@admin.com",
    password: hashedPassword,
    phone: '34324324',
    type: "superAdmin",
  });

  await newSuperAdmin.save();
  console.log("Super admin created");

  // disconnect from DB
  mongoose.connection.close();
}

seed();

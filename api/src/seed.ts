import bcrypt from "bcrypt";
import { users } from "./services/db";
import { Conflict } from "./lib/error";

async function seed() {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash("super-admin", salt);
    const [id] = await users()
      .insert({
        full_name: "Super Admin",
        email: "super@admin.com",
        password: hashedPassword,
        phone: "01111111",
        role: "super_admin",
      })
      .returning("id");
    console.log(id);
  } catch (error) {
    if (error.code == "23505") throw new Conflict("Email already exists");
    throw new Error(error.message);
  }
}

seed().then(() => process.exit());

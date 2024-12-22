import bcrypt from "bcrypt";
import supabase from "./services/db";
import { Conflict } from "./lib/error";

async function seed() {
  // insert super admin
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash("super-admin", salt);
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        full_name: "Super Admin",
        email: "super@admin.com",
        password: hashedPassword,
        phone: "01111111",
        role: "super_admin",
      },
    ])
    .select("id")
    .single();

  if (error) {
    if (error.code == "23505") throw new Conflict("Email already exists");
    throw new Error(error.message);
  }
  console.log(data)
}

seed();

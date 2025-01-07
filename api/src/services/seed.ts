import { db } from "./db";

async function run() {
  await db.schema.createTable("stripe_sessions", (table) => {
    table.increments();
    table.timestamps(true, true, false);
    table.string("session_id").unique().notNullable();
    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id", "fk_user_id_stripe_sessions")
      .references("users.id");
    table.index("user_id", "idx_user_id_stripe_sessions");
  });
}
run().then(() => process.exit());

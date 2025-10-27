import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as schema from "@/db/schema";

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

// Provide a safe fallback in development when DATABASE_URL isn't set
// to allow the app to run without a database.
let db: any;
if (connectionString) {
  const pool = new Pool({ connectionString });
  db = drizzle({ client: pool, schema });
} else {
  const noop = () => [] as unknown[];
  db = {
    select: () => ({
      from: () => ({
        where: () => ({
          limit: noop,
        }),
      }),
    }),
  } as const;
}

export { db };

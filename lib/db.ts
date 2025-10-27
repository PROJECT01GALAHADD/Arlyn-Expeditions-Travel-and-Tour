import "server-only";
import * as schema from "@/db/schema";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

// Provide a safe fallback in development/preview when DATABASE_URL isn't set
// to allow the app to run without a database while returning reasonable values.
let db: any;
if (connectionString) {
	const pool = new Pool({ connectionString });
	db = drizzle({ client: pool, schema });
} else {
	const empty = async () => [] as unknown[];
	db = {
		select: () => ({
			from: () => empty(),
			where: () => ({
				limit: () => empty(),
			}),
		}),
		insert: () => ({ values: () => Promise.resolve({ rowsAffected: 0 }) }),
		update: () => ({
			set: () => ({ where: () => Promise.resolve({ rowsAffected: 0 }) }),
		}),
		delete: () => ({ where: () => Promise.resolve({ rowsAffected: 0 }) }),
	} as const;
}

export { db };

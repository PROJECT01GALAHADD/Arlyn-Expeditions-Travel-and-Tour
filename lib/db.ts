import "server-only";
import * as schema from "@/db/schema";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

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

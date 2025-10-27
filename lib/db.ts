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
	// Chainable thenable builder that resolves to an empty array when awaited.
	const emptyArrayResult = [] as unknown[];
	const chainableArrayBuilder = {
		from: () => chainableArrayBuilder,
		where: () => chainableArrayBuilder,
		limit: () => chainableArrayBuilder,
		then: (resolve: (value: unknown[]) => void) => resolve(emptyArrayResult),
	} as const;

	// Chainable thenable builder for write ops that resolves to an ack object.
	const ack = { rowsAffected: 0 } as const;
	const chainableAckBuilder = {
		values: () => chainableAckBuilder,
		set: () => chainableAckBuilder,
		where: () => chainableAckBuilder,
		then: (resolve: (value: typeof ack) => void) => resolve(ack),
	} as const;

	db = {
		select: () => chainableArrayBuilder,
		insert: () => chainableAckBuilder,
		update: () => chainableAckBuilder,
		delete: () => chainableAckBuilder,
	} as const;
}

export { db };

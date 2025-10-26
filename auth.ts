import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { db } from "@/lib/db";
import { tourOperators } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "development-secret-change-in-production-abc123xyz789",
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;

          const operator = await db
            .select()
            .from(tourOperators)
            .where(eq(tourOperators.username, username))
            .limit(1);

          if (!operator || operator.length === 0) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            operator[0].password
          );

          if (passwordsMatch) {
            return {
              id: operator[0].id,
              name: operator[0].name,
              email: operator[0].email,
            };
          }
        }

        return null;
      },
    }),
  ],
});

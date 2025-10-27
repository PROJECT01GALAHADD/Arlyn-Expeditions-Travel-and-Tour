import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tours } from "@/db/schema";

export async function GET() {
  try {
    // If no database configured, return an empty list to keep UI stable
    if (!process.env.DATABASE_URL) {
      return NextResponse.json([]);
    }

    const allTours = await db.select().from(tours);
    return NextResponse.json(allTours);
  } catch (error) {
    console.error("Error fetching tours:", error);
    return NextResponse.json(
      { error: "Failed to fetch tours" },
      { status: 500 }
    );
  }
}

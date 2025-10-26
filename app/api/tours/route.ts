import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tours } from "@/db/schema";

export async function GET() {
  try {
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

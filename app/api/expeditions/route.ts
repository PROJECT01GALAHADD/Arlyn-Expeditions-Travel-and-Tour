import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { expeditions } from "@/db/schema";

export async function GET() {
  try {
    const allExpeditions = await db.select().from(expeditions);
    return NextResponse.json(allExpeditions);
  } catch (error) {
    console.error("Error fetching expeditions:", error);
    return NextResponse.json(
      { error: "Failed to fetch expeditions" },
      { status: 500 }
    );
  }
}

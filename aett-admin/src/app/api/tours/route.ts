import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tours, insertTourSchema } from "@/db/schema";

export async function GET() {
  try {
    const data = await db.select().from(tours).orderBy(tours.createdAt);
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch tours" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = insertTourSchema.parse(body);
    const [created] = await db.insert(tours).values(parsed).returning();
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (err: any) {
    const message = err?.message || "Failed to create tour";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

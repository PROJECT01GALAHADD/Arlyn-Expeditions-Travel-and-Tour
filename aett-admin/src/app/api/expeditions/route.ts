import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { expeditions, insertExpeditionSchema } from "@/db/schema";

export async function GET() {
  try {
    const data = await db.select().from(expeditions).orderBy(expeditions.createdAt);
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch expeditions" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = insertExpeditionSchema.parse(body);
    const [created] = await db.insert(expeditions).values(parsed).returning();
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (err: any) {
    const message = err?.message || "Failed to create expedition";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookings, insertBookingSchema } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.select().from(bookings).orderBy(bookings.createdAt);
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = insertBookingSchema.parse(body);
    const [created] = await db.insert(bookings).values(parsed).returning();
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (err: any) {
    const message = err?.message || "Failed to create booking";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body as { id: string; status: string };
    if (!id || !status) {
      return NextResponse.json({ error: "id and status required" }, { status: 400 });
    }
    const [updated] = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning();
    return NextResponse.json({ data: updated });
  } catch (err: any) {
    const message = err?.message || "Failed to update booking";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookings, insertBookingSchema } from "@/db/schema";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allBookings = await db.select().from(bookings);
    return NextResponse.json(allBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body with Zod
    const validatedData = insertBookingSchema.parse(body);
    
    const [newBooking] = await db
      .insert(bookings)
      .values({
        ...validatedData,
        status: "pending",
      })
      .returning();

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid booking data", details: error },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

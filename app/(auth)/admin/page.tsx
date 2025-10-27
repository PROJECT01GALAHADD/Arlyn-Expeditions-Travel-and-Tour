import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { bookings, type Booking } from "@/db/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function AdminDashboard() {
  const session = await auth();
  
  if (!session) {
    redirect("/admin/login");
  }

  const allBookings: Booking[] = await db.select().from(bookings);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Operator Dashboard</h1>
          <p className="text-muted-foreground">Manage bookings and reservations</p>
        </div>

        <div className="grid gap-6">
          {allBookings.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No bookings yet</p>
            </Card>
          ) : (
            allBookings.map((booking) => (
              <Card key={booking.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{booking.name}</h3>
                    <p className="text-sm text-muted-foreground">{booking.email}</p>
                    <p className="text-sm text-muted-foreground">{booking.phone}</p>
                  </div>
                  <Badge
                    variant={
                      booking.status === "confirmed"
                        ? "default"
                        : booking.status === "cancelled"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium">{booking.bookingType}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">{booking.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Guests</p>
                    <p className="font-medium">{booking.guests}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Booked</p>
                    <p className="font-medium">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {booking.message && (
                  <div className="mt-4 p-4 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">Message:</p>
                    <p className="text-sm">{booking.message}</p>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

type Tour = {
  id: string;
  name: string;
  time: string;
  rate: string;
  type: string;
  destinations: string;
  inclusions: string;
  imageUrl: string | null;
  featured: boolean;
  createdAt: string;
};

type Expedition = {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: string;
  rate: string;
  maxParticipants: number;
  inclusions: string;
  imageUrl: string | null;
  featured: boolean;
  createdAt: string;
};

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  tourId: string | null;
  expeditionId: string | null;
  bookingType: string;
  date: string;
  guests: number;
  message: string | null;
  status: string;
  createdAt: string;
};

export default function AdminPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [tRes, eRes, bRes] = await Promise.all([
          fetch("/api/tours"),
          fetch("/api/expeditions"),
          fetch("/api/bookings"),
        ]);
        const tJson = await tRes.json();
        const eJson = await eRes.json();
        const bJson = await bRes.json();
        setTours(tJson.data || []);
        setExpeditions(eJson.data || []);
        setBookings(bJson.data || []);
      } catch (err: any) {
        setError(err?.message || "Failed to load admin data");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function updateBookingStatus(id: string, status: string) {
    await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const res = await fetch("/api/bookings");
    const json = await res.json();
    setBookings(json.data || []);
  }

  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;
  if (error) return <div style={{ padding: 24, color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: 24, display: "grid", gap: 24 }}>
      <h1>Admin Dashboard</h1>

      <section>
        <h2>Tours ({tours.length})</h2>
        <ul style={{ display: "grid", gap: 8 }}>
          {tours.map((t) => (
            <li key={t.id} style={{ border: "1px solid #ddd", padding: 12 }}>
              <strong>{t.name}</strong> · {t.type} · {t.time} · Rate: {t.rate}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Expeditions ({expeditions.length})</h2>
        <ul style={{ display: "grid", gap: 8 }}>
          {expeditions.map((e) => (
            <li key={e.id} style={{ border: "1px solid #ddd", padding: 12 }}>
              <strong>{e.name}</strong> · {e.duration} · {e.difficulty} · Rate: {e.rate}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Bookings ({bookings.length})</h2>
        <ul style={{ display: "grid", gap: 8 }}>
          {bookings.map((b) => (
            <li key={b.id} style={{ border: "1px solid #ddd", padding: 12 }}>
              <div>
                <strong>{b.name}</strong> · {b.bookingType} · {b.date} · Guests: {b.guests}
              </div>
              <div>Email: {b.email} · Phone: {b.phone}</div>
              <div>Status: <strong>{b.status}</strong></div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button onClick={() => updateBookingStatus(b.id, "approved")}>Approve</button>
                <button onClick={() => updateBookingStatus(b.id, "rejected")}>Reject</button>
                <button onClick={() => updateBookingStatus(b.id, "pending")}>Mark Pending</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

"use client";

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const bookingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  tourId: z.string().optional(),
  expeditionId: z.string().optional(),
  bookingType: z.enum(["tour", "expedition"]),
  date: z.string().min(1, "Please select a date"),
  guests: z.number().min(1, "At least 1 guest required").max(50),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

function BookingPageContent() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const tourId = searchParams.get("tourId");
  const expeditionId = searchParams.get("expeditionId");
  const bookingType = tourId ? "tour" : "expedition";

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      tourId: tourId || undefined,
      expeditionId: expeditionId || undefined,
      bookingType,
      date: "",
      guests: 1,
      message: "",
    },
  });

  const createBooking = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create booking");
      return response.json();
    },
    onSuccess: () => {
      setBookingSuccess(true);
      toast({
        title: "Booking submitted!",
        description: "We'll contact you soon to confirm your booking.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Booking failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookingFormData) => {
    createBooking.mutate(data);
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Booking Received!
          </h2>
          <p className="text-muted-foreground mb-6">
            Thank you for your booking. Our team will contact you shortly to
            confirm your reservation.
          </p>
          <Button onClick={() => setBookingSuccess(false)}>
            Make Another Booking
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-[40vh] flex items-center justify-center mb-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/arlyn-expeditions-4.png)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
            Book Your Adventure
          </h1>
          <p className="text-xl text-white drop-shadow-lg">
            Fill out the form below to reserve your tour or expedition
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 md:px-8 pb-16">

        <Card className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+63 912 345 6789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tour Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Guests</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="50"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requests (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special requests or questions?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={createBooking.isPending}
              >
                {createBooking.isPending ? "Submitting..." : "Submit Booking"}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20">Loading...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}

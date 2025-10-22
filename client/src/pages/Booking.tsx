import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type Booking, type Tour } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Minus, Plus, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { SiWhatsapp } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import tourImage1 from "@assets/generated_images/Twin_Lagoon_kayaking_Coron_ccdecb05.png";
import tourImage2 from "@assets/generated_images/Kayangan_Lake_viewpoint_Coron_0b301942.png";
import tourImage3 from "@assets/generated_images/Calauit_Safari_giraffes_Palawan_9fdfd4c3.png";
import tourImage4 from "@assets/generated_images/Private_charter_luxury_boat_bc9c5781.png";

const imageMap: Record<string, string> = {
  "twin-lagoon.png": tourImage1,
  "kayangan-lake.png": tourImage2,
  "calauit-safari.png": tourImage3,
  "private-charter.png": tourImage4,
  "underwater-coral.png": tourImage1,
  "island-hopping.png": tourImage1,
};

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [guestCount, setGuestCount] = useState(2);
  const { toast } = useToast();

  const { data: tours, isLoading: isLoadingTours } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: Booking) => {
      return await apiRequest("POST", "/api/bookings", data);
    },
    onSuccess: (response: any) => {
      const whatsappUrl = `https://wa.me/639954948681?text=${encodeURIComponent(response.whatsappMessage)}`;
      window.open(whatsappUrl, "_blank");
      
      toast({
        title: "Booking request sent!",
        description: "We'll contact you shortly via WhatsApp to confirm your booking.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Booking>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      tourId: "",
      tourName: "",
      date: "",
      guests: 2,
      message: "",
    },
  });

  const selectedTourId = watch("tourId");
  const selectedTour = tours?.find((t) => t.id === selectedTourId);

  const getTourImage = (tour: Tour | undefined) => {
    if (!tour || !tour.images || tour.images.length === 0) return tourImage1;
    return imageMap[tour.images[0]] || tourImage1;
  };

  const onSubmit = async (data: Booking) => {
    bookingMutation.mutate(data);
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h1
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
            data-testid="text-booking-title"
          >
            Book Your Adventure
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Fill out the form below and we'll get back to you via WhatsApp
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Your Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="John Doe"
                        data-testid="input-name"
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="john@example.com"
                        data-testid="input-email"
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        placeholder="+63 XXX XXX XXXX"
                        data-testid="input-phone"
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </Card>

                <Card className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Tour Details</h2>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="tour">Select Tour *</Label>
                      <Select
                        onValueChange={(value) => {
                          setValue("tourId", value);
                          const tour = tours?.find((t) => t.id === value);
                          if (tour) {
                            setValue("tourName", tour.name);
                          }
                        }}
                      >
                        <SelectTrigger data-testid="select-tour">
                          <SelectValue placeholder="Choose your tour" />
                        </SelectTrigger>
                        <SelectContent>
                          {(tours || []).map((tour) => (
                            <SelectItem key={tour.id} value={tour.id}>
                              {tour.name} - ₱{tour.price.toLocaleString()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.tourId && (
                        <p className="text-sm text-destructive mt-1">{errors.tourId.message}</p>
                      )}
                    </div>

                    <div>
                      <Label>Preferred Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            data-testid="button-date-picker"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? (
                              format(selectedDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                              setSelectedDate(date);
                              if (date) {
                                setValue("date", format(date, "yyyy-MM-dd"));
                              }
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.date && (
                        <p className="text-sm text-destructive mt-1">{errors.date.message}</p>
                      )}
                    </div>

                    <div>
                      <Label>Number of Guests *</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const newCount = Math.max(1, guestCount - 1);
                            setGuestCount(newCount);
                            setValue("guests", newCount);
                          }}
                          data-testid="button-guests-minus"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <div className="flex-1 text-center">
                          <span
                            className="text-2xl font-bold"
                            data-testid="text-guest-count"
                          >
                            {guestCount}
                          </span>
                          <input type="hidden" {...register("guests", { valueAsNumber: true })} value={guestCount} />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const newCount = Math.min(50, guestCount + 1);
                            setGuestCount(newCount);
                            setValue("guests", newCount);
                          }}
                          data-testid="button-guests-plus"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {errors.guests && (
                        <p className="text-sm text-destructive mt-1">{errors.guests.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message">Additional Message (Optional)</Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        placeholder="Any special requests or questions?"
                        rows={4}
                        data-testid="textarea-message"
                      />
                    </div>
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-24">
                  <h3 className="text-xl font-bold mb-4">Booking Summary</h3>

                  {selectedTour && (
                    <div className="space-y-4">
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <img
                          src={getTourImage(selectedTour)}
                          alt={selectedTour.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg">{selectedTour.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Date not selected"}
                        </p>
                      </div>

                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Price per person:</span>
                          <span className="font-semibold">₱{selectedTour.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Guests:</span>
                          <span className="font-semibold">{guestCount}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t pt-2">
                          <span>Total:</span>
                          <span className="text-primary">
                            ₱{(selectedTour.price * guestCount).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {!selectedTour && (
                    <p className="text-muted-foreground text-sm text-center py-8">
                      Select a tour to see pricing details
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full mt-6 gap-2"
                    disabled={isSubmitting || bookingMutation.isPending || isLoadingTours}
                    data-testid="button-send-booking"
                  >
                    {(isSubmitting || bookingMutation.isPending) ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <SiWhatsapp className="w-5 h-5" />
                        Send Booking Request
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    You'll be redirected to WhatsApp to complete your booking
                  </p>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

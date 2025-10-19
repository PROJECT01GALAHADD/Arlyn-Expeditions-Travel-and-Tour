import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Check, X, Loader2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { Tour } from "@shared/schema";
import tourImage1 from "@assets/generated_images/Twin_Lagoon_kayaking_Coron_ccdecb05.png";
import tourImage2 from "@assets/generated_images/Kayangan_Lake_viewpoint_Coron_0b301942.png";
import tourImage3 from "@assets/generated_images/Calauit_Safari_giraffes_Palawan_9fdfd4c3.png";
import tourImage4 from "@assets/generated_images/Private_charter_luxury_boat_bc9c5781.png";
import galleryImage1 from "@assets/generated_images/Underwater_coral_reef_Coron_03a15194.png";
import galleryImage2 from "@assets/generated_images/Island_hopping_boats_lagoon_5613b853.png";

const imageMap: Record<string, string> = {
  "twin-lagoon.png": tourImage1,
  "kayangan-lake.png": tourImage2,
  "calauit-safari.png": tourImage3,
  "private-charter.png": tourImage4,
  "underwater-coral.png": galleryImage1,
  "island-hopping.png": galleryImage2,
};

export default function Tours() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: tours, isLoading } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  const staticTours = [
    {
      id: "coron-ultimate",
      name: "Coron Ultimate Tour",
      slug: "coron-ultimate",
      shortDescription: "Experience the best of Coron in one incredible day",
      description:
        "Discover the most iconic destinations of Coron in this comprehensive full-day tour. Visit pristine lagoons, snorkel in crystal-clear waters, and witness breathtaking limestone formations.",
      price: 2500,
      duration: "8-9 hours",
      maxGuests: 15,
      images: [tourImage1, galleryImage1, galleryImage2],
      inclusions: [
        "Hotel pickup and drop-off",
        "Licensed tour guide",
        "Lunch and snacks",
        "Snorkeling equipment",
        "Environmental fees",
        "Life jackets",
      ],
      highlights: [
        "Twin Lagoon kayaking",
        "Skeleton Wreck snorkeling",
        "CYC Beach lunch",
        "Sunset at Coral Garden",
      ],
      featured: true,
    },
    {
      id: "kayangan-lake",
      name: "Kayangan Lake Tour",
      slug: "kayangan-lake",
      shortDescription: "Visit the cleanest lake in the Philippines",
      description:
        "Kayangan Lake is consistently rated as one of the cleanest lakes in Asia. Climb to the iconic viewpoint and swim in the crystal-clear waters surrounded by dramatic limestone cliffs.",
      price: 2000,
      duration: "4-5 hours",
      maxGuests: 20,
      images: [tourImage2, tourImage1],
      inclusions: [
        "Round-trip boat transfer",
        "Tour guide",
        "Entrance fees",
        "Snorkeling gear",
        "Safety equipment",
      ],
      highlights: [
        "Iconic viewpoint photo op",
        "Swimming in crystal waters",
        "Limestone cave exploration",
        "Hidden lagoon visit",
      ],
      featured: true,
    },
    {
      id: "calauit-safari",
      name: "Calauit Safari Adventure",
      slug: "calauit-safari",
      shortDescription: "Wildlife sanctuary meets tropical paradise",
      description:
        "Experience a unique combination of African safari and tropical island paradise. Meet giraffes, zebras, and other exotic wildlife in their natural island habitat.",
      price: 3500,
      duration: "Full day",
      maxGuests: 12,
      images: [tourImage3, tourImage2],
      inclusions: [
        "Private boat transfer",
        "Safari guide",
        "Lunch",
        "Park entrance fees",
        "Wildlife feeding experience",
        "Photography assistance",
      ],
      highlights: [
        "Giraffe and zebra encounters",
        "Beach picnic lunch",
        "Bird watching",
        "Sunset island cruise",
      ],
      featured: true,
    },
    {
      id: "private-charter",
      name: "Private Island Charter",
      slug: "private-charter",
      shortDescription: "Customize your perfect island adventure",
      description:
        "Charter your own private boat and create a personalized itinerary. Perfect for families, groups, or special occasions. Visit the destinations you want at your own pace.",
      price: 15000,
      duration: "Flexible (8-10 hours)",
      maxGuests: 10,
      images: [tourImage4, galleryImage1],
      inclusions: [
        "Private luxury boat",
        "Dedicated crew and guide",
        "Customizable itinerary",
        "Lunch and refreshments",
        "Snorkeling equipment",
        "All entrance fees",
        "Photography service",
      ],
      highlights: [
        "Flexible schedule",
        "Exclusive destinations",
        "VIP treatment",
        "Perfect for celebrations",
      ],
      featured: true,
    },
  ];

  const displayTours = tours || staticTours;

  const getTourImage = (imageName: string) => {
    return imageMap[imageName] || tourImage1;
  };

  const handleBookNow = (tour: Tour) => {
    const message = encodeURIComponent(
      `Hi! I'd like to book the ${tour.name} (₱${tour.price} per person). Can you provide more details?`
    );
    window.open(`https://wa.me/63XXXXXXXXXX?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h1
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
            data-testid="text-tours-title"
          >
            Our Tours
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Discover the breathtaking beauty of Coron with our expertly curated island adventures
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground mt-4">Loading tours...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayTours.map((tour) => (
              <Card
                key={tour.id}
                className="overflow-hidden hover-elevate cursor-pointer"
                onClick={() => {
                  setSelectedTour(tour);
                  setCurrentImageIndex(0);
                }}
                data-testid={`card-tour-${tour.id}`}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={getTourImage(tour.images[0])}
                    alt={tour.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-[hsl(15,85%,65%)] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ₱{tour.price.toLocaleString()}
                  </div>
                  {tour.featured && (
                    <Badge className="absolute top-3 left-3 bg-[hsl(140,60%,45%)] text-white">
                      Popular
                    </Badge>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" data-testid={`text-tour-name-${tour.id}`}>
                    {tour.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {tour.shortDescription}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Max {tour.maxGuests}</span>
                    </div>
                  </div>
                  <div className="space-y-1 mb-4">
                    {tour.highlights.slice(0, 3).map((highlight, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs">
                        <Check className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    data-testid={`button-view-details-${tour.id}`}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          )}
        </div>
      </section>

      <Dialog open={!!selectedTour} onOpenChange={() => setSelectedTour(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedTour && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold" data-testid="text-modal-tour-name">
                  {selectedTour.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <img
                    src={getTourImage(selectedTour.images[currentImageIndex])}
                    alt={selectedTour.name}
                    className="w-full h-full object-cover"
                    data-testid="img-modal-tour"
                  />
                  {selectedTour.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedTour.images.map((_: any, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentImageIndex === index
                              ? "bg-white w-8"
                              : "bg-white/50"
                          }`}
                          data-testid={`button-gallery-dot-${index}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="font-semibold">{selectedTour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Max {selectedTour.maxGuests} guests</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    ₱{selectedTour.price.toLocaleString()}
                    <span className="text-sm font-normal text-muted-foreground"> / person</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-2">Description</h4>
                  <p className="text-foreground leading-relaxed">{selectedTour.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-3">Tour Highlights</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedTour.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-3">What's Included</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedTour.inclusions.map((inclusion: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[hsl(140,60%,45%)] mt-1 flex-shrink-0" />
                        <span className="text-sm">{inclusion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    className="flex-1 gap-2"
                    onClick={() => handleBookNow(selectedTour)}
                    data-testid="button-book-whatsapp"
                  >
                    <SiWhatsapp className="w-5 h-5" />
                    Book via WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTour(null)}
                    data-testid="button-close-modal"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

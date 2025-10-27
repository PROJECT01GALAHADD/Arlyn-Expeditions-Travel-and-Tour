import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Check, ChevronLeft, ChevronRight } from "lucide-react";
import type { Tour } from "@shared/schema";
import defaultImage from "@assets/generated_images/Coron_islands_aerial_hero_f326fa4c.png";

export default function Tours() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: tours, isLoading } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading tours...</p>
        </div>
      </div>
    );
  }

  const featuredTours = tours?.filter((tour) => tour.featured) || [];
  const regularTours = tours?.filter((tour) => !tour.featured) || [];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h1
              className="text-4xl md:text-6xl font-bold text-foreground mb-6"
              data-testid="text-tours-title"
            >
              Our Tours
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the breathtaking beauty of Coron, Palawan through our carefully curated island tours
            </p>
          </div>

          {featuredTours.length > 0 && (
            <>
              <h2 className="text-3xl font-bold mb-8">Featured Tours</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {featuredTours.map((tour) => (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    onSelect={setSelectedTour}
                  />
                ))}
              </div>
            </>
          )}

          {regularTours.length > 0 && (
            <>
              <h2 className="text-3xl font-bold mb-8">All Tours</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularTours.map((tour) => (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    onSelect={setSelectedTour}
                  />
                ))}
              </div>
            </>
          )}

          {(!tours || tours.length === 0) && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No tours available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!selectedTour} onOpenChange={(open) => {
        if (!open) {
          setSelectedTour(null);
          setCurrentImageIndex(0);
        }
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedTour && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl">{selectedTour.name}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="aspect-video rounded-lg overflow-hidden relative group">
                  <img
                    src={
                      selectedTour.images && selectedTour.images.length > 0
                        ? selectedTour.images[currentImageIndex]
                        : selectedTour.imageUrl || defaultImage
                    }
                    alt={selectedTour.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {selectedTour.images && selectedTour.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => 
                            prev === 0 ? selectedTour.images!.length - 1 : prev - 1
                          );
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        data-testid="button-prev-image"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => 
                            prev === selectedTour.images!.length - 1 ? 0 : prev + 1
                          );
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        data-testid="button-next-image"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedTour.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(idx);
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === currentImageIndex
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                            data-testid={`button-indicator-${idx}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedTour.time}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Users className="w-4 h-4" />
                    {selectedTour.type}
                  </Badge>
                  <Badge className="gap-1 bg-primary text-primary-foreground">
                    ₱{parseFloat(selectedTour.rate).toLocaleString()} per person
                  </Badge>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Destinations</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTour.destinations.split(';').map((dest, idx) => (
                      <Badge key={idx} variant="outline" className="gap-1">
                        <MapPin className="w-3 h-3" />
                        {dest.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Inclusions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedTour.inclusions.split(',').map((inclusion, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{inclusion.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href={`/booking?tourId=${selectedTour.id}`}>
                  <Button className="w-full" size="lg" data-testid="button-book-tour">
                    Book This Tour
                  </Button>
                </Link>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TourCard({
  tour,
  onSelect,
}: {
  tour: Tour;
  onSelect: (tour: Tour) => void;
}) {
  return (
    <Card
      className="overflow-hidden hover-elevate cursor-pointer"
      onClick={() => onSelect(tour)}
      data-testid={`card-tour-${tour.id}`}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={tour.imageUrl || defaultImage}
          alt={tour.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {tour.featured && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
          ₱{parseFloat(tour.rate).toLocaleString()}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2" data-testid={`text-tour-name-${tour.id}`}>
          {tour.name}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="gap-1">
            <Clock className="w-3 h-3" />
            {tour.time}
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Users className="w-3 h-3" />
            {tour.type}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {tour.destinations ? tour.destinations.split(';').slice(0, 3).join(', ') + '...' : 'Multiple destinations'}
        </p>

        <Button
          variant="outline"
          className="w-full"
          data-testid={`button-view-details-${tour.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(tour);
          }}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}
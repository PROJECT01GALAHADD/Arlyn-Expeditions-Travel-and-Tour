import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Mountain } from "lucide-react";
import type { Expedition } from "@shared/schema";
import expeditionImage from "@assets/generated_images/Coron_sunset_landscape_aec98c50.png";

export default function Expeditions() {
  const { data: expeditions, isLoading } = useQuery<Expedition[]>({
    queryKey: ["/api/expeditions"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading expeditions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h1
              className="text-4xl md:text-6xl font-bold text-foreground mb-6"
              data-testid="text-expeditions-title"
            >
              Adventure Expeditions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Embark on extraordinary journeys beyond the usual tours. Perfect for thrill-seekers and nature enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(expeditions || []).map((expedition) => (
              <Card
                key={expedition.id}
                className="overflow-hidden hover-elevate"
                data-testid={`card-expedition-${expedition.id}`}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={expedition.imageUrl || expeditionImage}
                    alt={expedition.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  {expedition.featured && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    ₱{parseFloat(expedition.rate).toLocaleString()}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3
                      className="text-xl font-bold mb-2"
                      data-testid={`text-expedition-name-${expedition.id}`}
                    >
                      {expedition.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {expedition.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-1">
                      <Clock className="w-3 h-3" />
                      {expedition.duration}
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <Mountain className="w-3 h-3" />
                      {expedition.difficulty}
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <Users className="w-3 h-3" />
                      Max {expedition.maxParticipants}
                    </Badge>
                  </div>

                  <Link href={`/booking?expeditionId=${expedition.id}`}>
                    <Button
                      variant="default"
                      className="w-full"
                      data-testid={`button-book-${expedition.id}`}
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {(!expeditions || expeditions.length === 0) && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No expeditions available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Expedition = {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: string;
  rate: string;
  maxParticipants: number;
  inclusions: string;
  featured: boolean;
};

export default function ExpeditionsPage() {
  const { data: expeditions, isLoading } = useQuery<Expedition[]>({
    queryKey: ["/api/expeditions"],
    queryFn: async () => {
      const response = await fetch("/api/expeditions");
      if (!response.ok) throw new Error("Failed to fetch expeditions");
      return response.json();
    },
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

  const featuredExpeditions = expeditions?.filter((exp) => exp.featured) || [];
  const regularExpeditions = expeditions?.filter((exp) => !exp.featured) || [];

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-[50vh] flex items-center justify-center mb-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/arlyn-expeditions-2.png)` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            Our Expeditions
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-lg">
            Embark on unforgettable adventures and create lasting memories in Coron
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          </div>

          {featuredExpeditions.length > 0 && (
            <>
              <h2 className="text-3xl font-bold mb-8">Featured Expeditions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {featuredExpeditions.map((expedition) => (
                  <ExpeditionCard key={expedition.id} expedition={expedition} />
                ))}
              </div>
            </>
          )}

          {regularExpeditions.length > 0 && (
            <>
              <h2 className="text-3xl font-bold mb-8">All Expeditions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularExpeditions.map((expedition) => (
                  <ExpeditionCard key={expedition.id} expedition={expedition} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function ExpeditionCard({ expedition }: { expedition: Expedition }) {
  return (
    <Card className="overflow-hidden hover-elevate">
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">{expedition.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {expedition.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{expedition.duration}</Badge>
          <Badge variant="outline">{expedition.difficulty}</Badge>
          <Badge className="bg-primary text-primary-foreground">
            ₱{parseFloat(expedition.rate).toLocaleString()}
          </Badge>
        </div>

        <Link href={`/booking?expeditionId=${expedition.id}`}>
          <Button className="w-full">Book This Expedition</Button>
        </Link>
      </div>
    </Card>
  );
}

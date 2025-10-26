import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Users, MapPin, Star } from "lucide-react";

export default async function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(/images/Arlyn-Expeditions-Logo_1761120970967.png)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl mb-6">
            Arlyn Expeditions Travel and Tours
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 font-normal drop-shadow-lg">
            Explore Paradise in Coron, Palawan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/tours">
              <Button size="lg" className="font-semibold tracking-wide uppercase text-base px-8">
                View Tours
              </Button>
            </Link>
            <Link href="/booking">
              <Button
                size="lg"
                variant="outline"
                className="font-semibold tracking-wide uppercase text-base px-8 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
              >
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose Arlyn Expeditions?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience Coron like never before with our expert-guided tours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Star className="w-12 h-12 text-primary" />,
                title: "Expert Guides",
                description: "Local knowledge and passion for Coron's beauty",
              },
              {
                icon: <MapPin className="w-12 h-12 text-primary" />,
                title: "Unique Destinations",
                description: "Discover hidden gems and pristine locations",
              },
              {
                icon: <Users className="w-12 h-12 text-primary" />,
                title: "Small Groups",
                description: "Personalized experience with intimate tours",
              },
              {
                icon: <Calendar className="w-12 h-12 text-primary" />,
                title: "Flexible Booking",
                description: "Easy online booking and customizable packages",
              },
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center hover-elevate">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Ready for an Adventure?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Book your dream island tour today and create unforgettable memories
            </p>
            <Link href="/tours">
              <Button size="lg" className="font-semibold tracking-wide uppercase">
                View All Tours
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

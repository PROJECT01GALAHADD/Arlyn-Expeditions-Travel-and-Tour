import { Card } from "@/components/ui/card";
import { Star, Users, Shield, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-[50vh] flex items-center justify-center mb-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/arlyn-expeditions-1.png)` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            About Arlyn Expeditions
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-lg">
            Your trusted partner for unforgettable island adventures in Coron, Palawan
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="max-w-3xl mx-auto mb-16">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Located in Barangay Poblacion 5, Coron, Palawan, Arlyn Expeditions Travel
                and Tour Services has been proudly serving travelers since our founding.
                Our passion for showcasing the natural beauty of Coron drives everything we do.
              </p>
              <p className="text-muted-foreground">
                From pristine lagoons to vibrant coral reefs, from thrilling wildlife encounters
                to peaceful sunset moments, we're dedicated to creating authentic experiences
                that connect you with the magic of the Philippines.
              </p>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Heart className="w-12 h-12 text-primary" />,
                  title: "Passion",
                  description:
                    "We love what we do and it shows in every tour we conduct",
                },
                {
                  icon: <Star className="w-12 h-12 text-primary" />,
                  title: "Excellence",
                  description: "Committed to delivering exceptional experiences every time",
                },
                {
                  icon: <Users className="w-12 h-12 text-primary" />,
                  title: "Local Expertise",
                  description:
                    "Deep knowledge of Coron from our experienced local guides",
                },
                {
                  icon: <Shield className="w-12 h-12 text-primary" />,
                  title: "Safety",
                  description: "Your safety is our top priority on every adventure",
                },
              ].map((value, index) => (
                <Card key={index} className="p-6 text-center hover-elevate">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Card } from "@/components/ui/card";
import { Heart, Award, Users, Shield } from "lucide-react";
import teamImage from "@assets/generated_images/Tour_guide_team_photo_24fded9b.png";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Passion for Paradise",
      description:
        "We're deeply passionate about Coron's natural beauty and committed to sharing it with the world while preserving it for future generations.",
    },
    {
      icon: Award,
      title: "Excellence & Quality",
      description:
        "Every tour is crafted with attention to detail, ensuring unforgettable experiences that exceed expectations.",
    },
    {
      icon: Users,
      title: "Local Expertise",
      description:
        "Our team of local guides brings authentic insights and stories that only true Palawan natives can share.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description:
        "Your safety is our top priority. All our tours follow strict safety protocols and our guides are certified professionals.",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h1
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
            data-testid="text-about-title"
          >
            About Arlyn Expeditions Travel and Tours
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Your trusted partner for unforgettable island adventures in Coron, Palawan
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-base text-foreground leading-relaxed">
                <p>
                  Arlyn Expeditions Travel and Tours was founded from a deep passion for showcasing the pristine 
                  islands of Coron, Palawan. Located at Real St., National Highway, Barangay Poblacion 5, in front 
                  of Cafe Socorro, we've been helping travelers discover the breathtaking beauty of our paradise 
                  for years.
                </p>
                <p>
                  What started as a dream to share Coron's hidden gems has grown into a trusted name in Palawan 
                  tourism. We specialize in creating authentic, personalized island-hopping adventures that showcase 
                  the best of Coron - from the world-famous Kayangan Lake to the pristine Twin Lagoons, and everything 
                  in between.
                </p>
                <p>
                  Every member of our team is a passionate local guide who knows these islands intimately. We don't 
                  just lead tours – we share our home, our stories, and our love for Palawan with you, creating 
                  unforgettable memories that last a lifetime. Your adventure is our mission.
                </p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src={teamImage}
                alt="Arlyn Expeditions Travel and Tours Team"
                className="w-full h-auto"
                data-testid="img-team-photo"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              To provide exceptional island tours that create lasting memories while promoting
              sustainable tourism and supporting the local community of Coron, Palawan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover-elevate" data-testid={`card-value-${index}`}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Meet Our Team
          </h2>
          <p className="text-lg text-foreground leading-relaxed mb-8">
            Our experienced local guides are the heart of Arlyn Expeditions Travel and Tours. Each team member brings
            unique knowledge of Coron's hidden gems, local culture, and marine ecosystems. They're
            not just guides – they're storytellers, safety experts, and passionate ambassadors of
            Palawan's natural wonders.
          </p>
          <p className="text-base text-muted-foreground">
            All our guides are certified, trained in first aid, and fluent in English. They're
            dedicated to ensuring your safety while creating unforgettable experiences.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us on an Adventure
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Experience the magic of Coron with guides who call it home
          </p>
          <a href="/tours">
            <button className="bg-white text-primary font-semibold px-8 py-3 rounded-md hover:bg-white/90 transition-colors" data-testid="button-explore-tours">
              Explore Our Tours
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}

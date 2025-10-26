import { Globe, Shield, Headphones, Award } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Global Network",
    description: "Access to 150+ destinations worldwide with local expertise and authentic experiences",
  },
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Protected payments and comprehensive travel insurance for complete peace of mind",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer service to assist you before, during, and after your trip",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "Competitive pricing with our best price guarantee and flexible payment options",
  },
]

export function WhyChooseUs() {
  return (
    <section id="about" className="py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-balance">
            Why Choose <span className="font-semibold">Wanderlust</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            We're committed to making your travel dreams a reality with exceptional service and unforgettable
            experiences
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-2">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

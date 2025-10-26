import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight } from "lucide-react"

const destinations = [
  {
    name: "Santorini",
    country: "Greece",
    image: "/santorini-sunset.png",
    description: "Iconic white-washed buildings and stunning sunsets",
    price: "From $2,499",
  },
  {
    name: "Bali",
    country: "Indonesia",
    image: "/bali-indonesia-rice-terraces-tropical-paradise.jpg",
    description: "Tropical paradise with ancient temples and beaches",
    price: "From $1,899",
  },
  {
    name: "Kyoto",
    country: "Japan",
    image: "/kyoto-japan-traditional-temples-cherry-blossoms.jpg",
    description: "Ancient temples and traditional Japanese culture",
    price: "From $2,799",
  },
  {
    name: "Maldives",
    country: "Indian Ocean",
    image: "/maldives-overwater-bungalows-crystal-clear-water.jpg",
    description: "Overwater villas and pristine coral reefs",
    price: "From $3,499",
  },
  {
    name: "Iceland",
    country: "Nordic",
    image: "/iceland-northern-lights-waterfalls-dramatic-landsc.jpg",
    description: "Northern lights and dramatic volcanic landscapes",
    price: "From $2,999",
  },
  {
    name: "Dubai",
    country: "UAE",
    image: "/dubai-modern-skyline-luxury-desert.jpg",
    description: "Modern luxury meets Arabian desert adventures",
    price: "From $2,299",
  },
]

export function FeaturedDestinations() {
  return (
    <section id="destinations" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-balance">
            Featured <span className="font-semibold">Destinations</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Handpicked destinations that offer unforgettable experiences and breathtaking beauty
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 bg-card hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

                {/* Location Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium">{destination.country}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{destination.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{destination.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm font-semibold text-primary">{destination.price}</span>
                  <Button variant="ghost" size="sm" className="group/btn text-foreground hover:text-primary">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" className="rounded-full px-8 border-2 bg-transparent">
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  )
}

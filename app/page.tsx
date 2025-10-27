import { Newsletter } from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tour, tours } from "@/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { Calendar, ChevronDown, MapPin, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Opt out of static prerendering to avoid database connections during build
export const dynamic = "force-dynamic";

export default async function Home() {
	let featuredTours: Tour[] = [];
	if (process.env.DATABASE_URL) {
		try {
			featuredTours = await db
				.select()
				.from(tours)
				.where(eq(tours.featured, true))
				.limit(3);
		} catch (error) {
			console.error("Error loading featured tours:", error);
			featuredTours = [];
		}
	}

	return (
		<div className="min-h-screen">
			<section className="relative h-screen flex items-center justify-center">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: `url(/images/arlyn-expeditions-3.png)` }}
				>
					<div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
				</div>

				<div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
					<div className="flex flex-col items-center mb-6">
						<Image
							src="/images/Arlyn-Expeditions-Logo_1761120970967.png"
							alt="Arlyn Expeditions Travel and Tour"
							width={192}
							height={192}
							className="mb-4 drop-shadow-2xl"
							priority
						/>
						<h1
							className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl"
							data-testid="text-hero-title"
						>
							Arlyn Expeditions Travel and Tours
						</h1>
					</div>
					<p
						className="text-xl md:text-2xl text-white mb-8 font-normal drop-shadow-lg"
						data-testid="text-hero-tagline"
					>
						Explore Paradise with Arlyn Expeditions
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Link href="/booking">
							<Button
								size="lg"
								className="font-semibold tracking-wide uppercase text-base px-8"
								data-testid="button-hero-book-now"
							>
								Book Now
							</Button>
						</Link>
						<Link href="/contact">
							<Button
								size="lg"
								variant="outline"
								className="font-semibold tracking-wide uppercase text-base px-8 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary"
								data-testid="button-hero-contact"
							>
								Contact Us
							</Button>
						</Link>
					</div>
				</div>

				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
					<ChevronDown className="w-8 h-8 text-white drop-shadow-lg" />
				</div>
			</section>

			<section className="py-16 md:py-24 bg-background">
				<div className="max-w-7xl mx-auto px-4 md:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
							Why Choose Arlyn Expeditions?
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Experience the best of Coron with our expert guides and
							unforgettable adventures
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						{[
							{
								icon: Star,
								title: "Expert Guides",
								description: "Local knowledge and expertise",
							},
							{
								icon: Calendar,
								title: "Flexible Booking",
								description: "Easy scheduling and planning",
							},
							{
								icon: Users,
								title: "Small Groups",
								description: "Personalized experiences",
							},
							{
								icon: MapPin,
								title: "Best Locations",
								description: "Hidden gems and popular spots",
							},
						].map((feature, index) => (
							<Card key={index} className="p-6 text-center hover-elevate">
								<feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
								<h3 className="text-xl font-bold mb-2">{feature.title}</h3>
								<p className="text-sm text-muted-foreground">
									{feature.description}
								</p>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section className="py-16 md:py-24 bg-card">
				<div className="max-w-7xl mx-auto px-4 md:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
							Featured Tours
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Discover our most popular island adventures
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{featuredTours.map((tour) => (
							<Card
								key={tour.id}
								className="overflow-hidden hover-elevate"
								data-testid={`card-tour-${tour.id}`}
							>
								<div className="aspect-[4/3] relative overflow-hidden">
									<Image
										src={
											tour.imageUrl ||
											"/images/kayangan_lake_coron__f84db1ad.jpg"
										}
										alt={tour.name}
										fill
										className="object-cover transition-transform duration-300 hover:scale-110"
									/>
									<div className="absolute top-3 right-3 bg-[hsl(15,85%,65%)] text-white px-3 py-1 rounded-full text-sm font-semibold">
										₱{parseFloat(tour.rate).toLocaleString()}
									</div>
								</div>
								<div className="p-6">
									<h3
										className="text-xl font-bold mb-2"
										data-testid={`text-tour-name-${tour.id}`}
									>
										{tour.name}
									</h3>
									<p className="text-sm text-muted-foreground mb-4">
										{tour.time}
									</p>
									<Link href="/tours">
										<Button
											variant="outline"
											className="w-full"
											data-testid={`button-view-details-${tour.id}`}
										>
											View Details
										</Button>
									</Link>
								</div>
							</Card>
						))}
					</div>

					<div className="text-center mt-12">
						<Link href="/tours">
							<Button size="lg" data-testid="button-view-all-tours">
								View All Tours
							</Button>
						</Link>
					</div>
				</div>
			</section>

			<section className="py-16 md:py-24 bg-primary text-white">
				<div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
					<h2 className="text-3xl md:text-5xl font-bold mb-6">
						Ready for Your Next Adventure?
					</h2>
					<p className="text-xl mb-8 opacity-90">
						Book your Coron island tour today and create unforgettable memories
					</p>
					<Link href="/booking">
						<Button
							size="lg"
							variant="secondary"
							className="font-semibold tracking-wide uppercase text-base px-8"
							data-testid="button-cta-book-now"
						>
							Book Your Tour Now
						</Button>
					</Link>
				</div>
			</section>

			<Newsletter />
		</div>
	);
}

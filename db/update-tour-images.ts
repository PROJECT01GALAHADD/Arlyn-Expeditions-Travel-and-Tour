import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { eq } from "drizzle-orm";
import { db } from "../lib/db.js";
import { tours } from "./schema.js";

// Destination keyword mapping → image path (strictly matches tour destinations)
const destinationImageMap: Array<{ keywords: string[]; image: string }> = [
	{
		keywords: ["kayangan lake", "kayangan"],
		image: "/images/kayangan-lake-boats.png",
	},
	{
		keywords: ["twin lagoon", "twin lagoons"],
		image: "/images/twin_lagoon_coron_pa_e9e1954c.jpg",
	},
	{
		keywords: ["barracuda lake", "barracuda"],
		image: "/images/barracuda_lake_coron_d0887624.jpg",
	},
	{
		keywords: ["siete pecados", "siete"],
		image: "/images/siete_pecados_marine_7c4cd2af.jpg",
	},
	{
		keywords: ["coral garden", "coral"],
		image: "/images/coral_garden_reef_sn_2dea9479.jpg",
	},
	{
		keywords: ["shipwreck", "wreck", "skeleton"],
		image: "/images/coron_shipwreck_unde_d2841811.jpg",
	},
	{
		keywords: ["malcapuya"],
		image: "/images/malcapuya_island_cor_e89c7dcb.jpg",
	},
	{
		keywords: ["banana island"],
		image: "/images/banana_island_coron__d224e4e3.jpg",
	},
	{
		keywords: ["mount tapyas", "tapyas"],
		image: "/images/mount_tapyas_coron_p_8373785f.jpg",
	},
	{ keywords: ["firefly"], image: "/images/fireflies_night_glow_c9a375dd.jpg" },
	{ keywords: ["dugong"], image: "/images/dugong_sea_cow_under_240aa9a0.jpg" },
	{
		keywords: ["cave", "pukaway"],
		image: "/images/limestone_cave_stala_d46149d6.jpg",
	},
];

function buildImagesFromDestinations(destinations: string): string[] {
	if (!destinations) return [];
	const text = destinations.toLowerCase();
	const images = new Set<string>();

	for (const entry of destinationImageMap) {
		for (const key of entry.keywords) {
			if (text.includes(key)) {
				images.add(entry.image);
				break;
			}
		}
	}

	return Array.from(images);
}

async function updateTourImages() {
	console.log("🖼️  Updating tour images...");

	const allTours = await db.select().from(tours);

	// Explicit preview overrides to avoid duplicate previews between similar destination sets
	const previewOverride: Record<string, string> = {
		// Ensure Super Ultimate preview differs from Tour A
		"super ultimate tour": "/images/skeleton-wreck.png",
		// Keep Tour A as Kayangan Lake for recognizability
		"coron island tour a": "/images/kayangan-lake-boats.png",
	};

	for (const tour of allTours) {
		const gallery = buildImagesFromDestinations(tour.destinations);
		const nameKey = tour.name.toLowerCase().trim();
		const override = previewOverride[nameKey];
		const preview = override || gallery[0] || "/images/placeholder.jpg";
		const finalGallery = gallery.length
			? gallery.includes(preview)
				? gallery
				: [preview, ...gallery]
			: [preview];

		await db
			.update(tours)
			.set({
				imageUrl: preview,
				images: finalGallery,
			})
			.where(eq(tours.id, tour.id));

		console.log(
			`✓ ${tour.name}: set preview=${preview} gallery=${finalGallery.join(", ")}`,
		);
	}

	console.log("🎉 Tour images updated successfully!");
	process.exit(0);
}

updateTourImages().catch((error) => {
	console.error("Error updating tour images:", error);
	process.exit(1);
});

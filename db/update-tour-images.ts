import { db } from "../lib/db.js";
import { tours } from "./schema.js";
import { eq } from "drizzle-orm";

// Mapping of tour names to their images based on main destinations
const tourImageMap: Record<string, { imageUrl: string; images?: string[] }> = {
  "Coron Island Tour A": {
    imageUrl: "/images/kayangan_lake_coron__f84db1ad.jpg",
    images: [
      "/images/kayangan_lake_coron__f84db1ad.jpg",
      "/images/coral_garden_reef_sn_2dea9479.jpg",
    ],
  },
  "Coron Island Tour B": {
    imageUrl: "/images/barracuda_lake_coron_d0887624.jpg",
    images: [
      "/images/barracuda_lake_coron_d0887624.jpg",
      "/images/twin_lagoon_coron_pa_e9e1954c.jpg",
      "/images/coron_shipwreck_unde_d2841811.jpg",
    ],
  },
  "Coron Ultimate Tour": {
    imageUrl: "/images/kayangan_lake_coron__f84db1ad.jpg",
    images: [
      "/images/kayangan_lake_coron__f84db1ad.jpg",
      "/images/twin_lagoon_coron_pa_e9e1954c.jpg",
      "/images/siete_pecados_marine_7c4cd2af.jpg",
    ],
  },
  "Super Ultimate Tour": {
    imageUrl: "/images/twin_lagoon_coron_pa_e9e1954c.jpg",
    images: [
      "/images/kayangan_lake_coron__f84db1ad.jpg",
      "/images/twin_lagoon_coron_pa_e9e1954c.jpg",
      "/images/barracuda_lake_coron_d0887624.jpg",
      "/images/siete_pecados_marine_7c4cd2af.jpg",
    ],
  },
  "Island Escapade Tour": {
    imageUrl: "/images/malcapuya_island_cor_e89c7dcb.jpg",
    images: [
      "/images/malcapuya_island_cor_e89c7dcb.jpg",
      "/images/banana_island_coron__d224e4e3.jpg",
    ],
  },
  "Island Escapade Beach Tour C-1": {
    imageUrl: "/images/malcapuya_island_cor_e89c7dcb.jpg",
    images: ["/images/malcapuya_island_cor_e89c7dcb.jpg"],
  },
  "Calauit Safari Tour": {
    imageUrl: "/images/calauit-safari-tour-1_1761461061863.jpg",
    images: [
      "/images/calauit-safari-tour-1_1761461061863.jpg",
      "/images/calauit-safari-tour-2_1761461061865.jpg",
      "/images/calauit-safari-tour-3_1761461061871.jpg",
    ],
  },
  "Reef & Wrecks Tour": {
    imageUrl: "/images/coron_shipwreck_unde_d2841811.jpg",
    images: [
      "/images/coron_shipwreck_unde_d2841811.jpg",
      "/images/coral_garden_reef_sn_2dea9479.jpg",
    ],
  },
  "Coron Town Tour": {
    imageUrl: "/images/mount_tapyas_coron_p_8373785f.jpg",
    images: ["/images/mount_tapyas_coron_p_8373785f.jpg"],
  },
  "Dugong Tours": {
    imageUrl: "/images/dugong_sea_cow_under_240aa9a0.jpg",
    images: [
      "/images/dugong_sea_cow_under_240aa9a0.jpg",
      "/images/coral_garden_reef_sn_2dea9479.jpg",
    ],
  },
  "Pukaway Cave Tour": {
    imageUrl: "/images/limestone_cave_stala_d46149d6.jpg",
    images: [
      "/images/limestone_cave_stala_d46149d6.jpg",
      "/images/coral_garden_reef_sn_2dea9479.jpg",
    ],
  },
  "Pukaway Cave Tour (Private)": {
    imageUrl: "/images/limestone_cave_stala_d46149d6.jpg",
    images: [
      "/images/limestone_cave_stala_d46149d6.jpg",
      "/images/coral_garden_reef_sn_2dea9479.jpg",
    ],
  },
  "Firefly Watching Tour": {
    imageUrl: "/images/fireflies_night_glow_c9a375dd.jpg",
    images: ["/images/fireflies_night_glow_c9a375dd.jpg"],
  },
  "Firefly Watching Tour (Private)": {
    imageUrl: "/images/fireflies_night_glow_c9a375dd.jpg",
    images: ["/images/fireflies_night_glow_c9a375dd.jpg"],
  },
};

async function updateTourImages() {
  console.log("🖼️  Updating tour images...");

  const allTours = await db.select().from(tours);

  for (const tour of allTours) {
    const imageData = tourImageMap[tour.name];

    if (imageData) {
      await db
        .update(tours)
        .set({
          imageUrl: imageData.imageUrl,
          images: imageData.images || [imageData.imageUrl],
        })
        .where(eq(tours.id, tour.id));

      console.log(`✓ Updated images for: ${tour.name}`);
    } else {
      console.log(`⚠ No image mapping for: ${tour.name}`);
    }
  }

  console.log("🎉 Tour images updated successfully!");
  process.exit(0);
}

updateTourImages().catch((error) => {
  console.error("Error updating tour images:", error);
  process.exit(1);
});

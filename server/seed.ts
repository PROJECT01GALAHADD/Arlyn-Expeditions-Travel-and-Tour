import { db } from "./db";
import { tours, expeditions, tourOperators } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import * as fs from "fs/promises";
import * as path from "path";

async function parseTourCSV() {
  const csvPath = path.join(process.cwd(), "attached_assets", "Pasted-Tour-Name-Time-Rate-PAX-Type-Destinations-Activities-Inclusions-Coron-Island-Tour-A-8AM-5PM--1761459291930_1761459291931.txt");
  const csvContent = await fs.readFile(csvPath, "utf-8");
  
  const lines = csvContent.trim().split('\n');
  const header = lines[0];
  const dataLines = lines.slice(1);
  
  const tourData = dataLines.map((line, index) => {
    const parts: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        parts.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    parts.push(current.trim());
    
    const [name, time, rateStr, type, destinations, inclusions] = parts;
    
    return {
      name: name || `Tour ${index + 1}`,
      time: time || "8AM - 5PM",
      rate: rateStr || "1000",
      type: type || "Joiners",
      destinations: destinations || "",
      inclusions: inclusions || "",
      featured: index < 4,
    };
  });
  
  return tourData;
}

const expeditionData = [
  {
    name: "Multi-Day Island Expedition",
    description: "Embark on an unforgettable 3-day, 2-night adventure exploring the remote islands of Coron. Camp under the stars, snorkel pristine reefs, and discover hidden beaches accessible only by boat.",
    duration: "3 Days, 2 Nights",
    difficulty: "Moderate",
    rate: "12000",
    maxParticipants: 12,
    inclusions: "Camping equipment, All meals, Professional guide, Boat transfers, Snorkeling gear, Safety equipment",
    featured: true,
  },
  {
    name: "Mount Tapyas Sunrise Trek",
    description: "Start your day with a challenging pre-dawn hike to the summit of Mount Tapyas. Watch the spectacular sunrise over Coron Bay and enjoy panoramic views of the surrounding islands.",
    duration: "4 hours",
    difficulty: "Moderate",
    rate: "800",
    maxParticipants: 15,
    inclusions: "Tour guide, Breakfast at summit, Hotel pickup, Safety equipment",
    featured: true,
  },
  {
    name: "Coron Bay Kayaking Expedition",
    description: "Paddle through the crystal-clear waters of Coron Bay, exploring hidden lagoons, limestone cliffs, and secluded beaches. Perfect for adventure seekers who want to experience Coron's beauty at their own pace.",
    duration: "Full Day (8 hours)",
    difficulty: "Moderate to Challenging",
    rate: "3500",
    maxParticipants: 10,
    inclusions: "Kayak equipment, Lunch on beach, Professional guide, Snorkeling gear, Safety equipment",
    featured: true,
  },
  {
    name: "Wreck Diving Expedition",
    description: "Explore Coron's famous WWII Japanese shipwrecks on this advanced diving expedition. Visit multiple wreck sites including the Irako, Kogyo Maru, and Olympia Maru.",
    duration: "2 Days",
    difficulty: "Advanced (Diving certification required)",
    rate: "15000",
    maxParticipants: 6,
    inclusions: "Diving equipment, 6 dives, Accommodation, All meals, Dive master, Boat transfers",
    featured: true,
  },
  {
    name: "Tribal Village & Cultural Immersion",
    description: "Experience authentic Filipino culture with a visit to the indigenous Tagbanua communities. Learn traditional fishing methods, participate in cultural activities, and enjoy a traditional meal.",
    duration: "Full Day",
    difficulty: "Easy",
    rate: "2800",
    maxParticipants: 12,
    inclusions: "Cultural guide, Traditional lunch, Hotel pickup, Donation to community, Handicraft demonstration",
    featured: false,
  },
];

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    const existingOperator = await db.select().from(tourOperators).where(eq(tourOperators.username, "operator")).limit(1);
    
    if (existingOperator.length === 0) {
      console.log("Creating default tour operator account...");
      const hashedPassword = await bcrypt.hash("operator123", 10);
      await db.insert(tourOperators).values({
        username: "operator",
        password: hashedPassword,
        name: "Arlyn Expeditions",
        email: "operator@arlynexpeditions.com",
        phone: "+63 912 345 6789",
        isActive: true,
      });
      console.log("✅ Tour operator account created (username: operator, password: operator123)");
    } else {
      console.log("✓ Tour operator account already exists");
    }

    const existingTours = await db.select().from(tours).limit(1);
    
    if (existingTours.length === 0) {
      console.log("Parsing CSV file and inserting tours...");
      const tourData = await parseTourCSV();
      await db.insert(tours).values(tourData);
      console.log(`✅ Inserted ${tourData.length} tours from CSV`);
    } else {
      console.log("✓ Tours already exist in database");
    }

    const existingExpeditions = await db.select().from(expeditions).limit(1);
    
    if (existingExpeditions.length === 0) {
      console.log("Inserting expeditions...");
      await db.insert(expeditions).values(expeditionData);
      console.log(`✅ Inserted ${expeditionData.length} expeditions`);
    } else {
      console.log("✓ Expeditions already exist in database");
    }

    console.log("🎉 Database seeding complete!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();

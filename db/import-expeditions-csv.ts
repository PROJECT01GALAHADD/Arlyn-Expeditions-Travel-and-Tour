import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { db } from "../lib/db.js";
import { expeditions } from "./schema.js";
import { eq } from "drizzle-orm";
import fs from "node:fs";
import path from "node:path";

type CsvRow = Record<string, string>;

// Minimal CSV parser supporting quotes and commas
function parseCSV(content: string): CsvRow[] {
  const rows: string[][] = [];
  let current: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  while (i < content.length) {
    const ch = content[i];
    if (ch === '"') {
      if (inQuotes && content[i + 1] === '"') {
        field += '"';
        i += 2;
        continue;
      }
      inQuotes = !inQuotes;
      i++;
      continue;
    }
    if (!inQuotes && ch === ",") {
      current.push(field.trim());
      field = "";
      i++;
      continue;
    }
    if (!inQuotes && (ch === "\n" || ch === "\r")) {
      // handle CRLF and LF
      if (ch === "\r" && content[i + 1] === "\n") i++;
      current.push(field.trim());
      rows.push(current);
      current = [];
      field = "";
      i++;
      continue;
    }
    field += ch;
    i++;
  }
  // push last line
  if (field.length > 0 || current.length > 0) {
    current.push(field.trim());
    rows.push(current);
  }
  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).filter((r) => r.length > 0 && r.some((v) => v && v.length)).map((cols) => {
    const row: CsvRow = {};
    headers.forEach((h, idx) => {
      row[h] = (cols[idx] ?? "").trim();
    });
    return row;
  });
}

function toBool(value: string | undefined): boolean {
  if (!value) return false;
  const v = value.toLowerCase();
  return v === "true" || v === "1" || v === "yes" || v === "y";
}

async function importExpeditions(csvPath: string) {
  const absPath = path.resolve(csvPath);
  console.log(`📦 Importing expeditions from ${absPath} ...`);
  const content = fs.readFileSync(absPath, "utf8");
  const rows = parseCSV(content);
  if (rows.length === 0) {
    console.log("No rows parsed from CSV. Ensure headers are present.");
    process.exit(1);
  }

  let inserted = 0;
  for (const r of rows) {
    const name = r["name"] ?? r["Name"] ?? "";
    if (!name) {
      console.warn("Skipping row without name.");
      continue;
    }

    const existing = await db.select().from(expeditions).where(eq(expeditions.name, name));
    if (Array.isArray(existing) && existing.length > 0) {
      console.log(`• Skipping existing expedition: ${name}`);
      continue;
    }

    const rateStr = r["rate"] ?? r["Rate"] ?? "0";
    const maxStr = r["maxParticipants"] ?? r["MaxParticipants"] ?? r["Max Participants"] ?? "0";

    await db.insert(expeditions).values({
      name,
      description: r["description"] ?? r["Description"] ?? "",
      duration: r["duration"] ?? r["Duration"] ?? "",
      difficulty: r["difficulty"] ?? r["Difficulty"] ?? "",
      rate: rateStr,
      maxParticipants: parseInt(maxStr || "0", 10) || 0,
      inclusions: r["inclusions"] ?? r["Inclusions"] ?? "",
      imageUrl: r["imageUrl"] ?? r["ImageUrl"] ?? r["image_url"] ?? "",
      featured: toBool(r["featured"] ?? r["Featured"]),
    });
    inserted++;
    console.log(`✓ Inserted expedition: ${name}`);
  }

  console.log(`🎉 Import complete. ${inserted} expeditions inserted.`);
}

const csvArg = process.argv[2];
if (!csvArg) {
  console.error("Usage: npx tsx db/import-expeditions-csv.ts <path/to/expeditions.csv>");
  process.exit(1);
}

importExpeditions(csvArg).catch((err) => {
  console.error("Error importing expeditions:", err);
  process.exit(1);
});

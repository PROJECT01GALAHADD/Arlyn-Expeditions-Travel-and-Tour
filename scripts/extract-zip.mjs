import path from "path";
import { fileURLToPath } from "url";
import AdmZip from "adm-zip";
import fs from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const zipsDir = path.join(repoRoot, "external_imports", "zips");
const extractedDir = path.join(repoRoot, "external_imports", "extracted");

async function listZipFiles() {
	try {
		const files = await fs.readdir(zipsDir);
		return files.filter((f) => f.toLowerCase().endsWith(".zip"));
	} catch (err) {
		return [];
	}
}

async function extractZip(zipName) {
	const zipPath = path.isAbsolute(zipName)
		? zipName
		: path.join(zipsDir, zipName);
	const base = path.basename(zipPath).replace(/\.zip$/i, "");
	const dest = path.join(extractedDir, base);
	await fs.mkdir(dest, { recursive: true });

	console.log(`Extracting ${zipPath} -> ${dest}`);
	const zip = new AdmZip(zipPath);
	zip.extractAllTo(dest, true);
	console.log(`✓ Extracted to ${dest}`);
}

async function main() {
	await fs.mkdir(zipsDir, { recursive: true });
	await fs.mkdir(extractedDir, { recursive: true });

	const arg = process.argv[2];
	if (!arg) {
		console.log("Usage: node scripts/extract-zip.mjs <zip-file-name>|--all");
		const zips = await listZipFiles();
		if (zips.length) {
			console.log("Available zips in external_imports/zips:");
			zips.forEach((z) => console.log(" -", z));
		} else {
			console.log("(No zip files found in external_imports/zips)");
		}
		process.exit(1);
	}

	if (arg === "--all") {
		const zips = await listZipFiles();
		if (!zips.length) {
			console.log("No zip files found to extract.");
			return;
		}
		for (const z of zips) {
			await extractZip(z);
		}
		return;
	}

	await extractZip(arg);
}

main().catch((err) => {
	console.error("Extraction failed:", err);
	process.exit(1);
});

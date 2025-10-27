import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const manifestPath = path.join(repoRoot, "external_imports", "manifest.json");

async function readManifest() {
	try {
		const raw = await fs.readFile(manifestPath, "utf8");
		const json = JSON.parse(raw);
		if (!json.sourceRoot || !Array.isArray(json.items)) {
			throw new Error("Manifest must include sourceRoot and items[]");
		}
		return json;
	} catch (err) {
		throw new Error(`Failed to read manifest: ${err.message}`);
	}
}

async function ensureDir(dir) {
	await fs.mkdir(dir, { recursive: true });
}

async function exists(p) {
	try {
		await fs.access(p);
		return true;
	} catch {
		return false;
	}
}

async function copyItem({ from, to, overwrite }, sourceRoot, opts) {
	const fromAbs = path.isAbsolute(from)
		? from
		: path.join(repoRoot, sourceRoot, from);
	const toAbs = path.isAbsolute(to) ? to : path.join(repoRoot, to);

	const effectiveOverwrite =
		typeof overwrite === "boolean" ? overwrite : !!opts.overwrite;

	if (!(await exists(fromAbs))) {
		console.warn(`Skipping: source not found -> ${fromAbs}`);
		return {
			skipped: true,
			reason: "missing-source",
			from: fromAbs,
			to: toAbs,
		};
	}

	await ensureDir(path.dirname(toAbs));

	if (opts.dry) {
		console.log(
			`[DRY] Copy ${fromAbs} -> ${toAbs} overwrite=${effectiveOverwrite}`,
		);
		return { dry: true, from: fromAbs, to: toAbs };
	}

	// fs.cp handles files and directories recursively.
	await fs.cp(fromAbs, toAbs, { recursive: true, force: effectiveOverwrite });
	console.log(
		`✓ Copied ${fromAbs} -> ${toAbs}${effectiveOverwrite ? " (overwrote existing)" : ""}`,
	);
	return { copied: true, from: fromAbs, to: toAbs };
}

async function main() {
	const args = new Set(process.argv.slice(2));
	const dry = args.has("--dry");
	const overwriteFlag = args.has("--overwrite");

	const manifest = await readManifest();
	const sourceRootRel = manifest.sourceRoot;
	const sourceRootAbs = path.isAbsolute(sourceRootRel)
		? sourceRootRel
		: path.join(repoRoot, sourceRootRel);

	if (!(await exists(sourceRootAbs))) {
		throw new Error(`sourceRoot not found: ${sourceRootAbs}`);
	}

	if (!manifest.items.length) {
		console.log(
			"No items in manifest to import. Edit external_imports/manifest.json.",
		);
		console.log(
			'Example item: { "from": "components/ui", "to": "components/ui", "overwrite": false }',
		);
		return;
	}

	console.log(
		`Importing ${manifest.items.length} item(s) from ${sourceRootAbs}`,
	);
	for (const item of manifest.items) {
		await copyItem(item, sourceRootRel, { dry, overwrite: overwriteFlag });
	}
}

main().catch((err) => {
	console.error("Import failed:", err);
	process.exit(1);
});

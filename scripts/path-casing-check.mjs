import fs from "fs";
import path from "path";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

const IGNORED_DIRS = new Set([
    "node_modules",
    ".next",
    "public",
    "external_imports",
]);

const FILE_EXTS = new Set([".ts", ".tsx", ".js", ".jsx"]);

function walk(dir, out = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (IGNORED_DIRS.has(entry.name)) continue;
            walk(full, out);
        } else if (FILE_EXTS.has(path.extname(entry.name))) {
            out.push(full);
        }
    }
    return out;
}

const IMPORT_RE = /from\s+["']@\/([^"']+)["']/g;

// Aliases we care about and their root directories
const ALIASES = new Set(["lib", "hooks", "components", "components/ui"]);

function tryResolveExact(spec) {
    // Convert the alias import to a repo path
    const relPath = spec; // spec like 'components/Footer' or 'lib/utils'
    const absBase = path.join(repoRoot, relPath);

    // If spec points to a directory, check index.*
    if (fs.existsSync(absBase) && fs.statSync(absBase).isDirectory()) {
        for (const ext of FILE_EXTS) {
            const idx = path.join(absBase, `index${ext}`);
            if (fs.existsSync(idx)) return { found: true, path: idx };
        }
        return { found: false };
    }

    // Try file with known extensions
    for (const ext of FILE_EXTS) {
        const abs = absBase + ext;
        if (fs.existsSync(abs)) return { found: true, path: abs };
    }
    return { found: false };
}

function findCaseInsensitive(spec) {
    // Look for case-insensitive match on the final segment within its parent dir
    const relPath = spec;
    const parent = path.dirname(path.join(repoRoot, relPath));
    const leaf = path.basename(relPath);
    if (!fs.existsSync(parent)) return null;
    const entries = fs.readdirSync(parent, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.name.toLowerCase() === leaf.toLowerCase()) {
            // Match found; construct candidate file path(s)
            const candidateBase = path.join(parent, entry.name);
            if (entry.isDirectory()) {
                for (const ext of FILE_EXTS) {
                    const idx = path.join(candidateBase, `index${ext}`);
                    if (fs.existsSync(idx)) return idx;
                }
            } else {
                for (const ext of FILE_EXTS) {
                    const file = candidateBase.endsWith(ext)
                        ? candidateBase
                        : candidateBase + ext;
                    if (fs.existsSync(file)) return file;
                }
            }
            // Even if not found with ext, return base to signal mismatch
            return candidateBase;
        }
    }
    return null;
}

function checkFile(file) {
    const content = fs.readFileSync(file, "utf8");
    const findings = [];
    let match;
    while ((match = IMPORT_RE.exec(content)) !== null) {
        const fullSpec = match[1]; // e.g., 'components/footer'
        // Only check our known aliases
        const aliasRoot = fullSpec.split("/")[0];
        if (!ALIASES.has(aliasRoot) && !ALIASES.has(fullSpec.split("/").slice(0, 2).join("/"))) {
            continue;
        }

        // Detect uppercase segments after alias (existing rule)
        const afterAlias = fullSpec.replace(/^(components|components\/ui|lib|hooks)\//, "");
        if (/[A-Z]/.test(afterAlias)) {
            findings.push({ file, line: lineOf(content, match.index), import: match[0], reason: "uppercase-segment" });
            continue;
        }

        // Robust check: verify on-disk exact match; if not, look for case-insensitive match
        const exact = tryResolveExact(fullSpec);
        if (!exact.found) {
            const ci = findCaseInsensitive(fullSpec);
            if (ci) {
                findings.push({
                    file,
                    line: lineOf(content, match.index),
                    import: match[0],
                    reason: "case-mismatch",
                    suggestion: ci.replace(repoRoot + path.sep, ""),
                });
            }
        }
    }
    return findings;
}

function lineOf(text, index) {
    // Rough line number calc: count newlines before index
    let line = 1;
    for (let i = 0; i < index; i++) {
        if (text.charCodeAt(i) === 10) line++;
    }
    return line;
}

const files = walk(repoRoot);
const allFindings = [];
for (const f of files) {
    const fnd = checkFile(f);
    if (fnd.length) allFindings.push(...fnd);
}

if (allFindings.length) {
    console.error("Found import path casing issues under '@/components', '@/lib', or '@/hooks':");
    for (const f of allFindings) {
        const loc = `${path.relative(repoRoot, f.file)}:${f.line}`;
        if (f.reason === "case-mismatch" && f.suggestion) {
            console.error(`- ${loc} -> ${f.import} (did you mean '@/${f.suggestion}'?)`);
        } else {
            console.error(`- ${loc} -> ${f.import}`);
        }
    }
    console.error("Please match on-disk filename casing exactly (e.g., '@/components/Footer') or use consistent lowercase for folders like '@/lib/utils'.");
    process.exit(1);
} else {
    console.log("✓ Path casing check passed: no mixed-case alias imports detected.");
}

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

const IMPORT_RE = /from\s+["']@\/(lib|hooks|components\/ui)\/([^"']+)["']/g;

function checkFile(file) {
    const content = fs.readFileSync(file, "utf8");
    const findings = [];
    let match;
    while ((match = IMPORT_RE.exec(content)) !== null) {
        const afterAlias = match[2];
        if (/[A-Z]/.test(afterAlias)) {
            findings.push({ file, line: lineOf(content, match.index), import: match[0] });
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
    console.error("Found mixed-case import paths under '@/lib', '@/hooks', or '@/components/ui':");
    for (const f of allFindings) {
        console.error(`- ${path.relative(repoRoot, f.file)}:${f.line} -> ${f.import}`);
    }
    console.error("Please use lowercase paths (e.g., '@/lib/utils', '@/hooks/use-toast', '@/components/ui/button').");
    process.exit(1);
} else {
    console.log("✓ Path casing check passed: no mixed-case alias imports detected.");
}


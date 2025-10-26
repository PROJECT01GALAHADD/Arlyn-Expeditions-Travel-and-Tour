External Imports

This folder is a staging area for third‑party UI packs, templates, or assets you want to bring into the project.

How to use
- Put downloaded `.zip` files in `external_imports/zips/`.
- Extract them into `external_imports/extracted/<package-name>/`.
- Define what to copy by editing `external_imports/manifest.json`.
- Run the provided scripts to extract and import.

Why this exists
- Keeps external content isolated from core code until ready.
- Makes copying predictable via a simple manifest.
- Avoids committing large archives to git.

Manifest overview
- `sourceRoot`: Path under `external_imports/extracted/` that is the root of the package.
- `items`: List of copy rules, each with `from` and `to` paths (relative to repo root), and optional `overwrite`.

Example
{
  "sourceRoot": "external_imports/extracted/travel-agency",
  "items": [
    { "from": "components/ui", "to": "components/ui", "overwrite": false },
    { "from": "components", "to": "components", "overwrite": false },
    { "from": "public", "to": "public", "overwrite": false }
  ]
}

Notes
- The import script respects `overwrite` per item; if `false`, existing files are preserved.
- Use `--dry` to preview what would be copied.
- You can adjust mappings to target `app/`, `components/`, `public/`, etc.
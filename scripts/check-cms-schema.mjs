/**
 * The CMS form and the content schema have to agree.
 *
 * public/admin/config.yml decides what a committee member can type. The Zod
 * schema in src/content.config.ts decides what the build will accept. When
 * they drift, the CMS cheerfully saves frontmatter that fails the next build,
 * and the person who saved it has no idea why — they filled in a form and the
 * site stopped deploying.
 *
 * That rule used to live in a comment at the top of both files, which is to
 * say it did not live anywhere. This compares them.
 *
 * It compares the SET of field names, not the nesting. A flat comparison
 * catches the cases that actually happen (a typo, a field added to one side
 * only) without re-implementing Zod. Nesting is still checked by the build
 * itself, which is the real gate.
 */
import { readFileSync } from "node:fs";
import { parse } from "yaml";

const cfg = parse(readFileSync("public/admin/config.yml", "utf8"));

/** Every `name:` in every collection's field tree, at any depth. */
const cmsNames = new Set();
const walk = (fields) => {
  for (const f of fields ?? []) {
    cmsNames.add(f.name);
    walk(f.fields);
    if (f.field) walk([f.field]);
    // Variable-type lists are the CMS page-builder shape. The type's own name
    // is a discriminator value, not a stored field; only walk its fields.
    for (const type of f.types ?? []) walk(type.fields);
  }
};
for (const c of cfg.collections ?? []) {
  walk(c.fields);
  for (const f of c.files ?? []) walk(f.fields);
}

// `body` is deliberately not excluded. It is the Markdown body for events and
// impact entries, where Zod never sees it, but it is also a real schema field
// on the home and about singletons. Dropping it blanket-wise reported a
// disagreement that did not exist.

/** Every `key: z.…` in the schema source, which is the authoritative file. */
const src = readFileSync("src/content.config.ts", "utf8");
// `z` may be followed by a newline before the method, because Prettier breaks
// long chains. Matching only `z\.` silently missed every multi-line field and
// reported ten false disagreements.
const schemaNames = new Set(
  [...src.matchAll(/^\s+([a-zA-Z][a-zA-Z0-9]*):\s*(?:z|optionalDate|optionalUrl)[\s.,]/gm)].map(
    (m) => m[1],
  ),
);

// Zod and Astro API keys that are not content fields.
for (const n of ["schema", "loader", "type"]) schemaNames.delete(n);

const onlyCms = [...cmsNames].filter((n) => !schemaNames.has(n)).sort();
const onlySchema = [...schemaNames].filter((n) => !cmsNames.has(n)).sort();

if (onlyCms.length === 0 && onlySchema.length === 0) {
  console.log(`check-cms-schema: ok, ${cmsNames.size} field names agree`);
  process.exit(0);
}

console.error("check-cms-schema: the CMS form and the content schema disagree.\n");
if (onlyCms.length) {
  console.error("  In public/admin/config.yml but not in src/content.config.ts:");
  console.error("  (an editor can fill these in and the build will drop or reject them)");
  for (const n of onlyCms) console.error(`    - ${n}`);
  console.error("");
}
if (onlySchema.length) {
  console.error("  In src/content.config.ts but not in public/admin/config.yml:");
  console.error("  (nobody can set these through the editor)");
  for (const n of onlySchema) console.error(`    - ${n}`);
}
process.exit(1);

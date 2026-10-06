// Fails the production build while any dummy content is left.
//   npm run build:prod        -> strict (use this in Cloudflare Pages)
//   ALLOW_PLACEHOLDERS=1 ...  -> warn only (first preview deploy)
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const root = process.cwd();
const problems = [];

const site = YAML.parse(fs.readFileSync(path.join(root, 'content', 'site.yaml'), 'utf8'));
for (const field of site.placeholderFields ?? []) {
  problems.push(`content/site.yaml: field "${field}" is still a placeholder (remove it from placeholderFields once real)`);
}

const projectsDir = path.join(root, 'content', 'projects');
for (const file of fs.readdirSync(projectsDir).filter((f) => f.endsWith('.yaml'))) {
  const project = YAML.parse(fs.readFileSync(path.join(projectsDir, file), 'utf8'));
  if (project.placeholder) problems.push(`content/projects/${file}: placeholder: true`);
}

for (const file of ['cv-id.pdf', 'cv-en.pdf']) {
  const p = path.join(root, 'public', 'cv', file);
  if (!fs.existsSync(p)) problems.push(`public/cv/${file}: missing`);
  else if (fs.readFileSync(p).includes('PLACEHOLDER-CV')) problems.push(`public/cv/${file}: still the dummy CV`);
}

if (problems.length === 0) {
  console.log('✔ No placeholder content found.');
  process.exit(0);
}

const list = problems.map((p) => `  - ${p}`).join('\n');
if (process.env.ALLOW_PLACEHOLDERS === '1') {
  console.warn(`⚠ Placeholder content present (ALLOW_PLACEHOLDERS=1, pages will be noindex):\n${list}`);
  process.exit(0);
}
console.error(`✖ Refusing to build: placeholder content is still present.\n${list}\n\nReplace it, or set ALLOW_PLACEHOLDERS=1 for a private preview build.`);
process.exit(1);

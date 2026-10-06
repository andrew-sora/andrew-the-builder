// Generates dummy assets (no dependencies): blueprint-style SVG covers/screenshots
// for each project in content/projects and two dummy CV PDFs.
// Real screenshots: drop files in public/projects/<slug>/ and point the YAML at them.
// Real CVs: overwrite public/cv/cv-id.pdf and public/cv/cv-en.pdf.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const W = 1200;
const H = 750;

const projects = [
  { slug: 'sorakos', name: 'SoraKos', kind: 'dashboard' },
  { slug: 'pulse', name: 'Pulse', kind: 'mobile' },
  { slug: 'backbone', name: 'Backbone', kind: 'diagram' },
  { slug: 'sentinel', name: 'Sentinel', kind: 'diagram' },
  { slug: 'retina', name: 'Retina', kind: 'dashboard' },
];

const C = { bg: '#0f1b36', grid: '#1c2f5c', line: '#7aa5ff', soft: '#3b5aa6', tape: '#ffc933', text: '#cfdcff' };

function frame(inner, label, name) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${name} placeholder">
<defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="${C.grid}" stroke-width="1"/></pattern></defs>
<rect width="${W}" height="${H}" fill="${C.bg}"/><rect width="${W}" height="${H}" fill="url(#g)"/>
${inner}
<rect x="40" y="${H - 84}" width="470" height="44" rx="6" fill="${C.tape}"/>
<text x="60" y="${H - 55}" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="20" font-weight="700" fill="#1a1400">PLACEHOLDER · ${label}</text>
<text x="${W - 40}" y="64" text-anchor="end" font-family="Georgia,serif" font-size="40" font-weight="700" fill="${C.text}">${name}</text>
</svg>
`;
}

function dashboard(v) {
  const bars = [0.5, 0.8, 0.6, 0.95, 0.7, 0.85].map((h, i) => `<rect x="${430 + i * 90}" y="${470 - h * 220}" width="56" height="${h * 220}" rx="4" fill="${v ? C.tape : C.soft}" opacity="${0.55 + h * 0.4}"/>`).join('');
  return `<rect x="40" y="100" width="1120" height="540" rx="14" fill="none" stroke="${C.line}" stroke-width="2"/>
<rect x="40" y="100" width="220" height="540" rx="14" fill="${C.grid}" opacity=".7"/>
${[0, 1, 2, 3, 4].map((i) => `<rect x="64" y="${136 + i * 48}" width="${150 - (i % 2) * 30}" height="14" rx="7" fill="${C.line}" opacity=".6"/>`).join('')}
${[0, 1, 2].map((i) => `<rect x="${290 + i * 290}" y="130" width="260" height="110" rx="10" fill="none" stroke="${C.line}" stroke-width="2"/><rect x="${310 + i * 290}" y="152" width="120" height="12" rx="6" fill="${C.line}" opacity=".7"/><rect x="${310 + i * 290}" y="188" width="170" height="28" rx="6" fill="${C.text}" opacity=".85"/>`).join('')}
<rect x="290" y="270" width="840" height="340" rx="10" fill="none" stroke="${C.line}" stroke-width="2"/>${bars}
<path d="M310 560 C 450 500, 560 560, 700 470 S 960 420, 1100 330" fill="none" stroke="${C.tape}" stroke-width="4" stroke-linecap="round" ${v ? 'opacity=".0"' : ''}/>`;
}

function mobile(v) {
  const x = v ? 520 : 380;
  return `<rect x="${x}" y="90" width="300" height="560" rx="38" fill="none" stroke="${C.line}" stroke-width="3"/>
<rect x="${x + 110}" y="106" width="80" height="12" rx="6" fill="${C.line}" opacity=".6"/>
${[0, 1, 2, 3].map((i) => `<rect x="${x + 26}" y="${150 + i * 112}" width="248" height="92" rx="14" fill="none" stroke="${C.line}" stroke-width="2"/><circle cx="${x + 62}" cy="${196 + i * 112}" r="20" fill="${i === 0 ? C.tape : C.soft}"/><rect x="${x + 96}" y="${178 + i * 112}" width="150" height="12" rx="6" fill="${C.text}" opacity=".8"/><rect x="${x + 96}" y="${204 + i * 112}" width="110" height="10" rx="5" fill="${C.line}" opacity=".5"/>`).join('')}
<text x="${v ? 200 : 880}" y="380" font-family="ui-monospace,Menlo,monospace" font-size="22" fill="${C.line}">APK · v0.1.0</text>`;
}

function diagram(v) {
  const nodes = v
    ? [[120, 300, 'edge'], [440, 180, 'core'], [440, 420, 'ids'], [760, 300, 'app']]
    : [[120, 300, 'site A'], [440, 180, 'DWDM'], [440, 420, 'OADM'], [760, 300, 'site B']];
  const boxes = nodes
    .map(([x, y, t], i) => `<rect x="${x}" y="${y}" width="220" height="110" rx="12" fill="${C.bg}" stroke="${i === 1 ? C.tape : C.line}" stroke-width="3"/><text x="${x + 110}" y="${y + 64}" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="26" fill="${C.text}">${t}</text>`)
    .join('');
  return `<path d="M340 355 L440 235 M340 355 L440 475 M660 235 L760 355 M660 475 L760 355" stroke="${C.line}" stroke-width="3" fill="none" stroke-dasharray="10 8"/>${boxes}
<path d="M120 590 H980" stroke="${C.line}" stroke-width="2"/><path d="M120 578 V602 M980 578 V602" stroke="${C.line}" stroke-width="2"/>
<text x="550" y="578" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="18" fill="${C.line}">architecture diagram</text>`;
}

const kinds = { dashboard, mobile, diagram };

for (const p of projects) {
  const dir = path.join(root, 'public', 'projects', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  const files = [
    ['cover.svg', kinds[p.kind](0), 'cover image'],
    ['shot-1.svg', kinds[p.kind](1), 'screenshot 1'],
    ['shot-2.svg', kinds.diagram(p.kind === 'diagram' ? 0 : 1), 'screenshot 2'],
  ];
  for (const [name, inner, label] of files) fs.writeFileSync(path.join(dir, name), frame(inner, label, p.name));
}

fs.writeFileSync(
  path.join(root, 'public', 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${C.bg}"/><path d="M14 50 L32 12 L50 50 M22 36 H42" fill="none" stroke="${C.tape}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>\n`,
);

function pdf(title) {
  const text = `BT /F1 22 Tf 72 720 Td (${title}) Tj 0 -34 Td /F1 12 Tf (Replace this file with your real CV, same file name.) Tj ET`;
  const objs = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${Buffer.byteLength(text)} >>\nstream\n${text}\nendstream`,
  ];
  let out = '%PDF-1.4\n';
  const offsets = [];
  objs.forEach((o, i) => {
    offsets.push(Buffer.byteLength(out));
    out += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = Buffer.byteLength(out);
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('')}`;
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return out;
}

fs.mkdirSync(path.join(root, 'public', 'cv'), { recursive: true });
fs.writeFileSync(path.join(root, 'public', 'cv', 'cv-en.pdf'), pdf('PLACEHOLDER-CV (English)'));
fs.writeFileSync(path.join(root, 'public', 'cv', 'cv-id.pdf'), pdf('PLACEHOLDER-CV (Bahasa Indonesia)'));
console.log('Dummy assets written to public/.');

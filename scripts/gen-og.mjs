// Renders public/og-id.png and public/og-en.png (1200x630) with Playwright.
// Optional tool, not a project dependency:
//   npm i -D playwright && npx playwright install chromium && node scripts/gen-og.mjs
// The card shows the brand, the headline and your cutout portrait (public/me-720.webp).
// It deliberately has no personal name and no URL, so it stays valid when those change.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const cards = {
  en: { a: 'I build things end to end,', b: 'from fiber to frontend.', sub: 'Web · Network · Security · AI' },
  id: { a: 'Saya membangun dari ujung ke ujung,', b: 'dari serat optik sampai antarmuka.', sub: 'Web · Jaringan · Keamanan · AI' },
};

const photo = `data:image/webp;base64,${fs.readFileSync(path.join(process.cwd(), 'public', 'me-720.webp')).toString('base64')}`;

const html = ({ a, b, sub }) => `<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#0b1220;color:#e8edf7;font-family:'Fraunces','Iowan Old Style',Georgia,'Liberation Serif',serif;position:relative;overflow:hidden;
background-image:linear-gradient(rgba(122,165,255,.10) 1px,transparent 1px),linear-gradient(90deg,rgba(122,165,255,.10) 1px,transparent 1px);background-size:40px 40px}
.brand{position:absolute;left:72px;top:60px;display:flex;align-items:center;gap:18px;font-size:34px;font-weight:700}
.mark{width:56px;height:56px;border-radius:14px;background:#ffc933;color:#1a1400;display:grid;place-items:center;font-size:32px;transform:rotate(-4deg)}
h1{position:absolute;left:72px;top:176px;width:690px;font-size:68px;line-height:1.06;font-weight:700;letter-spacing:-.015em;text-wrap:balance}
h1 em{font-style:normal;color:#7aa5ff;background:linear-gradient(transparent 72%,rgba(255,201,51,.5) 72%)}
.sub{position:absolute;left:72px;bottom:80px;font-family:'JetBrains Mono',ui-monospace,Menlo,Consolas,monospace;font-size:26px;letter-spacing:.08em;text-transform:uppercase;color:#a9b4cc}
.arch{position:absolute;right:110px;bottom:28px;width:330px;height:430px;background:#ffc933;border:3px solid #e8edf7;border-bottom:0;border-radius:999px 999px 0 0}
.me{position:absolute;right:138px;bottom:28px;height:500px;width:auto}
.tape{position:absolute;left:0;right:0;bottom:0;height:28px;background:repeating-linear-gradient(-45deg,#ffc933 0 36px,#111 36px 72px)}
</style></head><body>
<div class="brand"><span class="mark">A</span>Andrew the Builder</div>
<h1>${a} <em>${b}</em></h1>
<div class="sub">${sub}</div>
<div class="arch"></div><img class="me" src="${photo}" alt="">
<div class="tape"></div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [locale, text] of Object.entries(cards)) {
  await page.setContent(html(text), { waitUntil: 'load' });
  const file = path.join(process.cwd(), 'public', `og-${locale}.png`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await page.screenshot({ path: file, type: 'png' });
  console.log('wrote', file);
}
await browser.close();

# SPEC v1: Andrew the Builder (landing page + portfolio)

Status: disetujui · Dokumen lain: `docs/PRD.md` (lengkap), `docs/COPY.md` (teks), `docs/LAUNCH.md` (peluncuran) · Tenggat: dikirim ke rekruter minggu ini · Pemilik keputusan: Andrew

## 1. Tujuan
Satu situs yang menjelaskan siapa Andrew dan memamerkan proyek, dengan dua konversi utama:

| Audiens | Pertanyaan utama | Konversi primer | Sekunder |
|---|---|---|---|
| Rekruter | Stack cocok? Level? Available? | Download CV / email | Buka case study, GitHub, LinkedIn |
| Calon klien | Bisa dipercaya? Pernah menyelesaikan masalah serupa? | WhatsApp / email dengan pesan terisi | Buka case study, live demo |

## 2. Positioning
- Wordmark: **Andrew the Builder** (header). Nama lengkap asli tampil di hero dan `<title>`.
- Headline: *I build things end to end, from fiber to frontend.* / *Saya membangun dari ujung ke ujung, dari serat optik sampai antarmuka.*
- Subjudul: *Web, network, security, AI.* Satu situs, empat **lane**: Web · Infra · Security · AI.

## 3. Sitemap (ID default, EN tersedia, `/id/...` dan `/en/...`)
- `/` terdiri dari: Hero (potret di lengkungan kuning + stempel ketersediaan + pil lane + 2 CTA) → At-a-glance → Lanes → Featured projects → Experience → Contact
- `/projects` berisi daftar semua proyek dengan filter lane (sisi klien)
- `/projects/[slug]` berisi case study: peran, masalah, pendekatan, hasil, stack, galeri, link (live / repo / APK / video)

## 4. Fitur v1
**Wajib:** i18n ID/EN (UI + konten) · dark/light · responsif · CV per bahasa · email tersamar dari bot · blok unduh APK (versi, ukuran, SHA-256, petunjuk instal) · galeri screenshot · tombol "Open live demo" · SEO dasar (metadata, hreflang, sitemap, robots, JSON-LD Person) · analytics tanpa cookie (opsional).

**Konten berbasis file** (tanpa CMS): `content/site.yaml` + `content/projects/*.yaml`, divalidasi Zod. Build gagal jika terjemahan ID/EN tidak lengkap.

**Mode placeholder:** semua konten dummy bertanda `placeholder`. `npm run build:prod` **gagal** selama masih ada dummy, jadi tidak ada yang terkirim ke rekruter tanpa sengaja.

## 5. Model konten
- **Project:** slug, lane, status (live/beta/archived/in-progress), tahun, featured, order, stack[], links{live, repo, apk{url, version, sizeMb, sha256}, video}, cover, gallery[], teks per locale (judul, tagline, peran, masalah, pendekatan, highlights[]).
- **Site:** nama, brand, kontak, ketersediaan (klien/rekruter), CV per locale, at-a-glance, experience[].

## 6. Desain
Minimalis editorial dengan tema **blueprint**: kertas krem / navy gelap, grid gambar teknik tipis, anotasi monospace, satu aksen kuning pita konstruksi untuk elemen playful (potret di lengkungan kuning, stempel status, hover miring tipis). Tipografi: serif display (Fraunces) + sans (Inter) + mono (JetBrains Mono). Hormati `prefers-reduced-motion`.

## 7. Stack dan deploy
Next.js 15 (static export, App Router) · i18n sederhana buatan sendiri (routing `/[locale]` + kamus JSON bertipe, tanpa middleware) · CSS biasa dengan design tokens (Tailwind bisa ditambahkan kemudian) · Zod + YAML · Cloudflare Pages (`*.pages.dev`, handle `andrewthebuilder`) · APK di GitHub Releases · kontak lewat mailto/WhatsApp/LinkedIn (tanpa backend). Biaya bulanan nol; domain berbayar menyusul.

## 8. Di luar scope v1
CMS · blog · form kontak berbackend · iframe live app · slideshow native · demo ML live · monetisasi · NDA/gated content · OG image dinamis (gambar OG statis ID/EN sudah ada).

## 9. Acceptance criteria
1. Build statis sukses; semua rute `/id` dan `/en` ter-generate.
2. Tidak ada konten dummy saat `build:prod`.
3. Rekruter menemukan CV dan kontak dalam ≤ 1 layar dari hero.
4. Lighthouse mobile ≥ 90 (Performance, Accessibility, SEO) pada halaman Home.
5. Email tidak muncul sebagai teks polos di HTML statis.
6. Bahasa ID dan EN lengkap; language switcher mempertahankan halaman yang sama.
7. Teks tetap terbaca di light dan dark, dan seluruh situs bisa dipakai dengan keyboard.

## 10. Yang harus Andrew isi sebelum kirim
Nama lengkap asli · 3–5 proyek unggulan (teks ID/EN, screenshot, link) · CV ID/EN · WhatsApp/LinkedIn/GitHub asli · At-a-glance dan Experience asli · rilis APK di GitHub Releases + SHA-256.

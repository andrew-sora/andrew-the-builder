# Checklist peluncuran

Urutan kerja untuk 1–2 hari. Centang satu per satu. Teks proyek dan pesan ke rekruter ada di `docs/COPY.md`; target dan risiko di `docs/PRD.md`.

## 0. Yang belum teruji (baca dulu)

Repo ini ditulis tanpa bisa menjalankan `npm install` dan `next build` (registry diblokir di lingkungan penulis). Yang sudah dicek: validasi konten dengan Zod dan YAML, render semua halaman ID/EN ke HTML, tampilan di Chromium (desktop, mobile, gelap), type check `src/lib`, dan guard dummy. Yang **belum**: `next build` itu sendiri, type check komponen dan halaman, interaksi di browser (filter, tema, decode email), dan font aslinya.

Jadi langkah 1 di bawah wajib dilakukan lebih dulu.

## 1. Verifikasi lokal (±15 menit)

```bash
nvm use            # Node 22 (.nvmrc)
npm install
npm run typecheck
ALLOW_PLACEHOLDERS=1 npm run build
npx serve out      # atau: npm run dev
```

- [ ] `typecheck` bersih
- [ ] `build` sukses dan `out/` berisi `id/`, `en/`, `sitemap.xml`, `robots.txt`
- [ ] Buka `/id/` dan `/en/`: tema, pengalih bahasa, filter proyek (`/en/projects/#security`), tombol tema
- [ ] Lihat sumber halaman: alamat email **tidak** muncul polos
- [ ] Jika ada error, kirim pesan error lengkapnya ke Claude di sesi coding Anda

Perkiraan titik rawan bila ada error: impor CSS font (`@fontsource-variable/*`), tipe `params` Promise di Next 15, dan bentuk `generateMetadata`.

## 2. Isi konten asli

- [ ] `content/site.yaml`: `fullName`, `whatsapp` (format 62..., hanya angka), `linkedin`, `github`, `about` (ganti kalimat `[...]`), `glance` (lokasi, mode kerja), `experience`
- [ ] `availability`: atur sesuai kebutuhan
- [ ] CV: timpa `public/cv/cv-id.pdf` dan `public/cv/cv-en.pdf` (jangan cantumkan nomor telepon di PDF publik)
- [ ] Hapus dari `placeholderFields` setiap bidang yang sudah asli
- [ ] 3 proyek unggulan (mulai dari `sorakos.yaml`): isi `[...]`, 3 sorotan dengan fakta atau angka asli, hapus `placeholder: true`
- [ ] Screenshot 1200×750 untuk cover dan galeri di `public/projects/<slug>/`, alt text ID dan EN, tanpa data sensitif (EXIF, hostname, IP, data pribadi)
- [ ] Hapus proyek dummy yang tidak dipakai (`pulse`, `backbone`, `sentinel`, `retina`) beserta foldernya di `public/projects/`
- [ ] Tautan live demo diuji di jendela privat
- [ ] APK (bila ada): buat GitHub Release, unggah `.apk`, jalankan `sha256sum app.apk`, isi `links.apk` (url, version, sizeMb, sha256, minAndroid)
- [ ] Foto: potret ada di `public/me-480.webp` dan `me-720.webp` (dari `assets-src/me-cutout.png` lewat `scripts/gen-photo.mjs`, butuh `sharp`). Ganti sumbernya bila punya foto yang lebih tajam, lalu jalankan ulang skrip. Pastikan tidak ada EXIF lokasi
- [ ] Opsional: foto kedua dengan kontak mata untuk About dan LinkedIn
- [ ] Gambar OG memuat potret: setelah foto diganti, jalankan `node scripts/gen-og.mjs` (butuh Playwright)

## 3. Deploy (Cloudflare Pages)

- [ ] Push repo ke GitHub (privat tidak masalah)
- [ ] Cloudflare → Workers & Pages → Create → Pages → hubungkan repo
- [ ] Build command: `npm run build` untuk pratinjau pertama; ganti ke `npm run build:prod` setelah konten asli. Output directory: `out`. Variabel: `NODE_VERSION=22`
- [ ] Nama proyek `andrewthebuilder`. Jika sudah dipakai, pakai `andrew-the-builder` dan ubah `siteUrl` di `content/site.yaml`
- [ ] Aktifkan Web Analytics (tanpa cookie)
- [ ] `public/_headers` aktif. CSP masih **Report-Only**: buka situs, cek console browser, bila bersih ganti nama header menjadi `Content-Security-Policy`
- [ ] Domain sendiri (nanti): tambahkan di Pages, ubah `siteUrl`

## 4. QA sebelum dikirim

| Cek | Cara |
|---|---|
| ID dan EN lengkap | Telusuri Home, Projects, tiap studi kasus di kedua bahasa; pengalih bahasa menjaga halaman |
| Lebar 360 px dan 1280 px | DevTools; tanpa scroll horizontal; teks ID yang lebih panjang tidak merusak tata letak |
| Terang dan gelap | Ganti tema OS dan tombol; cek kontras |
| Keyboard | Tab dari atas: tautan lompat, nav, tombol, filter, galeri; fokus selalu terlihat |
| Tautan | WhatsApp (pesan terisi), LinkedIn, GitHub, demo, repo, CV (kedua bahasa), APK dan hash |
| Dummy | `npm run build:prod` lolos; sumber halaman tidak memuat `noindex`; tidak ada `[...]` di halaman |
| SEO | `/sitemap.xml`, `/robots.txt`, title dan description per halaman, hreflang |
| Kartu pratinjau | Tempel tautan di LinkedIn Post Inspector, uji kirim ke WhatsApp; gambar OG muncul |
| Performa | Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 |
| Perangkat nyata | Buka di satu ponsel Android dan satu iPhone bila ada |

## 5. Kirim

- [ ] Tambahkan `?ref=` pada tautan yang disebar (`?ref=recruiter`, `?ref=cv`, `?ref=linkedin`, `?ref=client`)
- [ ] Perbarui bio LinkedIn dan GitHub dengan satu baris dari `docs/COPY.md` §5, plus tautan situs
- [ ] Sematkan tautan situs di CV (PDF) dan LinkedIn "Featured"
- [ ] Kirim pesan ke 3–5 rekruter pertama memakai templat di `docs/COPY.md` §5, tiap pesan dengan satu alasan spesifik
- [ ] Catat siapa yang dikirimi dan kapan; cek Web Analytics setelah 3–7 hari

## 6. Setelah terkirim

- Tambah proyek ke-4 dan ke-5, ganti sisa dummy.
- Beli domain murah setelah riset harga, lalu ubah `siteUrl`.
- Pertimbangkan v2 (lihat PRD §13): form kontak dengan Turnstile, tulisan teknis, demo ML.

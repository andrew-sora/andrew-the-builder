# PRD: Andrew the Builder (landing page + portfolio)

Versi 1.0 · 2026-10-04 · Pemilik produk dan keputusan: Andrew · Status: disetujui untuk dibangun
Dokumen pendamping: `SPEC.md` (ringkasan satu halaman), `docs/COPY.md` (teks), `docs/LAUNCH.md` (peluncuran), `CLAUDE.md` (konteks untuk agen coding)

---

## 1. Ringkasan

Situs pribadi satu halaman utama plus halaman proyek yang menjelaskan siapa Andrew dan memamerkan proyek yang ia kerjakan. Situs melayani dua audiens sekaligus, **rekruter** dan **calon klien**, dengan satu identitas: *Andrew the Builder*, engineer yang membangun dari ujung ke ujung (*from fiber to frontend*) di empat lajur: **Web & Mobile, Network & DevOps, Security, AI & Vision**.

**Konteks dan batasan nyata**
- Harus siap dikirim ke rekruter dalam 1–2 hari kerja.
- Biaya bulanan nol; hanya domain yang boleh berbayar, dan itu menyusul.
- Andrew tidak mau mengelola CMS atau server untuk situs ini.
- Konten awal masih dummy; konten asli diisi saat pengerjaan.

## 2. Tujuan dan non-tujuan

**Tujuan**
1. Rekruter bisa menilai kecocokan (peran, stack, level, ketersediaan) dalam ≤ 30 detik dan mendapat CV dalam 1 klik.
2. Calon klien bisa menilai kredibilitas lewat studi kasus nyata dan menghubungi Andrew dalam 1 klik dengan pesan terisi.
3. Setiap proyek bisa dipamerkan dalam format apa pun yang tersedia: screenshot, video, live app, APK.
4. Situs dwibahasa penuh (ID/EN) dengan konten yang sama kuat di kedua bahasa.
5. Mudah diperbarui oleh satu orang lewat file di repo, tanpa backend.

**Non-tujuan v1:** CMS, blog, form kontak berbackend, iframe live app, slideshow native, demo ML live, monetisasi, konten NDA/gated, OG image dinamis, analytics kustom.

## 3. Audiens dan persona

Persona adalah arketipe untuk memandu keputusan, bukan orang sungguhan.

| | **Rani, rekruter/hiring manager** | **Budi, calon klien (pemilik bisnis/produk)** |
|---|---|---|
| Konteks | Membuka puluhan portofolio per hari, sering dari LinkedIn di laptop atau ponsel | Menerima tautan lewat WhatsApp atau referensi, biasanya di ponsel |
| Ingin tahu | Peran, stack, level, ketersediaan, lokasi dan mode kerja | Apakah bisa dipercaya dan pernah memecahkan masalah serupa |
| Sabar | < 30 detik sebelum memutuskan lanjut atau tidak | Mau membaca satu studi kasus bila meyakinkan |
| Konversi | Unduh CV, email, LinkedIn | WhatsApp atau email dengan pesan terisi |
| Penghalang | CV tersembunyi, klaim tanpa bukti, halaman lambat | Jargon teknis, tidak ada hasil terukur, tidak ada kontak cepat |

## 4. User stories

| ID | Sebagai | Saya ingin | Agar | Prioritas |
|---|---|---|---|---|
| U1 | Rekruter | melihat peran, stack inti, lokasi, mode kerja di layar pertama | cepat menyaring | P0 |
| U2 | Rekruter | mengunduh CV dalam bahasa saya dengan satu klik | menyimpannya | P0 |
| U3 | Rekruter | melihat status ketersediaan (terbuka untuk posisi) | tahu apakah layak dihubungi | P0 |
| U4 | Klien | menghubungi lewat WhatsApp dengan pesan terisi | tidak perlu menyusun dari nol | P0 |
| U5 | Klien/Rekruter | membuka studi kasus dengan masalah, pendekatan, hasil, stack | menilai kedalaman kerja | P0 |
| U6 | Pengunjung | berganti ID/EN tanpa kehilangan halaman | membaca dalam bahasa nyaman | P0 |
| U7 | Pengunjung | memfilter proyek per lajur | menemukan yang relevan | P0 |
| U8 | Pengguna Android | mengunduh APK dengan versi, ukuran, SHA-256, dan petunjuk instal | memasang dengan aman | P0 |
| U9 | Pengunjung | melihat screenshot dan membuka demo langsung | membuktikan produk nyata | P0 |
| U10 | Pengunjung | tampilan terang atau gelap | nyaman dibaca | P1 |
| U11 | Pengunjung | menonton video walkthrough tanpa memperlambat halaman | tidak terganggu | P1 |
| U12 | Penerima tautan | melihat kartu pratinjau saat tautan dibagikan di LinkedIn/WhatsApp | tahu isi tautan | P0 |
| U13 | Andrew | mengganti konten lewat file YAML dan melihat error jelas bila ada yang kurang | cepat dan aman | P0 |
| U14 | Andrew | build produksi gagal jika masih ada dummy | tidak mengirim konten palsu | P0 |

## 5. Persyaratan fungsional

### 5.1 Peta situs
```
/                     → pengalihan ke /id/ atau /en/ (bahasa tersimpan, lalu bahasa browser)
/{locale}/            Home
/{locale}/projects/   Daftar proyek + filter lajur (#web #infra #security #ai)
/{locale}/projects/{slug}/   Studi kasus
/sitemap.xml  /robots.txt  /cv/cv-{id|en}.pdf  /og-{id|en}.png (1200x630, memuat potret)
```

### 5.2 Wireframe Home (urutan blok)
```
┌ Header: [A] Andrew the Builder    Work · Glance · Experience · Contact    [ID] [◐]
├ HERO (2 kolom di ≥ 900 px; foto di atas teks di mobile)
│  kiri:  (● Open for roles and projects)
│         NAMA LENGKAP
│         I build things end to end, from fiber to frontend.
│         Web, network, security, AI. One engineer, shipped end to end.
│         [01 Web] [02 Infra] [03 Security] [04 AI]   ← pil lane bernomor → /projects/#lane
│         [FOR RECRUITERS: Download CV ↓]   [FOR CLIENTS: Start a project ↗]
│  kanan: potret cutout di atas lengkungan kuning (arch), bertumpu di pita, + stempel bulat berputar (status ketersediaan)
├ ▓▓▓▓▓ pita konstruksi ▓▓▓▓▓
├ 01 AT A GLANCE   → paragraf About + 6 fakta (peran, stack, juga mengerjakan, pendidikan, lokasi, mode kerja)
├ 02 FOUR LANES    → 4 kartu (Web & Mobile, Network & DevOps, Security, AI & Vision) → /projects/#lane
├ 03 SELECTED WORK → 3-5 kartu proyek (cover, status, lajur·tahun, judul, tagline, 4 tag) + "All projects →"
├ 04 EXPERIENCE    → timeline
├ 05 CONTACT       → [I'm hiring: CV, email, LinkedIn]  [I have a project: WhatsApp, email, GitHub]
└ Footer
```

### 5.3 Wireframe studi kasus
```
← All projects
(● Beta)  JUDUL
Tagline satu kalimat
[Peran | Tahun | Lajur]
[Open live demo ↗] [Source code ↗]
┌──────── cover / screenshot utama ────────┐
Masalah          │ Stack (tag)
Pendekatan       │ Blok APK (bila ada) / video (bila ada)
Sorotan (3)      │
Galeri screenshot (geser horizontal)
```

### 5.4 Aturan fitur
| Area | Persyaratan |
|---|---|
| Ketersediaan | `availability.clients` dan `availability.recruiters` di `site.yaml` mengatur badge hero dan kartu kontak. Keduanya `false` berarti badge "tidak menerima pekerjaan baru". |
| CTA ganda | Hero menampilkan dua CTA berlabel audiens. Kartu kontak ditampilkan per audiens sesuai ketersediaan. |
| Kontak | Email tersamar (base64, didekode di browser; tanpa JS tampil `nama [at] domain`). WhatsApp lewat `wa.me` dengan pesan terisi per bahasa. |
| i18n | Rute `/id` dan `/en`; semua teks UI di kamus JSON bertipe; semua teks konten wajib ada di kedua bahasa (build gagal bila kurang). Pengalih bahasa mempertahankan halaman dan menyimpan pilihan. |
| Filter proyek | Di sisi klien, status tersimpan di hash URL sehingga bisa ditautkan (`/projects/#security`). |
| APK | Menampilkan versi, ukuran, Android minimum, SHA-256, tombol unduh, dan 3 langkah instal. File di GitHub Releases. |
| Video | YouTube dengan facade: tidak ada permintaan ke YouTube sebelum diklik. |
| Galeri | Strip geser dengan scroll-snap, dapat difokus keyboard. |
| Tema | Mengikuti OS; tombol mengganti dan menyimpan pilihan. Tanpa kilatan tema salah. |
| Dummy | Konten dummy ditandai; build produksi menolak; build biasa menghasilkan halaman `noindex`. |

## 6. Konten dan bahasa

- Nada: lugas, hangat, orang pertama, kalimat aktif, bukti sebelum klaim. Hindari "passionate", "rockstar", dan daftar teknologi tanpa konteks. Panduan lengkap di `docs/COPY.md`.
- Setiap studi kasus memuat: masalah (2–3 kalimat), pendekatan (3–5 kalimat), tepat 3 sorotan dengan angka atau fakta yang dapat diperiksa.
- Proyek NDA tidak ada di v1. Jangan menampilkan data klien, hostname, rentang IP, topologi sensitif, atau temuan keamanan yang masih dapat dieksploitasi.
- Demo ML hanya memakai data publik atau sintetis, dengan catatan bukan alat diagnostik.

## 7. Persyaratan non-fungsional

| Kategori | Target |
|---|---|
| Performa | Lighthouse mobile Performance ≥ 90 pada Home; LCP < 2,5 dtk di 4G; tanpa JS pihak ketiga di jalur kritis; JS klien hanya untuk pengalih bahasa, tema, filter, dan email |
| Aksesibilitas | Lighthouse A11y ≥ 95; kontras AA di terang dan gelap; seluruh situs dapat dipakai dengan keyboard; tautan lompat ke konten; `prefers-reduced-motion` dihormati; target sentuh ≥ 44 px |
| SEO | Title/description per halaman dan bahasa; `hreflang` + canonical; sitemap dan robots; JSON-LD `Person`; gambar OG 1200×630 |
| Privasi | Tanpa cookie dan tanpa pelacak pihak ketiga; analytics opsional yang tidak memakai cookie |
| Keamanan | Situs statis tanpa backend; tautan keluar memakai `noopener`; email tidak tampil polos; tambahkan header keamanan di Cloudflare (`public/_headers`) saat peluncuran |
| Keandalan | Tidak ada ketergantungan runtime; bila layanan pihak ketiga mati (YouTube, GitHub), situs tetap berfungsi |
| Kompatibilitas | Dua versi utama browser modern, iOS Safari, Android Chrome; lebar 360 px ke atas tanpa scroll horizontal |
| Biaya | Rp0 per bulan |

## 8. Model konten

Lihat `content/` dan skema Zod di `src/lib/content.ts` sebagai sumber kebenaran.
- **Project:** slug (= nama file), lane, status, tahun, featured, order, stack[], links{live, repo, apk{url, version, sizeMb, sha256, minAndroid}, video}, cover, gallery[{src, alt{id,en}}], teks per bahasa {title, tagline, role, problem, approach, highlights[]}, placeholder.
- **Site:** siteUrl, brand, fullName, about{id,en}, availability, contact, cv{id,en}, glance[], experience[], placeholderFields[].

## 9. Desain

Minimalis editorial dengan tema **blueprint**: kertas krem atau navy gelap, grid gambar teknik tipis, label monospace bernomor `[ 01 ]`, satu aksen **kuning pita konstruksi** untuk elemen playful (badge ketersediaan, pita pemisah, ornamen miring tipis, bayangan tombol bergeser). Tipografi: Fraunces (judul), Inter (isi), JetBrains Mono (label). Jarak antarbagian lega; maksimal satu elemen khas per layar agar tetap profesional di mata rekruter. Wordmark "Andrew the Builder" di header; nama lengkap asli di hero dan `<title>`. Hero dipimpin foto: potret cutout di atas lengkungan kuning, stempel ketersediaan, pil lane bernomor, pita pemisah. Sengaja tanpa statistik palsu, bar skill, deretan logo, avatar testimoni, atau form. Tidak memakai aset visual atau karakter dari franchise mana pun.

## 10. Arsitektur dan deploy

Next.js 15 (App Router, `output: 'export'`) → situs statis di `out/` → Cloudflare Pages (`*.pages.dev`, handle `andrewthebuilder`). Konten: YAML di repo, divalidasi Zod saat build. i18n: rute `[locale]` + kamus JSON bertipe. Gaya: CSS biasa dengan token. APK: GitHub Releases. Kontak: mailto, WhatsApp, LinkedIn, GitHub. Tidak ada server, database, atau CMS.

## 11. Metrik keberhasilan (target usulan, belum ada baseline)

Aktifkan Cloudflare Web Analytics (tanpa cookie). Tambahkan `?ref=` pada tautan yang disebar (mis. `?ref=cv`, `?ref=linkedin`, `?ref=proposal`) agar sumber kunjungan terlihat.

| Metrik | Target 30 hari | Cara ukur |
|---|---|---|
| Unduhan CV | ≥ 10 | klik tautan `/cv/` (event/log akses file) |
| Pesan masuk (email + WhatsApp) | ≥ 3 | hitung manual dari inbox |
| Kunjungan yang membuka ≥ 1 studi kasus | ≥ 40% | Web Analytics |
| Lighthouse mobile (Perf/A11y/SEO) | ≥ 90 / ≥ 95 / ≥ 95 | Lighthouse, ulangi tiap perubahan besar |
| Waktu dari ide ke rekruter | ≤ 2 hari kerja | kalender |

## 12. Risiko dan mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Konten asli tidak siap tepat waktu | Terkirim dengan dummy atau tertunda | `build:prod` menolak dummy; kirim v1 dengan 3 proyek terbaik saja |
| Klaim tanpa bukti | Rekruter ragu | Wajib 3 sorotan terukur per proyek; tautkan repo atau demo bila ada |
| Kebocoran data klien di studi kasus | Pelanggaran kerahasiaan | Periksa kontrak; anonimkan; buang EXIF, hostname, IP, dan URL internal dari gambar |
| APK dicurigai berbahaya | Pengunjung enggan memasang | Tampilkan SHA-256, versi, petunjuk, dan kode sumber |
| Demo atau tautan mati | Kesan buruk | Selalu sediakan screenshot; uji tautan sebelum mengirim |
| Kebijakan tier gratis berubah | Biaya atau pindah host | Situs statis dan konten di Git, pindah host mudah |
| Perbedaan panjang teks ID vs EN merusak tata letak | Tampilan rusak | Uji kedua bahasa di 360 px dan 1280 px |
| Nama `andrewthebuilder.pages.dev` sudah dipakai | URL berbeda | Siapkan cadangan `andrew-the-builder`; ubah `siteUrl` |
| Build belum diuji dengan Next.js asli oleh penulis awal | Error saat `npm run build` | Jalankan typecheck dan build lebih dulu (lihat `docs/LAUNCH.md`) |

## 13. Rencana 1–2 hari (vibe coding)

**Hari 1: konten dan fondasi**
1. `npm install && npm run typecheck && npm run build` (dengan `ALLOW_PLACEHOLDERS=1` bila perlu); perbaiki bila ada error.
2. Isi `site.yaml` yang asli (nama, kontak, about, at-a-glance, experience) dan ganti dua CV.
3. Tulis 3 proyek unggulan dengan `docs/COPY.md`; ambil screenshot 1200×750.
4. Deploy preview privat ke Cloudflare Pages.

**Hari 2: polish dan kirim**
1. Tambah 2 proyek lagi bila sempat; hapus dummy sisanya.
2. QA: ID/EN, mobile, terang/gelap, keyboard, Lighthouse, tautan APK dan hash.
3. Tambah `public/_headers`, ganti gambar OG bila perlu, `npm run build:prod`.
4. Publikasikan, periksa kartu pratinjau, kirim ke rekruter.

**Roadmap v2 (tidak diprioritaskan):** form kontak dengan Turnstile, blog/tulisan teknis, demo ML live, slideshow native, domain sendiri, OG dinamis, analytics per klik CTA, CMS bila konten membengkak.

## 14. Catatan keputusan

| Keputusan | Dipilih | Alternatif yang ditolak | Alasan |
|---|---|---|---|
| Audiens | Rekruter dan klien dalam satu situs | Dua situs terpisah | Satu identitas, satu pemeliharaan |
| Struktur | Satu situs, empat lajur | Satu persona tunggal | Menunjukkan kedalaman tanpa membingungkan |
| Konten | File YAML di repo | Sanity, Strapi, Payload, Supabase | Tenggat 1–2 hari, tanpa layanan tambahan; mudah dimigrasi nanti |
| Hosting | Cloudflare Pages | Vercel Hobby | Vercel Hobby dibatasi non-komersial; Pages gratis tanpa batas itu |
| Domain | Mulai `*.pages.dev` | Domain gratis TLD tak andal | Kredibilitas; beli domain murah setelah riset harga |
| i18n | Rute `[locale]` + kamus JSON sendiri | next-intl | Lebih sedikit bagian bergerak saat tidak bisa diuji penuh |
| Gaya | CSS biasa + token | Tailwind | Sama seperti di atas; Tailwind bisa ditambahkan |
| Demo | Screenshot, video, tautan live, galeri | iframe live, demo ML | Aman, ringan, tidak bisa mati di halaman utama |
| APK | GitHub Releases + SHA-256 | Media CMS | Berversi, gratis, dapat diverifikasi |
| Kontak | mailto/WhatsApp/LinkedIn | Form berbackend | Tanpa backend; lebih sedikit spam |
| Brand | Andrew the Builder | Andrew Stark | Cocok dengan headline; nama samaran meragukan di mata rekruter |
| Headline | "I build things end to end, from fiber to frontend." | opsi #2–#5 | Khas dan terhubung dengan latar jaringan |
| Foto hero | Cutout di kanan, lengkungan kuning, satu foto | Foto penuh, avatar kecil, tanpa foto | Rekruter menilai orangnya; menyatu dengan palet navy + kuning |
| Elemen hero | Stempel, pil lane, pita | Strip statistik, bar skill, logo klien, form | Tidak ada angka atau klien nyata untuk dipamerkan; hindari klaim kosong |
| Monetisasi dan NDA | Tidak di v1 | Layanan berpaket, level pengungkapan | Bukan kebutuhan saat ini |

## 15. Pertanyaan terbuka

1. Nama lengkap asli untuk hero dan `<title>` (sementara "Andrew Chivas", diturunkan dari email).
2. Lokasi dan mode kerja (remote/hybrid/onsite) yang ingin ditampilkan.
3. Proyek mana yang menjadi 3 unggulan, dan apakah ada yang perlu persetujuan klien sebelum dipublikasikan.
4. Apakah CV akan satu halaman atau lebih, dan apakah berisi nomor telepon (sebaiknya tidak di PDF publik).
5. Kapan membeli domain sendiri.

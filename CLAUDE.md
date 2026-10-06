# CLAUDE.md: konteks untuk agen coding

Proyek: portfolio dan landing page pribadi "Andrew the Builder". Baca `SPEC.md` (ringkas) dan `docs/PRD.md` (lengkap) sebelum mengubah perilaku.

## Perintah
- `npm run dev` · `npm run typecheck` · `npm run build` · `npm run build:prod` (menolak konten dummy)
- Jangan menjalankan `build:prod` untuk menguji kode; pakai `npm run build`.

## Struktur
- `content/site.yaml`, `content/projects/*.yaml`: sumber konten, divalidasi Zod di `src/lib/content.ts`.
- `src/messages/{id,en}.json`: teks UI. Kedua file harus punya kunci yang sama (dipaksa TypeScript lewat `src/lib/i18n.ts`).
- `src/app/[locale]/...`: halaman; `src/app/(root)/`: pengalihan dari `/`.
- `src/components/`: komponen; hanya yang berlabel `'use client'` boleh memakai hook atau API browser.
- `src/app/globals.css`: seluruh gaya, token warna di `:root` (terang) dan varian gelap.
- `public/projects/<slug>/`, `public/cv/`: aset.

## Aturan yang tidak boleh dilanggar
1. **Statis penuh:** `output: 'export'`. Tanpa API route, middleware, `next/image` optimizer, atau fitur yang butuh server.
2. **Dwibahasa:** setiap teks yang tampil harus ada di ID dan EN. Jangan menulis teks langsung di JSX; tambahkan ke kamus atau YAML.
3. **Email jangan pernah muncul polos** di HTML. Pakai `ObfuscatedEmail`.
4. **Komponen klien tidak boleh mengimpor** `src/lib/content.ts` (memakai `fs`). Impor hanya `import type`.
5. **Jangan melemahkan guard dummy** (`scripts/check-placeholders.mjs`, `robots: noindex` saat ada dummy).
6. **Aksesibilitas:** kontras AA di terang dan gelap, fokus terlihat, target sentuh ≥ 44 px, hormati `prefers-reduced-motion`.
7. **Tanpa pelacak atau skrip pihak ketiga** di jalur kritis. Tanpa cookie.
8. **Jangan menambah dependensi** tanpa alasan kuat; situs ini sengaja kecil.
9. Tautan keluar memakai `rel="noopener noreferrer"`. Trailing slash dipakai di semua URL internal.
10. Jangan menampilkan data sensitif klien (nama, hostname, IP, topologi, temuan keamanan yang masih terbuka).

## Menambah proyek
Salin file di `content/projects/`, ubah `slug` (= nama file), isi kedua bahasa, taruh gambar di `public/projects/<slug>/`. Build akan gagal dengan pesan jelas bila ada yang kurang.

## Gaya kode
TypeScript ketat, komponen server secara default, fungsi kecil, tanpa komentar yang hanya mengulang kode.

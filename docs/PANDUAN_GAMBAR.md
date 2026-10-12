# Panduan Memasukkan Tangkapan Layar (Screenshot) Portofolio

Panduan ini berisi langkah-langkah praktis untuk mengganti gambar placeholder blueprint dengan tangkapan layar (screenshot) asli dari proyek Anda.

---

## 1. Spesifikasi Gambar yang Direkomendasikan

Agar tampilan portofolio tetap tajam, cepat dimuat, dan tidak berat saat dibuka di HP maupun desktop:

| Parameter | Rekomendasi | Catatan |
|---|---|---|
| **Format File** | `.webp` *(prioritas)* atau `.png` / `.jpg` | WebP menghasilkan ukuran file jauh lebih kecil dengan kualitas yang sama tajam. |
| **Rasio Aspek** | **16:10** *(1200 × 750 px)* atau **16:9** *(1920 × 1080 px)* | Rasio ini pas dengan frame kartu portofolio desktop maupun mobile. |
| **Ukuran File** | **< 300 KB** per gambar | Jika ukuran file di atas 500 KB, kompres gratis via [squoosh.app](https://squoosh.app) atau [tinypng.com](https://tinypng.com). |

---

## 2. Struktur Folder & Penamaan File

Setiap proyek memiliki folder tersendiri di dalam `public/projects/<slug>/`.

### A. Konvensi Nama File per Proyek
Di setiap folder proyek, siapkan 3 gambar berikut:
1. **`cover.webp`** (atau `.png`): Tampilan kartu utama di halaman beranda dan header detail proyek.
2. **`shot-1.webp`**: Tangkapan layar fitur utama / dashboard di dalam halaman studi kasus.
3. **`shot-2.webp`**: Tangkapan layar alur kerja, portal, atau fitur pendukung lainnya.

### B. Daftar Lokasi Folder Proyek

| Nama Proyek | Slug | Lokasi Folder di Komputer |
|---|---|---|
| **SoraKos** | `sorakos` | `public/projects/sorakos/` |
| **Bocor Halus** | `bocor-halus` | `public/projects/bocor-halus/` |
| **EduNest** | `edunest` | `public/projects/edunest/` |
| **Retina UGM** | `retina` | `public/projects/retina/` |
| **Danus Collection** | `danus-collection` | `public/projects/danus-collection/` |
| **Sentinel** | `sentinel` | `public/projects/sentinel/` |
| **Backbone** | `backbone` | `public/projects/backbone/` |
| **Yeka Studio** | `yeka-studio` | `public/projects/yeka-studio/` |
| **SORADEV** | `soradev` | `public/projects/soradev/` |

---

## 3. Langkah Demi Langkah Memasukkan Gambar

### Langkah 1: Ambil Screenshot & Beri Nama
1. Buka aplikasi/website yang sudah live.
2. Ambil screenshot halaman terbaik (misal: dashboard atau halaman fitur).
3. Simpan file dengan nama:
   - `cover.webp` (atau `cover.png`)
   - `shot-1.webp` (atau `shot-1.png`)
   - `shot-2.webp` (atau `shot-2.png`)

### Langkah 2: Pindahkan File ke Folder Proyek
Salin (copy-paste) file gambar yang sudah disiapkan ke folder proyek tujuan di dalam folder `public/projects/<slug>/`.

> **Contoh untuk Bocor Halus:**
> Pindahkan file ke:
> `andrew-the-builder\public\projects\bocor-halus\`

### Langkah 3: Update Konfigurasi di File YAML
Buka file YAML proyek terkait di folder `content/projects/<slug>.yaml`.

Cari bagian `cover:` dan `gallery:`, lalu ubah ekstensi filenya dari `.svg` ke ekstensi gambar baru Anda (misal `.webp` atau `.png`).

#### Contoh: Sebelum & Sesudah Edit pada `content/projects/bocor-halus.yaml`

```diff
- cover: /projects/bocor-halus/cover.svg
+ cover: /projects/bocor-halus/cover.webp
  gallery:
-   - src: /projects/bocor-halus/shot-1.svg
+   - src: /projects/bocor-halus/shot-1.webp
      alt: { id: Dashboard pelacak pengeluaran mikro Bocor Halus, en: Bocor Halus micro-expense tracking dashboard }
-   - src: /projects/bocor-halus/shot-2.svg
+   - src: /projects/bocor-halus/shot-2.webp
      alt: { id: Fitur kalkulator in-app dan visualisasi batas jatah bulanan, en: In-app receipt evaluator and monthly budget limit visualization }
```

### Langkah 4: Cek Hasil di Browser
1. Buka browser di http://localhost:3000/id/
2. Halaman akan otomatis memperbarui tampilan gambar secara langsung (*hot reload*).

---

## 4. Tips Tambahan

1. **Menambah Lebih dari 2 Screenshot Galeri:**
   Jika Anda punya lebih banyak tangkapan layar, Anda bisa menambahkan item baru di daftar `gallery:` pada file YAML:
   ```yaml
   gallery:
     - src: /projects/sorakos/shot-1.webp
       alt: { id: "Dashboard pemilik", en: "Landlord dashboard" }
     - src: /projects/sorakos/shot-2.webp
       alt: { id: "Portal penghuni", en: "Tenant portal" }
     - src: /projects/sorakos/shot-3.webp
       alt: { id: "Laporan keuangan", en: "Financial reports" }
   ```

2. **Teks Alt (Aksesibilitas & SEO):**
   Pastikan deskripsi singkat pada properti `alt:` disesuaikan dengan isi screenshot Anda (tersedia bahasa Indonesia `id:` dan bahasa Inggris `en:`).

3. **Bantuan Otomatis:**
   Jika Anda merasa repot mengedit file YAML, Anda cukup meletakkan file gambarnya ke folder yang sesuai, lalu beri tahu nama file dan proyeknya di chat ini, maka file YAML akan saya bantu update-kan secara instan!

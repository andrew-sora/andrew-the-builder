# Brand Design Guideline — @hi.itsdrew
> **Identitas Visual:** The Architectural Monolith  
> **Karakter:** Presisi, Dewasa, Bersih, Berbobot, & Terstruktur (Engineering Excellence)

---

## 🎨 1. Palet Warna Resmi (Dual-Theme Checkerboard)
Untuk menciptakan grid profil Instagram 3-kolom yang berselang-seling rapi (pola papan catur), gunakan dua tema resmi ini secara bergantian:

### 🌙 Mode Gelap (Obsidian & Amber)
| Elemen | Nama Warna | Kode HEX | Penggunaan |
| :--- | :--- | :--- | :--- |
| **Card Surface** | Dark Slate | `#18191e` | Latar slide |
| **Primary Text** | Crisp Off-White | `#ffffff` | Judul utama |
| **Body Text** | Muted Zinc | `#d4d4d8` | Teks penjelasan |
| **Accent / Focus** | Electric Amber | `#f59e0b` | Badge & aksen garis |
| **Border / Divider** | Hairline White | `rgba(255, 255, 255, 0.08)` | Garis tipis 1px |

### ☀️ Mode Terang (Paper Studio & Ink)
| Elemen | Nama Warna | Kode HEX | Penggunaan |
| :--- | :--- | :--- | :--- |
| **Card Surface** | Warm Stone Paper | `#fafaf9` | Latar slide kertas studio |
| **Primary Text** | Deep Obsidian Ink | `#09090b` | Judul utama |
| **Body Text** | Dark Zinc | `#27272a` | Teks penjelasan |
| **Accent / Focus** | Warm Amber | `#d97706` | Badge & aksen garis |
| **Border / Divider** | Hairline Dark | `rgba(0, 0, 0, 0.09)` | Garis tipis 1px |

---

## 🔤 2. Sistem Tipografi (Typography)

* **Heading (Judul Utama):** `Plus Jakarta Sans`
  * *Weight:* Bold (700) / Extrabold (800)
  * *Gaya:* Huruf kecil natural (*lowercase*), tracking-tight, line-height 1.25.
* **Body Text (Paragraf):** `Inter`
  * *Weight:* Regular (400) / Medium (500)
  * *Ukuran:* 15px – 16px (skala visual 4:5), line-height 1.6 (lega dan nyaman dibaca).
* **Meta / Technical Labels:** `JetBrains Mono`
  * *Weight:* Medium (500) / Semibold (600)
  * *Penggunaan:* Nomor slide (`01 / 05`), badge kategori (`01 / BUILDER NOTES`), dan footer handle.

---

## 📐 3. Spesifikasi Tata Letak (Layout Rules)

* **Rasio Resmi Feed:**
  * **1:1 Persegi (1080 × 1080 px):** *Default Resmi Feed Instagram* — Bebas terpotong (anti-crop) baik di feed maupun di grid profil tanpa perlu repot pencet tombol crop.
  * **4:5 Portrait (1080 × 1350 px):** Vertikal tinggi (wajib tekan ikon expand `⤢` di IG saat upload multi-photo).
* **Bentuk Export:** Full-bleed rectangle solid (sudut siku 90°) agar menyatu sempurna dengan bingkai postingan Instagram tanpa sudut terpotong.
* **Border:** 1px solid dengan opasitas 6% putih (`border border-white/[0.06]`).
* **Header Tetap:** 
  * Pojok kiri atas: Label kategori beraksen Amber (`01 / BUILDER NOTES`).
  * Pojok kanan atas: Indikator slide (`01 / 05`).
* **Footer Tetap:**
  * Pojok kiri bawah: `drew · soradev.id` (warna Muted Zinc).
  * Pojok kanan bawah: `geser →` (warna Amber).

---

## 📂 Template Acuan Baku
File HTML master yang menjadi acuan setiap produksi carousel:  
👉 **`docs/brand-opsi-1-monolith.html`**


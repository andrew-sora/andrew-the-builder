# Panduan teks dan draf (ID/EN)

Draf di sini memakai hanya fakta yang sudah Anda sebutkan. Semua yang bertanda `[...]` harus Anda isi dengan fakta asli. **Jangan menambah angka atau klaim yang tidak bisa Anda buktikan.**

## 1. Suara dan gaya

- Orang pertama, kalimat aktif, konkret. "Saya merancang isolasi tenant dengan RLS" lebih kuat daripada "berpengalaman dalam keamanan data".
- Bukti sebelum klaim: angka, hasil, tautan, atau nama teknologi dengan konteks.
- Hindari: *passionate, rockstar, ninja, hardworking, team player, jack of all trades*. Daftar teknologi tanpa konteks. Kalimat pembuka "Halo, saya adalah seorang...".
- Satu ide per kalimat. Paragraf maksimal 4 baris di layar.
- Terjemahan bukan kata demi kata. Tulis EN dan ID masing-masing alami; istilah teknis (stack, deploy, RLS) boleh tetap dalam bahasa Inggris di versi ID.
- Plesetan "Builder" cukup di wordmark dan headline. Jangan berlebihan di teks lain.

## 2. About (sudah terpasang di situs sebagai draf; ganti bagian `[...]`)

**EN**
> I'm an Information Technology graduate from Universitas Gadjah Mada who ended up working across the whole stack: web and mobile products, optical networks, security and production AI.
>
> I like owning a problem from the first sketch to the running system, so I can move between a Next.js frontend, a Supabase backend, a fiber route and a model-serving container without handing the problem off. [One sentence on what you are building or looking for right now.]

**ID**
> Saya lulusan Teknologi Informasi Universitas Gadjah Mada yang akhirnya bekerja di seluruh lapisan: produk web dan mobile, jaringan optik, keamanan, dan AI di production.
>
> Saya suka memegang satu masalah dari sketsa pertama sampai sistemnya berjalan, jadi saya bisa berpindah antara frontend Next.js, backend Supabase, jalur fiber, dan container penyaji model tanpa melempar masalahnya ke orang lain. [Satu kalimat tentang apa yang sedang Anda bangun atau cari saat ini.]

## 3. Template studi kasus (per proyek, ±20 menit)

Jawab pertanyaan ini dulu dengan catatan kasar; lalu rapikan jadi teks situs.

| Bidang situs | Pertanyaan pemandu | Batas |
|---|---|---|
| `tagline` | Apa ini dan untuk siapa, dalam satu kalimat? | ≤ 100 karakter |
| `role` | Apa peran Anda persisnya? (bukan "tim", tapi bagian Anda) | ≤ 6 kata |
| `problem` | Siapa yang kesulitan? Apa yang sakit sebelum ini ada? Mengapa solusi yang ada tidak cukup? | 2–3 kalimat |
| `approach` | Keputusan teknis apa yang paling penting, dan mengapa dipilih dibanding alternatifnya? Bagaimana dikirim ke production? | 3–5 kalimat |
| `highlights[1]` | Hasil terukur (pengguna, waktu, biaya, ketersediaan, akurasi) | 1 kalimat |
| `highlights[2]` | Bukti kedua atau skala | 1 kalimat |
| `highlights[3]` | Pelajaran teknis atau trade-off yang jujur | 1 kalimat |

**Contoh gaya (fiktif, jangan dipublikasikan)**
> *Problem:* Pemilik kos mengelola penghuni dan pembayaran lewat catatan dan chat; tagihan terlewat dan tidak ada riwayat yang bisa dipercaya.
> *Approach:* Saya memisahkan data tiap pemilik dengan Row Level Security di PostgreSQL sehingga satu basis data aman melayani banyak tenant. Pengingat dikirim lewat WhatsApp API karena itu kanal yang sudah dipakai penghuni.
> *Highlight:* Waktu rekonsiliasi pembayaran turun dari [X jam] menjadi [Y menit] per bulan. ← angka asli milik Anda.

**Aturan keamanan konten**
- Cek kontrak dan izin klien sebelum memublikasikan nama, tangkapan layar, atau metrik.
- Buang dari gambar: hostname, IP, URL internal, token, EXIF, foto pasien, dan data pribadi.
- Untuk temuan keamanan: hanya yang sudah ditambal, tanpa langkah eksploitasi.
- Untuk demo medis: data publik atau sintetis, dan tulis "bukan alat diagnostik".

## 4. Bahan yang dikumpulkan per proyek (checklist)

- [ ] 1 cover + 2–3 screenshot, 1200×750 px, PNG/JPG/WebP, tanpa data sensitif
- [ ] Alt text ID dan EN untuk setiap gambar (apa yang terlihat, bukan "screenshot")
- [ ] Tautan live demo (uji di jendela privat) dan/atau repo
- [ ] Untuk APK: file `.apk` di GitHub Releases, versi, ukuran, Android minimum, `sha256sum app.apk`
- [ ] Video walkthrough ≤ 2 menit (opsional): ID video YouTube
- [ ] 3 sorotan dengan angka atau fakta
- [ ] Izin klien (jika berlaku)

## 5. Pesan ke rekruter dan klien

Ganti `[...]` dan tautan. Tambahkan `?ref=` agar sumber kunjungan terlihat.

**Rekruter: email atau DM LinkedIn (EN)**
> Subject: [Role], full-stack / network / security / AI engineer, Andrew
>
> Hi [Name], I'm Andrew, an IT graduate from UGM working across web and mobile products, optical networks, security and production AI. I'm interested in the [Role] role at [Company] because [one specific reason].
>
> Selected projects and my CV are here: https://andrewthebuilder.pages.dev/en/?ref=recruiter
> I'd be glad to talk if there's a fit.
>
> Andrew

**Rekruter (ID)**
> Subjek: [Posisi], engineer full-stack / jaringan / keamanan / AI, Andrew
>
> Halo [Nama], saya Andrew, lulusan TI UGM yang bekerja di produk web dan mobile, jaringan optik, keamanan, dan AI di production. Saya tertarik dengan posisi [Posisi] di [Perusahaan] karena [satu alasan spesifik].
>
> Proyek pilihan dan CV saya ada di sini: https://andrewthebuilder.pages.dev/id/?ref=recruiter
> Senang bisa berdiskusi jika ada kecocokan.
>
> Andrew

**Klien: WhatsApp (ID)**
> Halo [Nama], saya Andrew. Terkait [kebutuhan singkat], ini contoh proyek serupa yang pernah saya kerjakan: https://andrewthebuilder.pages.dev/id/projects/[slug]/?ref=client
> Boleh saya tahu target, tenggat, dan anggarannya? Setelah itu saya kirim usulan langkah dan estimasi.

**Klien: WhatsApp (EN)**
> Hi [Name], I'm Andrew. Regarding [short need], here's a similar project I built: https://andrewthebuilder.pages.dev/en/projects/[slug]/?ref=client
> Could you share the goal, deadline and budget range? I'll reply with a proposed plan and estimate.

**Bio LinkedIn / GitHub (satu baris)**
> EN: Full-stack, network, security and AI engineer. I build things end to end, from fiber to frontend. → andrewthebuilder.pages.dev
> ID: Engineer full-stack, jaringan, keamanan, dan AI. Membangun dari ujung ke ujung, dari serat optik sampai antarmuka. → andrewthebuilder.pages.dev

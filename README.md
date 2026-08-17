# 👑 Museum Digital Busana Nusantara

Museum Digital Busana Nusantara adalah aplikasi web ensiklopedia dan repositori interaktif yang mendokumentasikan linimasa evolusi serta transformasi pakaian adat tradisional dan pakaian kerajaan (*royal clothing*) di Nusantara dari masa kerajaan kuno Hindu-Buddha hingga era modern kontemporer (*modern fusion*).

Aplikasi ini dirancang sebagai pameran digital museum sejarah busana menggunakan teknologi web murni (**HTML5, CSS3, dan Vanilla JavaScript**) yang interaktif, responsif, dan dapat berjalan secara luring (*offline*) sepenuhnya.

---

## ✨ Fitur Unggulan

1. **Eksplorasi Linimasa Interaktif (Abad 4 - Sekarang)**:
   Menelusuri sejarah pakaian adat yang dibagi ke dalam 5 era evolusi utama:
   * **Era Kerajaan Klasik (Abad 4 - 15)**: Dominasi lilitan dodot/kemben prada emas (Kutai, Sriwijaya, Majapahit).
   * **Era Kesultanan & Kolonial (Abad 16 - 19)**: Lahirnya Beskap, Surjan, dan akulturasi Kebaya Noni Renda.
   * **Era Kemerdekaan & Nasional (1940-an - 1950-an)**: Baju perjuangan Kebaya Kartini klasik dan Jas Safari Soekarno.
   * **Era Retro & Modernisasi (1960-an - 1990-an)**: Kebaya Kutu Baru dan peresmian kemeja Batik formal pria.
   * **Era Kontemporer & Modern Fusion (2000-an - Sekarang)**: Kombinasi tenun/batik kasual dengan gaya streetwear urban.
2. **Simulator Komparator Evolusi**:
   Alat perbandingan interaktif yang memungkinkan pengguna memilih dua busana dari era yang berbeda (misal: *Aesan Gede Sriwijaya* Hindu-Buddha vs *Modern Streetwear* kontemporer) untuk dibandingkan secara berdampingan (*side-by-side*) dari aspek tekstil, siluet potongan, filosofi ornamen, serta catatan jembatan transformasinya.
3. **Pustaka Wastra Nusantara**:
   Katalog edukasi seputar kain tradisional khas Indonesia (Batik Tulis, Songket Emas, Tenun Ikat, Lurik) lengkap dengan filosofi motif rajutannya dan visual swatch bermotif etnik dinamis.
4. **Ilustrasi Vektor SVG Dinamis**:
   Representasi visual manekin pakaian adat digambar secara prosedural berbentuk vektor SVG berdimensi (efek pencahayaan 3D, bayangan lipatan kain, detail untaian perhiasan) untuk menjamin performa cepat tanpa gambar pecah di layar resolusi tinggi.
5. **Sistem Bookmark Lokal**:
   Menyimpan halaman studi busana sejarah ke dalam daftar koleksi pribadi secara persisten menggunakan `localStorage` peramban.

---

## 📁 Struktur Repositori

```text
pakaian-kerajaan-modern/
├── index.html     - Struktur HTML pameran museum, navigasi linimasa, & panel simulator
├── styles.css     - Tema desain museum gelap-emas antik (parchment heritage) & tata letak
├── data.js        - Database sejarah linimasa 5 era, perbandingan busana, & data wastra
├── app.js         - Logika visual komparator, render manekin SVG dinamis, & bookmark
└── README.md      - Dokumentasi proyek repositori
```

---

## 🎨 Panduan Desain & Warna Kebudayaan

Aplikasi ini menggunakan filosofi desain **"Premium Museum Exhibition"** dengan visual gelap-emas:
* **Latar Belakang**: Hitam Obsidian & Abu Slate Gelap (`#121416`, `#1B1E22`) yang mensimulasikan ruang pameran museum temaram agar pakaian adat menyala sebagai fokus utama.
* **Teks**: Putih Kertas Parchment Kuno (`#E2DFD8`) untuk aspek sejarah yang tinggi keterbacaannya.
* **Aksen Utama**: Emas Antik Kerajaan (`#C5A059`) melambangkan keagungan raja-raja nusantara.
* **Aksen Pelengkap**: Merah Crimson Beludru (`#8B2635`) melambangkan keberanian pertahanan budaya.

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini bersifat statis penuh, sehingga Anda **tidak memerlukan instalasi server backend apa pun**.

### Cara A: Buka File Langsung
1. Kloning atau unduh repository ini.
2. Klik ganda pada berkas `index.html` untuk membukanya langsung di peramban web Anda (Chrome, Firefox, Safari, dll.).

### Cara B: Menggunakan Local Server (Termux/Terminal)
Jalankan perintah server statis Python:
```bash
cd ~/pakaian-kerajaan-modern
python3 -m http.server 8080
```
Buka peramban web dan akses alamat: `http://localhost:8080`.

---

*Mari mengenang sejarah dan merajut masa depan bangsa melalui pelestarian busana nusantara!* 🇮🇩

# Deploy ke Vercel (gratis, paket Hobby)

Situs ini statis (HTML, CSS, JS), jadi tidak butuh build.

## Sebelum deploy
Buka `index.html`, cari dan ganti 3 placeholder di bagian Contact:
- `GANTI_EMAIL_ANDA@gmail.com`
- `GANTI_USERNAME_LINKEDIN`
- `GANTI_USERNAME_IG`

Deskripsi 4 proyek ditulis dari nama repo. Sesuaikan jika isinya berbeda.

## Cara 1: lewat GitHub (disarankan)
1. Buat repo baru di GitHub, misalnya `NebulaEst/portfolio`, lalu unggah `index.html`, `style.css`, dan `script.js`.
2. Buka vercel.com, klik **Sign Up**, pilih **Continue with GitHub**.
3. Klik **Add New → Project**, pilih repo `portfolio`, lalu **Import**.
4. **Framework Preset**: pilih **Other**. Kosongkan Build Command dan Output Directory.
5. Klik **Deploy**. Dalam sekitar satu menit situs aktif di `https://portfolio-xxxx.vercel.app`.
6. Setiap `git push` ke branch utama akan otomatis memperbarui situs.

## Cara 2: lewat terminal
```bash
cd portfolio
npx vercel        # login pertama kali, jawab pertanyaan dengan Enter
npx vercel --prod # rilis ke produksi
```

## Mengganti nama subdomain
Project → **Settings → Domains** → tambahkan misalnya `nebulaest.vercel.app` (jika masih tersedia).
Domain sendiri (.com, dll.) berbayar di registrar; sambungkan lewat menu yang sama.

## Catatan
- Batas Hobby (per dokumentasi Vercel): 100 GB transfer data per bulan, 100 deploy per hari. Lebih dari cukup untuk portofolio.
- Paket Hobby ditujukan untuk penggunaan pribadi. Cek Terms of Service Vercel jika situs akan dipakai untuk bisnis.
- Cadangan gratis jika diperlukan: Cloudflare Pages atau GitHub Pages (unggah folder yang sama, tanpa build).

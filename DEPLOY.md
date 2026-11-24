# Deploy ke GitHub Pages (gratis)

Situs ini statis (HTML, CSS, JS), jadi tidak butuh build.

## Sebelum deploy
Buka `index.html`, cari dan ganti 3 placeholder di bagian Contact:
- `GANTI_EMAIL_ANDA@gmail.com`
- `GANTI_USERNAME_LINKEDIN`
- `GANTI_USERNAME_IG`

Deskripsi 4 proyek ditulis dari nama repo. Sesuaikan jika isinya berbeda.

**Sertifikat:** di bagian `<!-- 05 CERTIFICATES -->` ada 4 kartu. Ganti judul, penerbit, tahun, dan tautan kredensial (`href="#"`) di tiap kartu.

**CV:** tombol Download CV mengarah ke `cv/Rafly-Al-Razaq-CV.pdf`. File itu CV awal buatan saya; timpa dengan CV asli Anda dengan nama file yang sama.

## Pilih alamat situs
- **Repo `NebulaEst.github.io`** → alamat `https://nebulaest.github.io` (paling rapi, hanya boleh satu per akun).
- **Repo `portfolio`** (nama bebas) → alamat `https://nebulaest.github.io/portfolio`.

Keduanya berfungsi dengan file ini tanpa perubahan. Repo `NebulaEst/NebulaEst` dipakai untuk profil dan tidak dipakai di sini.

## Langkah
1. Buka github.com/new, isi nama repo (`NebulaEst.github.io` atau `portfolio`), pilih **Public**, lalu **Create repository**.
2. Klik **uploading an existing file**, seret `index.html`, `style.css`, `script.js`, dan folder `cv` (file harus berada di akar repo, bukan di dalam folder `portfolio`), lalu **Commit changes**.
3. Buka **Settings → Pages**.
4. Di **Build and deployment**, pilih **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)**, lalu **Save**.
5. Tunggu 1 sampai 3 menit. Alamat situs muncul di bagian atas halaman Pages. Segarkan halaman jika belum tampil.
6. Untuk memperbarui, edit atau unggah ulang file di repo, lalu commit. Situs ikut berubah otomatis.

## Jika situs tidak muncul
- Pastikan `index.html` ada di akar repo dan repo berstatus Public.
- Cek tab **Actions**: ada proses "pages build and deployment" yang harus berstatus hijau.
- Tekan Ctrl+F5 untuk membersihkan cache browser.

## Catatan
- Batas GitHub Pages (per dokumentasi GitHub): ukuran situs maks 1 GB, bandwidth 100 GB per bulan (soft limit), 10 build per jam.
- GitHub Pages tidak untuk toko online atau bisnis komersial. Portofolio pribadi aman.
- Domain sendiri (.com, dll.) berbayar di registrar; sambungkan lewat **Settings → Pages → Custom domain**.

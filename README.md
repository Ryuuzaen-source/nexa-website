# NEXA v2 — Download Hub + Streaming Links + AI

## Persyaratan
- Node.js 18 atau lebih baru.
- API key dari OpenAI API untuk mengaktifkan AI (API dapat dikenai biaya; ChatGPT Plus tidak otomatis mencakup API).
- Akun hosting yang mendukung aplikasi Node.js, misalnya Render atau Railway.

## Jalankan di komputer
1. Ekstrak folder project.
2. Buka terminal di folder project, lalu jalankan `npm install`.
3. Salin `.env.example` menjadi `.env`.
4. Buka `.env`, isi `OPENAI_API_KEY` dengan API key milikmu. Jangan bagikan atau commit file `.env`.
5. Jalankan `npm start`.
6. Buka `http://localhost:3000`.

## Deploy online (contoh: Render)
1. Upload project ini ke repository GitHub milikmu. Pastikan `.env` tidak ikut diunggah; gunakan `.gitignore`.
2. Di Render, buat layanan **Web Service** dan hubungkan repository tersebut.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Tambahkan environment variables di dashboard hosting:
   - `OPENAI_API_KEY` = API key kamu
   - `OPENAI_MODEL` = `gpt-4.1-mini` (atau model yang tersedia untuk akunmu)
6. Deploy, lalu buka URL HTTPS yang diberikan hosting.

Platform hosting dapat mengubah menu atau ketentuan paket. Paket gratis, jika tersedia, mungkin tidur saat tidak dipakai atau memiliki batas pemakaian.

## Menambah katalog
Buka `public/index.html`, cari `const items = [...]`, lalu tambah objek dengan `title`, `cat`, `icon`, `desc`, `version`, dan `url`. Gunakan tautan resmi/tepercaya serta pastikan kamu punya hak untuk mendistribusikan file. Saat ini tombol katalog mengarah ke halaman sumber; website belum menyimpan atau meng-host file download sendiri.

## Penting
- Jangan letakkan API key di HTML/JavaScript browser. Simpan sebagai environment variable server.
- Jangan commit `.env`; file `.gitignore` sudah disediakan.
- Netflix, Crunchyroll, dan YouTube dibuka sebagai platform resmi. Website ini tidak membypass langganan atau menyediakan stream bajakan.
- AI memerlukan internet, API key valid, dan limit/billing aktif pada penyedia API.

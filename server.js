import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

app.get("/api/health", (_req, res) => {
  res.json({ ready: Boolean(process.env.OPENAI_API_KEY) });
});

app.post("/api/chat", async (req, res) => {
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  if (!message) return res.status(400).json({ error: "Pesan tidak boleh kosong." });
  if (message.length > 8000) return res.status(413).json({ error: "Pesan terlalu panjang (maksimal 8000 karakter)." });
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: "AI belum dikonfigurasi. Isi OPENAI_API_KEY di .env dan restart server." });
  }
  try {
    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        instructions: "Kamu adalah NEXA AI, asisten yang ramah, aman, dan membantu. Jawab dalam bahasa yang digunakan pengguna; jika pengguna memakai bahasa Indonesia, balas dalam bahasa Indonesia. Jelaskan ketidakpastian jika perlu.",
        input: message
      })
    });
    const data = await upstream.json();
    if (!upstream.ok) {
      console.error("AI provider error:", data.error?.message || upstream.status);
      return res.status(502).json({ error: "Layanan AI gagal merespons. Periksa API key, saldo/limit, dan nama model di server." });
    }
    const reply = (data.output || [])
      .flatMap(item => item.content || [])
      .filter(part => part.type === "output_text")
      .map(part => part.text)
      .join("\n").trim();
    return res.json({ reply: reply || "AI belum menghasilkan jawaban teks." });
  } catch (error) {
    console.error("Chat request failed:", error.message);
    return res.status(500).json({ error: "Terjadi kesalahan pada server saat menghubungi AI." });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`NEXA berjalan di port ${port}`));

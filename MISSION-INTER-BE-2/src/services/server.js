const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const JWT_SECRET = process.env.JWT_SECRET || "rahasia_super_aman";

// 🔗 Koneksi MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bootcamp-harisenin",
});

db.connect((err) => {
  if (err) console.error("❌ Gagal konek DB:", err);
  else console.log("✅ Terhubung ke MySQL");
});

// ✅ Transporter email (global)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
app.get("/test-email", async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "masbokir0504@gmail.com",
      subject: "Tes Kirim Email Nodemailer",
      text: "Jika kamu menerima ini, berarti koneksi email berhasil 🎉",
    });
    res.send("✅ Email test berhasil dikirim!");
  } catch (err) {
    console.error("❌ Gagal kirim:", err);
    res.status(500).send(err.message);
  }
});


// =====================================================
// 🧾 REGISTER USER BARU + kirim OTP ke email
// =====================================================
app.post("/register", async (req, res) => {
  const { email, password, fullname, phoneNumber, gender } = req.body;
  if (!fullname || !email || !password || !phoneNumber || !gender) {
    return res
      .status(400)
      .json({ success: false, message: "Semua field wajib diisi" });
  }

  try {
    // 🔍 Cek apakah email sudah ada
    db.query("SELECT * FROM user WHERE email = ?", [email], async (err, results) => {
      if (err) {
        console.error("🛑 Error cek email:", err);
        return res
          .status(500)
          .json({ success: false, message: "Terjadi kesalahan server" });
      }

      if (results.length > 0) {
        return res.json({
          success: false,
          message: "Email sudah terdaftar",
        });
      }

      // 🔒 Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // 🔢 Generate OTP acak (6 digit)
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

      // 🕒 Waktu kadaluarsa OTP (5 menit)
      const otpExpiredAt = new Date(Date.now() + 5 * 60 * 1000);

      // 🧠 Simpan user baru ke DB
      const insertQuery = `
        INSERT INTO user (email, password, fullname, phoneNumber, gender, otp_code, otp_expired_at, CreatedDate, isVerified)
        VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE(), FALSE)
      `;
      db.query(
        insertQuery,
        [email, hashedPassword, fullname, phoneNumber, gender, otpCode, otpExpiredAt],
        async (err, result) => {
          if (err) {
            console.error("🛑 Error saat insert:", err);
            return res
              .status(500)
              .json({ success: false, message: "Gagal mendaftarkan user" });
          }

          // 📧 Kirim OTP ke email
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Kode OTP Verifikasi Akun Anda",
            html: `
              <h2>Hai ${fullname} 👋</h2>
              <p>Gunakan kode OTP berikut untuk verifikasi akun Anda:</p>
              <h1 style="letter-spacing: 3px;">${otpCode}</h1>
              <p>Kode ini berlaku selama <b>5 menit</b>.</p>
              <p>Jika Anda tidak merasa mendaftar, abaikan email ini.</p>
            `,
          };

          try {
            await transporter.sendMail(mailOptions);
            res.json({
              success: true,
              message: "Pendaftaran berhasil, OTP dikirim ke email.",
              userId: result.insertId,
            });
          } catch (mailErr) {
            console.error("📧 Gagal kirim email:", mailErr);
            res.json({
              success: true,
              message: "User dibuat, tapi gagal mengirim OTP ke email.",
              userId: result.insertId,
            });
          }
        }
      );
    });
  } catch (error) {
    console.error("❌ Register error:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
  }
});

app.post("/verify-otp", (req, res) => {
  try {
    const { email } = req.body;
    // terima baik "otp" maupun "otp_code"
    const otp_code = req.body.otp_code || req.body.otp || "";

    if (!email || !otp_code) {
      return res
        .status(400)
        .json({ success: false, message: "Email dan OTP wajib diisi" });
    }

    const query = "SELECT otp_code, otp_expired_at FROM user WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error("🛑 Query error saat SELECT otp:", err);
        return res.status(500).json({ success: false, message: "Kesalahan server (DB)" });
      }

      if (!results || results.length === 0) {
        return res.status(404).json({ success: false, message: "Email tidak ditemukan" });
      }

      const user = results[0];

      // Debug helpful logging (hapus/kurangi di production)
      console.log("DEBUG user otp:", { email, otp_from_db: user.otp_code, otp_expired_at: user.otp_expired_at });

      if (!user.otp_code) {
        return res.json({ success: false, message: "Tidak ada kode OTP tersimpan. Minta kirim ulang OTP." });
      }

      // Periksa kecocokan kode (bandingkan sebagai string)
      if (String(user.otp_code) !== String(otp_code)) {
        return res.json({ success: false, message: "Kode OTP salah" });
      }

      // Periksa expired — pastikan otp_expired_at valid date
      const expiresAt = new Date(user.otp_expired_at);
      if (isNaN(expiresAt.getTime())) {
        console.error("🛑 Format otp_expired_at tidak valid:", user.otp_expired_at);
        return res.status(500).json({ success: false, message: "Kesalahan server (format waktu OTP)" });
      }

      const now = new Date();
      if (now > expiresAt) {
        return res.json({ success: false, message: "Kode OTP telah kadaluarsa" });
      }

      // OTP valid → update status verifikasi
      db.query(
        "UPDATE user SET isVerified = TRUE, otp_code = NULL, otp_expired_at = NULL WHERE email = ?",
        [email],
        (updateErr) => {
          if (updateErr) {
            console.error("🛑 Gagal update verifikasi:", updateErr);
            return res.status(500).json({ success: false, message: "Gagal verifikasi akun" });
          }
          return res.json({ success: true, message: "Akun berhasil diverifikasi" });
        }
      );
    });
  } catch (error) {
    console.error("❌ Error unexpected di /verify-otp:", error);
    res.status(500).json({ success: false, message: "Kesalahan server tak terduga" });
  }
});


// =====================================================
// 🔑 LOGIN (bcrypt + JWT)
// =====================================================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email dan password wajib diisi",
    });
  }

  const query = "SELECT * FROM user WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("🛑 Query error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Terjadi kesalahan server" });
    }

    if (results.length === 0) {
      return res.json({
        success: false,
        message: "Email tidak ditemukan",
      });
    }

    const user = results[0];

    // 🔍 Cek password hash dengan bcrypt
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.json({
        success: false,
        message: "Password salah",
      });
    }

    // 🔥 Buat token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // update waktu login terakhir
    db.query("UPDATE user SET LastLogin = NOW() WHERE id = ?", [user.id]);

    res.json({
      success: true,
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
      },
    });
  });
});

// =====================================================
// 🔒 Middleware JWT
// =====================================================
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Token tidak disertakan",
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Token tidak valid atau kadaluarsa",
      });
    }

    req.user = decoded;
    next();
  });
}

// =====================================================
// 🔒 Contoh route proteksi JWT
// =====================================================
// app.get("/profile", verifyToken, (req, res) => {
//   const userId = req.user.id;

//   const query = `
//     SELECT id, fullname, email, phoneNumber, gender, avatar_img, CreatedAt, CreatedDate, LastLogin 
//     FROM user 
//     WHERE id = ?
//   `;

//   db.query(query, [userId], (err, results) => {
//     if (err) {
//       console.error("🛑 Error saat ambil profil:", err);
//       return res
//         .status(500)
//         .json({ success: false, message: "Gagal mengambil data profil user" });
//     }

//     if (results.length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User tidak ditemukan" });
//     }

//     res.json({
//       success: true,
//       message: "Profil berhasil diambil",
//       data: results[0],
//     });
//   });
// });


// POST tambah produk kelas
app.post("/allproduct", (req, res) => {
  const {
    nama_kelas,
    deskripsi,
    kategori,
    harga,
    rating,
    jumlah_review,
    tutor_nama,
    tutor_jabatan,
    tutor_perusahaan,
    gambar_kelas,
    avatar_tutor,
  } = req.body;

  const sql = `
    INSERT INTO ProdukKelas
    (nama_kelas, deskripsi, kategori, harga, rating, jumlah_review, tutor_nama, tutor_jabatan, tutor_perusahaan, gambar_kelas, avatar_tutor)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      nama_kelas,
      deskripsi,
      kategori,
      harga,
      rating,
      jumlah_review,
      tutor_nama,
      tutor_jabatan,
      tutor_perusahaan,
      gambar_kelas,
      avatar_tutor,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "✅ Kelas berhasil ditambahkan", id: result.insertId });
    }
  );
});

// PUT update produk kelas
app.put("/allproduct/:id", (req, res) => {
  const { id } = req.params;
  const {
    nama_kelas,
    deskripsi,
    kategori,
    harga,
    rating,
    jumlah_review,
    tutor_nama,
    tutor_jabatan,
    tutor_perusahaan,
    gambar_kelas,
    avatar_tutor,
  } = req.body;

  const sql = `
    UPDATE ProdukKelas SET
      nama_kelas=?, deskripsi=?, kategori=?, harga=?, rating=?, jumlah_review=?,
      tutor_nama=?, tutor_jabatan=?, tutor_perusahaan=?, gambar_kelas=?, avatar_tutor=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      nama_kelas,
      deskripsi,
      kategori,
      harga,
      rating,
      jumlah_review,
      tutor_nama,
      tutor_jabatan,
      tutor_perusahaan,
      gambar_kelas,
      avatar_tutor,
      id,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "✅ Data berhasil diperbarui" });
    }
  );
});

// DELETE produk kelas
app.delete("/allproduct/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM ProdukKelas WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "🗑️ Kelas berhasil dihapus" });
  });
});

// ✅ GET: Ambil profil user berdasarkan email
app.get('/profile', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email wajib diisi',
    });
  }

  // Ambil data user berdasarkan email
  const query = `
    SELECT id, fullname, email, phoneNumber, gender, avatar_img, CreatedAt, CreatedDate, LastLogin 
    FROM user 
    WHERE email = ?
  `;

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('🛑 Error saat ambil profil:', err);
      return res.status(500).json({
        success: false,
        message: 'Gagal mengambil data profil user',
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan',
      });
    }

    res.json({
      success: true,
      message: 'Profil berhasil diambil',
      data: results[0],
    });
  });
});

// ✅ PUT: Update profil berdasarkan email
app.put('/profile', (req, res) => {
  const { fullname, email, phoneNumber, gender, avatar_img } = req.body;
  console.log('📩 Data update diterima:', req.body);
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email wajib diisi' });
  }

  const query = `
    UPDATE user 
    SET fullname = ?, phoneNumber = ?, gender = ?, avatar_img = ?
    WHERE email = ?
  `;

  db.query(query, [fullname, phoneNumber, gender, avatar_img, email], (err, result) => {
    if (err) {
      console.error('🛑 Error update profil:', err);
      return res.status(500).json({ success: false, message: 'Gagal update profil' });
    }

    res.json({ success: true, message: 'Profil berhasil diperbarui' });
  });
});


app.get("/api/produk-kelas", (req, res) => {
  const q = "SELECT * FROM ProdukKelas";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});


// server.js
app.get("/api/produk-kelas/:id", (req, res) => {
  const q = "SELECT * FROM ProdukKelas WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data[0]);
  });
});

app.get("/api/produk-kelas/:id/detail", (req, res) => {
  const q = "SELECT * FROM ProdukKelasDetail WHERE produk_kelas_id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// endpoint ambil semua order
app.get("/api/orders", (req, res) => {
  db.query("SELECT * FROM orders ORDER BY payment_date DESC, payment_time DESC", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Gagal mengambil data orders" });
    }
    res.json(results);
  });
});

// ambil semua kelas user
app.get("/api/userkelas/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT 
      uk.id,
      uk.user_id,
      uk.kelas_id,
      uk.tanggal_diambil,
      uk.status_kelas,
      uk.progress_persen,
      pk.nama_kelas AS classTitle,
      pk.deskripsi,
      pk.jumlah_modul AS modules,
      pk.durasi_menit AS minutes,
      pk.instruktur AS instructor,
      pk.courseImageIndex,
      pk.avatarImageIndex
    FROM UserKelas uk
    JOIN ProdukKelas pk ON uk.kelas_id = pk.id
    WHERE uk.user_id = ?
    ORDER BY uk.tanggal_diambil DESC;
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("❌ Error mengambil data UserKelas:", err);
      return res.status(500).json({ error: "Gagal mengambil data UserKelas" });
    }
    res.json(results);
  });
});


// Jalankan server
app.listen(5000, () => {
  console.log('🚀 Server berjalan di http://localhost:5000');
});

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
// app.use(express.json());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// 🔗 Koneksi ke MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bootcamp-harisenin' // ganti sesuai nama database kamu di DBeaver
});

db.connect(err => {
  if (err) {
    console.error('❌ Koneksi database gagal:', err);
  } else {
    console.log('✅ Terhubung ke MySQL');
  }
});

// ✅ Default route biar gak error saat buka localhost:5000 di browser
app.get('/', (req, res) => {
  res.send('API server berjalan 🚀');
});

// ✅ Route untuk login dari React
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Email dan password wajib diisi' });
  }

  const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('🛑 Query error:', err);
      return res
        .status(500)
        .json({ success: false, message: 'Terjadi kesalahan pada server' });
    }

    if (results.length > 0) {
      // Update waktu login terakhir
      db.query('UPDATE user SET LastLogin = NOW() WHERE id = ?', [results[0].id]);

      return res.json({
        success: true,
        message: 'Login berhasil',
        user: results[0]
      });
    } else {
      return res.json({
        success: false,
        message: 'Email atau password salah'
      });
    }
  });
});

// ✅ Login
app.get('/users', (req, res) => {
  //Cek data user
  db.query('SELECT * FROM user', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    //Update last login
    db.query('update user set Lastlogin = NOW()', (err, results) => {
      if (err) return res.status(500).json({ error: err });
    
      res.json(results);
    });
  });
});

// ✅ REGISTER (Daftar user baru)
app.post('/register', (req, res) => {
  const { email, password, fullname, phoneNumber, gender } = req.body;
  console.log('📩 Data diterima dari frontend:', req.body);

  // Validasi input
  if (!fullname || !email || !password || !phoneNumber || !gender) {
    return res
      .status(400)
      .json({ success: false, message: 'Semua field wajib diisi' });
  }

  // Cek apakah email sudah ada
  db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('🛑 Error cek email:', err);
      return res
        .status(500)
        .json({ success: false, message: 'Terjadi kesalahan server' });
    }

    if (results.length > 0) {
      return res.json({
        success: false,
        message: 'Email sudah terdaftar'
      });
    }

    // Masukkan user baru
    const insertQuery = `
      INSERT INTO user (email, password, fullname, phoneNumber, gender, CreatedDate, isDisable)
      VALUES (?, ?, ?, ?, ?, CURDATE(), FALSE)
    `;

    db.query(insertQuery, [email, password, fullname, phoneNumber, gender], (err, result) => {
      console.log(' query:', insertQuery);
      if (err) {
        console.error('🛑 Error saat insert:', err);
        return res
          .status(500)
          .json({ success: false, message: 'Gagal mendaftarkan user' });
      }

      return res.json({
        success: true,
        message: 'Pendaftaran berhasil',
        userId: result.insertId
      });
    });
  });
});

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

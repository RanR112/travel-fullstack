const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Konfigurasi database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "wjtour", // Ganti dengan nama database
});

// Koneksi ke database
db.connect((err) => {
    if (err) {
        console.error("Koneksi ke database gagal:", err);
        return;
    }
    console.log("Berhasil terhubung ke database.");
});

// Endpoint untuk mengambil data pembeli
app.get("/pembeli", (req, res) => {
    const query = "SELECT * FROM pembeli"; // Ganti dengan nama tabel
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Endpoint untuk menambah data pembeli
app.post("/pembeli", (req, res) => {
    const { nama, email } = req.body; // Ganti dengan kolom tabel
    const query = "INSERT INTO pembeli (nama, email) VALUES (?, ?)";
    db.query(query, [nama, email], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ message: "Data berhasil ditambahkan.", id: results.insertId });
        }
    });
});

// Endpoint untuk mengambil data transaksi
app.get("/transaksi", (req, res) => {
    const query = "SELECT * FROM transaksi"; // Ganti dengan nama tabel
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Endpoint untuk menambah data transaksi
app.post("/transaksi", (req, res) => {
    const { kode, id_pembeli, id_wisata, tanggal, jumlah, total, status} = req.body;

    if (!kode || !id_pembeli || !id_wisata || !jumlah || !total) {
        return res.status(400).json({ error: "Data tidak lengkap." });
    }

    const query = "INSERT INTO transaksi (kode, id_pembeli, id_wisata, tanggal, jumlah, total, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [kode, id_pembeli, id_wisata, tanggal, jumlah, total, status], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.json({ message: "Data berhasil ditambahkan.", id: results.insertId });
    });
});

// Endpoint untuk memperbarui status transaksi
app.put("/transaksi/:id", (req, res) => {
    const { id } = req.params; // ID transaksi dari parameter URL
    const { status } = req.body; // Status baru dari body request

    // Validasi input
    if (!status) {
        return res.status(400).json({ error: "Status tidak boleh kosong." });
    }

    // Query untuk memperbarui data transaksi
    const query = "UPDATE transaksi SET status = ? WHERE id = ?";
    db.query(query, [status, id], (err, results) => {
        if (err) {
            console.error("Gagal memperbarui transaksi:", err);
            return res.status(500).json({ message: "Terjadi kesalahan pada server." });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Transaksi tidak ditemukan." });
        }

        res.json({ message: "Status transaksi berhasil diperbarui." });
    });
});


// Fungsi untuk memuat dan memproses template HTML
const loadEmailTemplate = (data) => {
    const templatePath = path.join(__dirname, "email.html");
    let template = fs.readFileSync(templatePath, "utf8");
    
    // Ganti placeholder dalam template
    template = template.replace("${nama}", data.nama || "")
                       .replace("${destinasi}", data.destinasi || "")
                       .replace("${tanggal}", data.tanggal || "")
                       .replace("${kodeTransaksi}", data.kodeTransaksi || "")
                       .replace("${jumlah}", data.jumlah || "")
                       .replace("${totalHarga}", data.totalHarga || "");
    return template;
};

// Endpoint untuk mengirim email
app.post("/sendemail", async (req, res) => {
    const { nama, email, destinasi, tanggal, jumlah, kodeTransaksi, totalHarga } = req.body;

    const emailContent = loadEmailTemplate({
        nama,
        destinasi,
        tanggal,
        jumlah,
        kodeTransaksi,
        totalHarga,
    });

    // Konfigurasi Nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: "westjavatour.id@gmail.com",
            pass: "ussymcidxcjphnlg", // Pastikan password ini aman
        },
    });

    const mailOptions = {
        from: "WJ Tour <westjavatour.id@gmail.com>",
        to: email,
        subject: "Detail Pesanan Anda",
        html: emailContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email berhasil dikirim!" });
    } catch (error) {
        console.error("Error mengirim email:", error);
        res.status(500).json({ message: "Gagal mengirim email." });
    }
});

// Menjalankan server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

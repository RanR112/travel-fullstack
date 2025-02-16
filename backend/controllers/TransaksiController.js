const TransaksiModel = require("../models/Transaksi");

class TransaksiController {
    static getAll(req, res) {
        TransaksiModel.getAll((err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    }

    static create(req, res) {
        const { kode, id_pembeli, id_wisata, tanggal, jumlah, total, status } = req.body;

        if (!kode || !id_pembeli || !id_wisata || !jumlah || !total) {
            return res.status(400).json({ error: "Data tidak lengkap." });
        }

        TransaksiModel.create({ kode, id_pembeli, id_wisata, tanggal, jumlah, total, status }, (err, results) => {
            if (err) return res.status(500).send(err);
            res.json({ message: "Transaksi berhasil ditambahkan.", id: results.insertId });
        });
    }

    static updateStatus(req, res) {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: "Status tidak boleh kosong." });
        }

        TransaksiModel.updateStatus(id, status, (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Transaksi tidak ditemukan." });
            }
            res.json({ message: "Status transaksi berhasil diperbarui." });
        });
    }
}

module.exports = TransaksiController;

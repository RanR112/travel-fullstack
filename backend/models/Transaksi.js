const db = require("../config/db");

class TransaksiModel {
    static getAll(callback) {
        db.query("SELECT * FROM transaksi", callback);
    }

    static create({ kode, id_pembeli, id_wisata, tanggal, jumlah, total, status }, callback) {
        db.query(
            "INSERT INTO transaksi (kode, id_pembeli, id_wisata, tanggal, jumlah, total, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [kode, id_pembeli, id_wisata, tanggal, jumlah, total, status],
            callback
        );
    }

    static updateStatus(id, status, callback) {
        db.query("UPDATE transaksi SET status = ? WHERE id = ?", [status, id], callback);
    }
}

module.exports = TransaksiModel;

const PembeliModel = require("../models/Pembeli");

class PembeliController {
    static getAll(req, res) {
        PembeliModel.getAll((err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    }

    static create(req, res) {
        const { nama, email } = req.body;
        PembeliModel.create(nama, email, (err, results) => {
            if (err) return res.status(500).send(err);
            res.json({ message: "Pembeli berhasil ditambahkan.", id: results.insertId });
        });
    }
}

module.exports = PembeliController;

const db = require("../config/db");

class PembeliModel {
    static getAll(callback) {
        db.query("SELECT * FROM pembeli", callback);
    }

    static create(nama, email, callback) {
        db.query("INSERT INTO pembeli (nama, email) VALUES (?, ?)", [nama, email], callback);
    }
}

module.exports = PembeliModel;

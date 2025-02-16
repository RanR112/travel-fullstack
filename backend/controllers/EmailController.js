const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

class EmailController {
    static sendEmail(req, res) {
        const { nama, email, destinasi, tanggal, jumlah, kodeTransaksi, totalHarga } = req.body;

        const templatePath = path.join(__dirname, "../templates/email.html");
        let template = fs.readFileSync(templatePath, "utf8");

        template = template.replace("${nama}", nama)
                           .replace("${destinasi}", destinasi)
                           .replace("${tanggal}", tanggal)
                           .replace("${kodeTransaksi}", kodeTransaksi)
                           .replace("${jumlah}", jumlah)
                           .replace("${totalHarga}", totalHarga);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: "WJ Tour <westjavatour.id@gmail.com>",
            to: email,
            subject: "Detail Pesanan Anda",
            html: template,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) return res.status(500).json({ message: "Gagal mengirim email." });
            res.status(200).json({ message: "Email berhasil dikirim!" });
        });
    }
}

module.exports = EmailController;

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const pembeliRoute = require("./routes/PembeliRoute");
const transaksiRoute = require("./routes/TransaksiRoute");
const emailRoute = require("./routes/EmailRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/pembeli", pembeliRoute);
app.use("/transaksi", transaksiRoute);
app.use("/sendemail", emailRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server berjalan di travel-be-production.up.railway.app:${PORT}`));
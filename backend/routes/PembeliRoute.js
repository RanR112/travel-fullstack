const express = require("express");
const PembeliController = require("../controllers/PembeliController");

const router = express.Router();

router.get("/", PembeliController.getAll);
router.post("/", PembeliController.create);

module.exports = router;

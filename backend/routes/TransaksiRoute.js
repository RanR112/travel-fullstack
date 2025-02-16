const express = require("express");
const TransaksiController = require("../controllers/TransaksiController");

const router = express.Router();

router.get("/", TransaksiController.getAll);
router.post("/", TransaksiController.create);
router.put("/:id", TransaksiController.updateStatus);

module.exports = router;
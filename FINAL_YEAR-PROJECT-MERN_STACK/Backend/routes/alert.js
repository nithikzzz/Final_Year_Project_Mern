const express = require("express");
const router = express.Router();

const { ins, gee, dec } = require("../controllers/alertController");

router.post("/inss", ins);
router.get("/gett", gee);
router.delete("/dell/:id", dec);
module.exports = router;

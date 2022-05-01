const express = require("express");
const router = express.Router();

const { getLivePrice } = require("../controllers/price");

router.route("/prices").get(getLivePrice);


module.exports = router;

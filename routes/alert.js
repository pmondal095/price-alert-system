const express = require("express");


const router = express.Router();

const { createAlert, getAllAlerts } = require("../controllers/alert");


router.route("/alerts").get(getAllAlerts);
router.route("/alert").post(createAlert);

module.exports = router;

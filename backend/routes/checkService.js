const express = require("express");
const { checkService } = require("../kontri-api/soapClient");

const router = express.Router();

router.get("/", async (req, res) => {
    const resp = await checkService();
    if (resp === null) {
        res.json({ message: "Service is not available." });
        return;
    }
    res.json(resp);
});

module.exports = router;

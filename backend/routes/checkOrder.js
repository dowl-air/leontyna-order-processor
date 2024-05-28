const express = require("express");
const { getOrderStatus } = require("../kontri-api/soapClient");

const router = express.Router();

router.get("/", async (req, res) => {
    const orderID = req.query.orderID;
    const resp = await getOrderStatus(orderID);
    res.json(resp);
});

module.exports = router;

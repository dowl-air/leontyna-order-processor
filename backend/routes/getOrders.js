// routes/orders.js
const express = require("express");
const router = express.Router();

// Simulate fetching orders from a database (replace with your logic)
const orders = [
    { id: 1, status: "pending" },
    { id: 2, status: "completed" },
];

router.get("/", (req, res) => {
    res.json(orders);
});

module.exports = router;

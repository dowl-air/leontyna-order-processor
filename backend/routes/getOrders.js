const express = require("express");
const router = express.Router();

const SHOPTET_URL = process.env.SHOPTET_URL;

// Simulate fetching orders from a database (replace with your logic)
const orders = [
    { id: 1, status: "pending" },
    { id: 2, status: "completed" },
];

router.get("/", (req, res) => {
    res.json(orders);
});

router.get("/fetch/:source", async (req, res) => {
    const resp = await fetch(`${SHOPTET_URL}`);

    // parse csv from resp
    if (resp.ok) {
        const text = await resp.text();
        console.log(text);
    } else {
        console.error("Error fetching data");
    }

    res.json({ source: req.params.source });
});

module.exports = router;

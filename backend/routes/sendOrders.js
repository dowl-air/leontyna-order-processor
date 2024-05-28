const express = require("express");
const getNewOrder = require("../database/getNewOrder");
const getOrdersToResend = require("../database/getOrdersToResend");
const sendOrderHandler = require("../utils/sendOrderHandler");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let message = "";
        //get products that are not yet finished (but sent to Kontri) - there may be more orders
        const ordersToResend = await getOrdersToResend();
        if (ordersToResend) {
            console.log(`Orders (${ordersToResend.length}) to resend have been found.`);
            console.log("Resending orders to Kontri.");
            message += "Resent " + ordersToResend.length + " orders. Codes: ";
            for (const order of ordersToResend) {
                await new Promise((resolve) => setTimeout(resolve, 2500));
                const resp = await sendOrderHandler(order);
                message += resp.Code + ", ";
            }
            message += " | ";
        }

        // get new products from database
        const order = await getNewOrder();
        if (order) {
            console.log("New order has been created.");
            console.log("Sending order to Kontri.");
            await new Promise((resolve) => setTimeout(resolve, 2500));
            const resp = await sendOrderHandler(order);
            message += "Nová objednávka. Code: " + resp.Code;
        }
        res.json({ status: "Success", message });
    } catch (error) {
        //todo send mail to admin with error
        console.log(error);
        res.json({ status: "Error" });
    }
});

module.exports = router;

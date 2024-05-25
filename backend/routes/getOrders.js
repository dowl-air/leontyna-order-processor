const express = require("express");
let csv = require("csvtojson");
let request = require("request");

const addToDatabase = require("../database/addItem");
const getLatestDate = require("../database/getLatestDate");
const formatDateURL = require("../utils/formatDateURL");
const getShopOrders = require("../database/getShopOrders");

const router = express.Router();

const SHOPTET_URL = process.env.SHOPTET_URL;

router.get("/", async (req, res) => {
    const limit = req.query.limit || 0;
    const offset = req.query.offset || 0;
    const orders = await getShopOrders(limit, offset);
    res.json(orders);
});

router.get("/fetchOrders", async (req, res) => {
    const source = req.query.source || "cz";
    console.log("Fetching data from SHOPTET started.");

    const onError = (error) => {
        console.error(error);
        res.json({ message: "An error occurred while fetching data from shoptet." + source });
    };

    const onComplete = () => {
        console.log("Data from SHOPTET fetched succesfully.");
        res.json({ message: "Data fetched succesfully from shoptet." + source });
    };

    const date = await getLatestDate();
    console.log("Latest date in the database: ", date.toLocaleString());

    const dateFormated = formatDateURL(date);

    csv()
        .fromStream(request.get(`${SHOPTET_URL}&updateTimeFrom=${dateFormated}`))
        .subscribe(
            (json) => {
                return new Promise((resolve, reject) => {
                    // long operation for each json e.g. transform / write into database.
                    if (!json) return resolve();
                    if (json.hasOwnProperty("orderItemType") && json.orderItemType !== "product") return resolve();
                    if (json.hasOwnProperty("orderItemSupplier") && json.orderItemSupplier !== "Kontri.pl") return resolve();
                    if (json.hasOwnProperty("field13")) delete json.field13;

                    addToDatabase(json)
                        .then(() => {
                            resolve();
                        })
                        .catch((err) => {
                            console.error(err);
                            resolve();
                        });
                });
            },
            onError,
            onComplete
        );
});

module.exports = router;

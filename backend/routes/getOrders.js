const express = require("express");
let csv = require("csvtojson");
let request = require("request");

const addToDatabase = require("../database/addItem");
const getLatestDate = require("../database/getLatestDate");
const formatDateURL = require("../utils/formatDateURL");
const getShopOrders = require("../database/getShopOrders");

const router = express.Router();

const SHOPTET_URL = process.env.SHOPTET_URL;
const SHOPTET_URL_SK = process.env.SHOPTET_URL_SK;

router.get("/", async (req, res) => {
    const limit = req.query.limit || 0;
    const offset = req.query.offset || 0;
    const orders = await getShopOrders(limit, offset);
    res.json(orders);
});

router.get("/fetchOrders", async (req, res) => {
    console.log("Fetching data from SHOPTET started.");

    const date = await getLatestDate();
    console.log("Latest date in the database: ", date.toLocaleString());

    const dateFormatted = formatDateURL(date);

    const fetchAndProcessCSV = (url) => {
        return new Promise((resolve, reject) => {
            csv()
                .fromStream(request.get(`${url}&updateTimeFrom=${dateFormatted}`))
                .subscribe(
                    (json) => {
                        return new Promise((resolve, reject) => {
                            if (!json) return resolve();
                            if (json.hasOwnProperty("orderItemType") && json.orderItemType !== "product") return resolve();
                            if (json.hasOwnProperty("orderItemSupplier") && json.orderItemSupplier !== "Kontri.pl") return resolve();
                            if (json.hasOwnProperty("field13")) delete json.field13;

                            addToDatabase(json)
                                .then(() => resolve())
                                .catch((err) => {
                                    console.error(err);
                                    resolve();
                                });
                        });
                    },
                    (error) => {
                        console.error(error);
                        reject(error);
                    },
                    () => {
                        console.log(`Data from ${url} fetched successfully.`);
                        resolve();
                    }
                );
        });
    };

    try {
        await Promise.all([fetchAndProcessCSV(SHOPTET_URL), fetchAndProcessCSV(SHOPTET_URL_SK)]);
        res.json({ message: "Data from SHOPTET (cz/sk) fetched successfully." });
    } catch (error) {
        res.json({ message: "An error occurred while fetching data from SHOPTET." });
    }
});

module.exports = router;

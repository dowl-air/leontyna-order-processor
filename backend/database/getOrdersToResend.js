const { buildOrderObject } = require("../utils/buildOrderObject");
const connect = require("./connect");

const getOrdersToResend = async () => {
    const connection = await connect();

    const [rows] = await connection.execute(`
        SELECT * FROM KontriOrders WHERE code = 90;
    `);

    if (rows.length === 0) return null;

    const orders = [];

    for (const row of rows) {
        const [rows_] = await connection.execute(`
            SELECT * FROM OrderedItems WHERE kontriOrderID = "${row.AltumOrderID}";
        `);
        orders.push(buildOrderObject(rows_));
    }

    return orders;
};

module.exports = getOrdersToResend;

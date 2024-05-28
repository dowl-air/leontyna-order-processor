const connect = require("./connect");

const getShopOrders = async (limit, offset) => {
    const connection = await connect();

    const [rows] = await connection.execute(`
        SELECT OrderedItems.*, KontriOrders.AltumOrderID, KontriOrders.code AS kontriStatusCode, KontriOrders.statusName AS kontriStatusName
        FROM OrderedItems
        LEFT JOIN KontriOrders ON OrderedItems.kontriOrderID = KontriOrders.AltumOrderID
        ORDER BY OrderedItems.date DESC
        LIMIT ${limit} OFFSET ${offset};
    `);

    return rows;
};

module.exports = getShopOrders;

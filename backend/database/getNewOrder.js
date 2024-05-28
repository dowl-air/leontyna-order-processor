const { buildOrderObject } = require("../utils/buildOrderObject");
const connect = require("./connect");

const getNewOrder = async () => {
    const connection = await connect();

    const [rows] = await connection.execute(`
        SELECT * FROM OrderedItems WHERE kontriOrderID IS NULL ORDER BY date DESC;
    `);

    if (rows.length === 0) return null;

    return buildOrderObject(rows);
};

module.exports = getNewOrder;

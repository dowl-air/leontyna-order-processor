const connect = require("./connect");

const getShopOrders = async (limit, offset) => {
    const connection = await connect();

    const [rows] = await connection.execute(`
        SELECT * FROM OrderedItems
        ORDER BY date DESC
        LIMIT ${limit} OFFSET ${offset};
    `);

    return rows;
};

module.exports = getShopOrders;

const connect = require("./connect");

const updateProductsOrderID = async (orderID, products) => {
    const connection = await connect();

    for (const product of products) {
        await connection.execute(`
            UPDATE OrderedItems
            SET kontriOrderID = ${orderID}
            WHERE id = ${product.id};
        `);
    }
};

module.exports = updateProductsOrderID;

const connect = require("./connect");

const addNewOrder = async (AltumOrderID, OrderNumber, statusName, code) => {
    const connection = await connect();

    await connection.execute(`
        INSERT INTO KontriOrders (AltumOrderID, OrderNumber, date, statusName, code)
        VALUES (${AltumOrderID},${OrderNumber},${new Date().toISOString()},${statusName},${code});
    `);

    return;
};

module.exports = addNewOrder;

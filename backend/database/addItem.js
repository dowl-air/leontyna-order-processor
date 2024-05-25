const connect = require("./connect");

const addToDatabase = async (item) => {
    if (!item) return console.log("Empty item in addToDatabase function.");
    if (!item.code) return console.log("Empty item code in addToDatabase function.");

    const connection = await connect();

    await connection.execute(`
        INSERT IGNORE INTO OrderedItems (
            id,
            code,
            date,
            statusName,
            orderItemName,
            orderItemAmount,
            orderItemUnit,
            orderItemCode,
            orderItemManufacturer,
            orderItemVariantName,
            orderItemSupplier,
            orderItemEan
        ) VALUES (
            "${item.code}__${item.orderItemCode}",
            "${item.code}",
            "${item.date}",
            "${item.statusName}",
            "${item.orderItemName}",
            "${item.orderItemAmount}",
            "${item.orderItemUnit}",
            "${item.orderItemCode}",
            "${item.orderItemManufacturer}",
            "${item.orderItemVariantName}",
            "${item.orderItemSupplier}",
            "${item.orderItemEan}"
        );
    `);

    console.log(`Item ${item.code}__${item.orderItemCode} added to the database.`);
};

module.exports = addToDatabase;

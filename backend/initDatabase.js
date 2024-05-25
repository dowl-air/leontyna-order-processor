const connect = require("./database/connect");

async function initDatabase() {
    // long operation for database initialization
    const connection = await connect();

    await connection.execute(`
        CREATE TABLE IF NOT EXISTS OrderedItems (
            id VARCHAR(200) PRIMARY KEY,
            code VARCHAR(50) NOT NULL,
            date DATETIME NOT NULL,
            statusName VARCHAR(50) NOT NULL,
            orderItemName VARCHAR(300) NOT NULL,
            orderItemAmount INT NOT NULL,
            orderItemUnit VARCHAR(50) NOT NULL,
            orderItemCode VARCHAR(100) NOT NULL,
            orderItemManufacturer VARCHAR(50) NOT NULL,
            orderItemVariantName VARCHAR(100) NOT NULL,
            orderItemSupplier VARCHAR(50) NOT NULL,
            orderItemEan VARCHAR(50) NOT NULL
        );
    `);

    console.log("Database initialized");
}

module.exports = initDatabase;

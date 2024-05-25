const connect = require("./connect");

const getLatestDate = async () => {
    const connection = await connect();

    const [rows] = await connection.execute(`
        SELECT MAX(date) as date FROM OrderedItems;
    `);

    return new Date(rows[0].date);
};

module.exports = getLatestDate;

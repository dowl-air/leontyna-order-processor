const connect = require("./connect");

const changeProductProperty = async (id, property, propertyValue) => {
    const connection = await connect();
    await connection.execute(`
        UPDATE OrderedItems
        SET ${property} = ${propertyValue}
        WHERE id = ${id};
    `);
};

module.exports = changeProductProperty;

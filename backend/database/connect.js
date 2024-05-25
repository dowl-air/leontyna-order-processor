const mysql = require("mysql2/promise");

const connect = async () => {
    return await mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "my-db",
    });
};

module.exports = connect;

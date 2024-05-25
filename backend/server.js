const express = require("express");
const cors = require("cors");

const ordersRouter = require("./routes/getOrders");
const initDatabase = require("./initDatabase");

const app = express();
app.use(cors());

const port = 3001;

// init database
initDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.error("Failed to initialize the database:", err);
        process.exit(1);
    });

app.use("/api/orders", ordersRouter);

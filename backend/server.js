const express = require("express");
const cors = require("cors");

const ordersRouter = require("./routes/getOrders");
const checkServiceRouter = require("./routes/checkService");
const checkOrderRouter = require("./routes/checkOrder");
const sendOrdersRouter = require("./routes/sendOrders");
const initDatabase = require("./initDatabase");

const app = express();
app.use(cors());

const port = 3001;

// init database
initDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log("Server is running on port " + port);
        });
    })
    .catch((err) => {
        console.error("Failed to initialize the database:", err);
        process.exit(1);
    });

app.use("/api/orders", ordersRouter);
app.use("/api/checkService", checkServiceRouter);
app.use("/api/checkOrder", checkOrderRouter);
app.use("/api/sendOrders", sendOrdersRouter);

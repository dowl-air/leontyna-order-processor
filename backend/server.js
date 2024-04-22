const express = require("express");
const app = express();
const ordersRouter = require("./routes/getOrders");

const port = 3000;

app.use("/api/orders", ordersRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

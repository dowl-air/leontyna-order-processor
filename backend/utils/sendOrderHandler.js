const addNewOrder = require("../database/addOrder");
const changeProductProperty = require("../database/changeProductProperty");
const { sendOrder } = require("../kontri-api/soapClient");
const { findProductIDByAltumID } = require("./getProductAltumID");

const sendOrderHandler = async (orderObject) => {
    try {
        const { products, ...orderObjectCopy } = orderObject;
        console.log(orderObjectCopy);
        console.log("Sending order to Kontri.pl.");
        const resp = await sendOrder(orderObjectCopy);
        if (!resp.AddOrderResult) {
            console.log("Order has not been sent.");
            console.log(resp);
            return;
        }

        console.log(resp.AddOrderResult);
        const order = resp.AddOrderResult;

        switch (order.Code) {
            case 100:
            case 101:
                console.log("Order has been sent successfully.");
                console.log(order.Message);
                await addNewOrder(order.AltumOrderID, order.OrderNumber, "Objednáno", 100);
                await updateProductsOrderID(products, order.AltumOrderID);

                if (order.Shortages) {
                    for (const shortage of order.Shortages) {
                        const { AltumArticleID, Quantity } = shortage;
                        const productID = findProductIDByAltumID(AltumArticleID);
                        await changeProductProperty(productID, "shortage", Quantity);
                    }
                }
                return order;
            case 90:
            case 99:
                console.log("Order has been added successfully. (but not sent yet)");
                const tempCode = "TEMP_" + products[0].code;
                await addNewOrder(tempCode, "", "Přidáno", 90);
                await updateProductsOrderID(products, tempCode);
                return order;
            default:
                //todo send mail to admin (only some codes)
                console.log("Order has not been sent.");
                console.log("Error: " + order.Message);
                return order;
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = sendOrderHandler;

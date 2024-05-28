const buildOrderObject = (products) => {
    //todo change to products + change to function get altumID
    return {
        Segregation: true,
        NotifyWhenReadyToShip: false,
        ShipmentRecipientName: "Leontyna.cz",
        ShipmentStreetname: "Sirava",
        ShipmentHouseNumber: "27",
        ShipmentCity: "Prerov",
        ShipmentPostcode: "75002",
        ShipmentCountry: "CZ",
        AddOrderIfShortagesInStock: true,
        ShippingMethod: "DPD",
        PaymentMethod: "Prepayment",
        /* OrderedItems: products.map((product) => {
            const orderItemCodeParts = product.orderItemCode.split("-");
            const AltumArticleId = orderItemCodeParts[2];
            return {
                AltumArticleId,
                Amount: product.orderItemAmount,
                ClientOrderNumber: product.code,
            };
        }), */
        OrderedItems: [
            {
                AltumArticleId: "226383",
                Amount: 1,
                ClientOrderNumber: products[0].code,
            },
        ],
        products,
    };
};

module.exports = { buildOrderObject };

const getProductAltumID = (productID) => {
    const orderItemCodeParts = productID.split("-");
    return orderItemCodeParts[2];
};

const findProductIDByAltumID = (products, altumID) => {
    return products.find((product) => {
        const altumIDFromProduct = getProductAltumID(product.AltumArticleID);
        return altumIDFromProduct === altumID;
    });
};

module.exports = { getProductAltumID, findProductIDByAltumID };

export const triggerFeedDownload = async (source: string) => {
    const response = await fetch(`http://localhost:3001/api/orders/fetchOrders?source=${source}`, {cache: "no-store"});
    const data = await response.json();
    return data;
};

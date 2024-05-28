export const triggerOrdersSend = async () => {
    const response = await fetch(`http://localhost:3001/api/sendOrders`, {cache: "no-store"});
    const data = await response.json();
    return data;
};
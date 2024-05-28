"use server";
import { CheckOrderResponse } from "@/types/api/CheckOrderResponse";

export const checkOrder = async (orderNumber: string): Promise<CheckOrderResponse> => {
    try {
        //todo remove
        orderNumber = "5814361";
        const response = await fetch(`http://localhost:3001/api/checkOrder?orderID=${orderNumber}`, {cache: "no-store"});
        return await response.json() as CheckOrderResponse;
    } catch (error) {
        console.error(error);
        return {GetOrderStatusResult: {Code: 500, Message: "Error checking order status."}};
    }
}
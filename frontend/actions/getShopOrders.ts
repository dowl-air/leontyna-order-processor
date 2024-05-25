"use server";

import ShopOrder from "@/types/ShopOrder";

export const getShopOrders = async (limit : number, offset: number) : Promise<ShopOrder[]> => {
    const response = await fetch(`http://localhost:3001/api/orders?limit=${limit}&offset=${offset}`, {cache: "no-store"});
    const data = await response.json() as ShopOrder[];
    return data;
}
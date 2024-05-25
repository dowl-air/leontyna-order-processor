"use client";
import { useState } from "react";

import ShopOrder from "@/types/ShopOrder";
import { getShopOrders } from "@/actions/getShopOrders";
import { TABLE_ITEMS_FETCH_COUNT } from "@/utils/constants";
import { triggerFeedDownload } from "@/actions/triggerFeedDownload";

const ProductsTable = ({ initialShopOrders }: { initialShopOrders: ShopOrder[] }) => {
    const [shopOrders, setShopOrders] = useState(initialShopOrders);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);

    const refreshShopOrders = async () => {
        setLoading(true);
        const shopOrdersAPI = await getShopOrders(TABLE_ITEMS_FETCH_COUNT, 0);
        setShopOrders(shopOrdersAPI);
        setLoading(false);
    };

    const triggerFeedDown = async () => {
        setLoading(true);
        const resp = await triggerFeedDownload("cz");
        if (resp.message) {
            setMessages([...messages, resp.message]);
        }
        setTimeout(() => {
            setMessages([]);
        }, 5000);
        await refreshShopOrders();
        setLoading(false);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-2 w-full">
                <h2 className="text-2xl font-bold px-4">
                    <span className="text-primary">Kontri</span> produkty z objednávek [CZ]
                </h2>
                <div className="flex gap-2">
                    <button className="btn btn-square btn-outline btn-primary" onClick={refreshShopOrders}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                            <path d="M16 16h5v5" />
                        </svg>
                    </button>
                    <button className="btn btn-outline btn-primary" onClick={triggerFeedDown}>
                        Vynutit stažení feedu [CZ]
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto max-h-[calc(100vh-72px-48px-8px)] w-full">
                {!loading ? (
                    <table className="table table-pin-rows">
                        <thead className="">
                            <tr>
                                <th>Kód objednávky</th>
                                <th>Datum</th>
                                <th>Kód produktu</th>
                                <th>Název produktu</th>
                                <th>Počet</th>
                                <th>Výrobce</th>
                                <th>Stav dodání</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {shopOrders.map((order) => (
                                <tr key={order.id}>
                                    <th>{order.code}</th>
                                    <td className="text-nowrap">{new Date(order.date).toLocaleString("cs")}</td>
                                    <td>{order.orderItemCode}</td>
                                    <td>{order.orderItemName}</td>
                                    <td>
                                        {order.orderItemAmount} {order.orderItemUnit}
                                    </td>
                                    <td>{order.orderItemManufacturer}</td>
                                    <td>
                                        <div className="badge badge-success">Objednáno</div>
                                    </td>
                                    <td>
                                        <button className="btn btn-primary btn-xs text-nowrap">Dotaz na stav</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex flex-col w-full items-center">
                        <span className="loading loading-infinity w-20 mt-16"></span>
                        <p>Načítá se...</p>
                    </div>
                )}
            </div>

            <div className="toast toast-start">
                {messages.map((message, index) => (
                    <div key={index} className="alert alert-info">
                        <span>{message}</span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductsTable;

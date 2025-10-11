"use client";

import Link from "next/link";
import DeleteOrderItemComponent from "@/app/order/[id]/(components)/delete-order-item-component";
import {OrderItem} from "@/app/order/[id]/page";
import {useState} from "react";
import EditOrderItemComponent from "@/app/order/[id]/(components)/edit-order-item-component";

export default  function ItemDetailsPage(props: {id: string, orderItems: OrderItem[]}) {
    const [enable, setEnable] = useState(false);

    return (
        <div>
            <div className={"place-self-end"}>
                <Link href={`/order/${props.id}/item/create`} className={"rounded p-2 text-white bg-blue-800 hover:bg-blue-400"}>
                    Add Item
                </Link>
            </div>
            { props.orderItems.length > 0 ? (
                <table className={"mt-4 min-w-full divide-y divide-gray-200 text-sm"}>
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">ID</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Name</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">price</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Quantity</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={enable} onChange={(e) => setEnable(e.target.checked)} className="sr-only peer"/>
                                <div
                                    className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                            </label>
                        </th>

                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                    {props.orderItems.map((item: OrderItem) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{item.id}</td>
                            <td className="px-4 py-2">{item.name}</td>
                            <td className="px-4 py-2">£{item.price}</td>
                            <td className="px-4">x{item.quantity}</td>
                            <td>
                                {enable ? (
                                    <DeleteOrderItemComponent id={item.orderId} itemId={item.id}/>
                                ) : (
                                    <EditOrderItemComponent id={item.orderId} itemId={item.id}/>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (<div className={"flex place-content-center px-12 pt-8 text-gray-600 bg-gray-50 mt-5"}>
                No Items Registered
            </div>)}
        </div>
    )
}
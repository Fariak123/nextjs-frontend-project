import {Order} from "@/app/page";
import Link from "next/link";
import DeleteOrderComponent from "@/app/order/[id]/(components)/delete-order-component";

interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    orderId: number;
}

export default async function OrderPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    const res = await fetch(`http://localhost:8000/order/${id}`, {
        method: 'GET',
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error("Failed to fetch order.");
    }
    const order: Order = await res.json();

    const resItem = await fetch(`http://localhost:8000/order/${id}/items`, {
        method: 'GET',
        cache: 'no-store',
    })
    if (!resItem.ok) {
        throw new Error("Failed to fetch order items.");
    }
    const orderItems = await resItem.json();

    return (
        <div className="p-5">
            <div className="flex justify-between">
                <Link
                    href={`/`}
                    className="inline-flex items-center rounded px-2 py-1 text-gray-600 hover:text-gray-800"
                >
                    {"< Back"}
                </Link>
                <DeleteOrderComponent id={order.id} />
            </div>

            <h1><strong>Order #{order.id}</strong></h1>
            {
                <li key={order.id} className="flex border p-3 m-1 rounded max-w-[350px] min-w-64">
                    <div>
                        <p>Status: {order.order_status}</p>
                        <p>Payment: {order.payment_status} ({order.payment_method})</p>
                        <p className="text-gray-500">Created At: {order.created_at}</p>
                    </div>
                </li>
            }
            { orderItems.length > 0 ? (
                <table className={"min-w-full divide-y divide-gray-200 text-sm"}>
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">ID</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Name</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">price</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Quantity</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                    {orderItems.map((item: OrderItem) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{item.id}</td>
                            <td className="px-4 py-2">{item.name}</td>
                            <td className="px-4 py-2">£{item.price}</td>
                            <td className="px-4 py-2">x{item.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (<div className={"flex place-content-center px-12 pt-8 text-gray-600 bg-gray-50 mt-5"}>
                No Items Registered
            </div>)}
        </div>
    );
}
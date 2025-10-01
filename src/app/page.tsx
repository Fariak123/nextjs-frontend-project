import Link from "next/link";

export interface Order {
    id: number;
    payment_method: string;
    payment_status: string;
    order_status: string;
    created_at: string;
}

export default async function Home() {
    const res = await fetch('http://localhost:8000/orders', {
        method: 'GET',
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error("Failed to fetch orders.");
    }
    const orders = await res.json();
    return (
        <div className="p-5">
            <div className="flex justify-between">
                <strong>Dashboard</strong>
                <button className={"bg-blue-800 p-2 text-white rounded hover:bg-blue-400"}>Create order</button>
            </div>
            {orders.map((order: Order) => (
                <li key={order.id} className="flex justify-between border p-3 m-1 rounded max-w-[30%] min-w-64">
                    <div>
                        <p><strong>Order #{order.id}</strong></p>
                        <p>Status: {order.order_status}</p>
                        <p>Payment: {order.payment_status} ({order.payment_method})</p>
                        <p>Created At: {order.created_at}</p>
                    </div>
                    <span className="text-gray-500 content-center">
                        <Link href={`/order/${order.id}`}>&gt;</Link>
                    </span>
                </li>
            ))}
        </div>
    );
}

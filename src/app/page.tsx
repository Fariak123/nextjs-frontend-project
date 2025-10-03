import Link from "next/link";
import CreateOrderComponent from "@/app/(components)/create-order-component";

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
            <div className="flex justify-between mb-4">
                <strong>Dashboard</strong>
                <CreateOrderComponent/>
            </div>

            <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                {orders.map((order: Order) => (
                    <div key={order.id}
                        className="flex justify-between p-4 border rounded shadow bg-white">
                        <div>
                            <p className="font-bold">Order #{order.id}</p>
                            <p>Status: {order.order_status}</p>
                            <p>Payment: {order.payment_status} ({order.payment_method})</p>
                            <p className="text-gray-500">Created At: {order.created_at}</p>
                        </div>
                        <span className="text-gray-500 self-center pr-3">
                            <Link href={`/order/${order.id}`}>&gt;</Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>

    );
}

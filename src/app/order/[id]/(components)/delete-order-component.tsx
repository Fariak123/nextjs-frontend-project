"use client";
import { useRouter } from "next/navigation";

export default function DeleteOrderComponent(params: {id: number}) {
    const router = useRouter();
    const deleteOrder = async (id: number) => {
        const resDelete = await fetch(`http://localhost:8000/order/delete/${id}`, {
            method: 'DELETE',
        })
        if (resDelete.ok) {
            router.push("/");
            router.refresh();
        } else throw new Error("Failed to delete order.");
    }

    return (
        <button
            onClick={() => deleteOrder(params.id)}
            className="inline-flex items-center rounded px-2 py-1 bg-red-600 text-white hover:text-red-800 hover:bg-gray-200"
        >
            {"Delete"}
        </button>
    )
}
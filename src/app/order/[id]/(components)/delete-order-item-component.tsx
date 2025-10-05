"use client";
import { useRouter } from "next/navigation";

export default function DeleteOrderItemComponent(params: {id: number, itemId: number}) {
    const router = useRouter();
    const deleteOrderItem = async (id: number, itemId: number) => {
        const resDelete = await fetch(`http://localhost:8000/order/${id}/item/${itemId}/delete`, {
            method: 'DELETE',
        })
        if (resDelete.ok) {
            router.refresh();
        } else throw new Error("Failed to delete order.");
    }

    return (
        <button
            onClick={() => deleteOrderItem(params.id, params.itemId)}
            className="inline-flex items-center rounded px-2 py-1 bg-red-600 text-white hover:text-red-800 hover:bg-gray-200"
        >
            {"Remove"}
        </button>
    )
}
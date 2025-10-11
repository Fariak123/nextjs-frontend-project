"use client"
import { useRouter, useParams } from "next/navigation";

export default function EditOrderItemComponent(params: {id: number, itemId: number}) {
    const router = useRouter();

    return (
        <div>
            <button
                onClick={() => router.push(`/order/${params.id}/item/${params.itemId}`)}
                className="inline-flex items-center rounded px-2 py-1 bg-blue-600 text-white hover:text-red-800 hover:bg-gray-200"
            >
                {"Edit"}
            </button>
        </div>
    )
}
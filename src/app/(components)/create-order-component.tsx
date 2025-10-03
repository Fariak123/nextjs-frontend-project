"use client"
import { useRouter } from "next/navigation";

export default function CreateOrderComponent() {
    const router = useRouter();
    const handleCLick = () => {
        router.push("/order/create");
    }
    return (
        <button onClick={handleCLick} className={"bg-blue-800 p-2 text-white rounded hover:bg-blue-400"}>Create order</button>
    )
}
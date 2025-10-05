"use client";
import { useRouter, useParams } from "next/navigation";
import React, {useState} from "react";

type FormState = {
    name: string;
    price: number | "";
    quantity: number | "";
};

export default function OrderItemCreatePage() {
    const router = useRouter();
    const { id } = useParams();

    const [form, setForm] = useState<FormState>({
        name: "",
        price: "",
        quantity: "",
    });

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === "number") {
            const n = value === "" ? "" : Number(value)
            setForm((f) => ({ ...f, [name]: n }))
            return;
        }

        setForm((f) => ({ ...f, [name]: value }))
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErr(null);

        if (!form.name.trim()) return setErr("Name is required.");
        if (form.price === "" || form.price <= 0) return setErr("Price must be > 0.");
        if (form.quantity === "" || form.quantity <= 0) return setErr("Quantity must be > 0.");

        try {
            setLoading(true);
            const res = await fetch(`http://localhost:8000/order/${id}/item/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    price: form.price,
                    quantity: form.quantity,
                    orderId: id
                })
            })
           if (!res.ok) throw new Error(`Failed with status ${res.status}`);
           setForm({ name: "", price: "", quantity: "" });
            router.push(`/order/${id}`);
            router.refresh();
        } catch (error: any) {
            setErr(error.message ?? "Submit failed!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-3 w-[80%] sm:w-[60%] md:w-[40%] mx-auto place-self-center">
            <button
                onClick={() => router.push(`/order/${id}`)}
                className="inline-flex items-center rounded px-2 py-1 text-gray-600 hover:text-gray-800">
                {"< Back"}
            </button>
            <h1 className="font-bold">Add order item Form</h1>
            <div className="p-5 bg-gray-50 rounded-[6%] mt-5">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="mt-6 space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 min-w-[64px]" htmlFor="name">Item name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border px-3 py-2"
                                    placeholder="Notebook"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="price">
                                    Price
                                </label>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    min={0}
                                    value={form.price}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border px-3 py-2"
                                    placeholder="3.99"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="quantity">
                                    Quantity
                                </label>
                                <input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    min={1}
                                    value={form.quantity}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border px-3 py-2"
                                    placeholder="1"
                                />
                            </div>
                        </div>
                        <div className="place-self-end">
                            <button
                                type="submit"
                                className="mt-10 px-4 py-2 bg-green-400 rounded text-white hover:bg-green-700">
                                {loading ? "Submitting..." : "Submit Item"}
                            </button>
                        </div>
                    </fieldset>
                </form>
                {err && <p className="text-red-600 mt-3">{err}</p>}
            </div>
        </div>
    )
}
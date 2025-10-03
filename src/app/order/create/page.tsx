"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderCreatePage() {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        if (!paymentMethod) {
            setError("Please select a payment method");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`http://localhost:8000/order/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    payment_method: paymentMethod,
                    payment_status: 'not paid',
                    order_status: 'pending',
                    created_at: new Date().toString(),
                })
            })

            if (!res.ok) {
                throw new Error(`Failed with status ${res.status}`);
            }
            router.push("/");
            router.refresh();
        } catch (error: any) {
            setError(error.message ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-5 max-w-[55%] min-w-[50%] place-self-center ">
            <button onClick={() => router.push("/")}>{"< Back"}</button>
            <h1 className="font-bold">Create Order Form</h1>
            <div className="p-5 bg-gray-50 rounded-[6%] mt-5">
                <form>
                    <fieldset>
                        <legend className="text-sm font-semibold text-gray-900">
                            Payment method
                        </legend>
                        <p className=" text-sm text-gray-600">
                            Attention. By choosing BNB crypto method, do not forget about adding 1 USDT (service fee).
                        </p>

                        <div className="mt-6 space-y-6">
                            <div className="flex items-center gap-x-3">
                                <input
                                    id="cash"
                                    type="radio"
                                    name="payment_method"
                                    value="cash"
                                    onChange={handleChange}
                                    checked={paymentMethod === "cash"}
                                />
                                <label htmlFor="cash">Cash</label>
                            </div>

                            <div className="flex items-center gap-x-3">
                                <input
                                    id="card"
                                    type="radio"
                                    name="payment_method"
                                    value="card"
                                    onChange={handleChange}
                                    checked={paymentMethod === "card"}
                                />
                                <label htmlFor="card">Debit/Credit Card</label>
                            </div>

                            <div className="flex items-center gap-x-3">
                                <input
                                    id="crypto"
                                    type="radio"
                                    name="payment_method"
                                    value="crypto"
                                    onChange={handleChange}
                                    checked={paymentMethod === "crypto"}
                                />
                                <label htmlFor="crypto">Crypto (USDT)</label>
                            </div>
                        </div>
                        <div className="place-self-end">
                            <button
                                onClick={handleSubmit}
                                className="mt-15 px-4 py-2 bg-green-400 rounded text-white hover:bg-green-700">
                                Submit
                            </button>
                        </div>
                    </fieldset>
                </form>
                {error && <p className="text-red-600 mt-3">{error}</p>}
                {success && (
                    <p className="text-green-600 mt-3">Order created successfully!</p>
                )}
            </div>
        </div>
    );
}

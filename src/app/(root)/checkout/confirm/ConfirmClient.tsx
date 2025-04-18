// app/checkout/confirm/ConfirmClient.tsx
"use client"

import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"

export default function ConfirmClient() {
    const router = useRouter()
    const { product, quantity } = useSelector((state: RootState) => state.cartReducer)

    if (!product) {
        return <div className="text-center text-xl text-red-500 py-10">No product selected. Go back and choose something.</div>
    }

    const userDetails = useUser();
    const userEmail = userDetails.user?.primaryEmailAddress
    console.log(userEmail);


    const totalPrice = quantity * product.price

    const handleConfirm = async () => {
        const response = await fetch('/api/send-order-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: userEmail, // Client email
                userEmail,
                product,
                quantity,
            }),
        });

        if (response.ok) {
            alert("Order confirmed and emails sent!");
            router.push("/");
        } else {
            alert("Failed to confirm order.");
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-6">
            <h1 className="text-3xl font-bold">Confirm Your Order</h1>
            <div className="flex gap-6">
                <div className="relative w-40 h-40">
                    <Image
                        src={product.images?.[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded-xl"
                    />
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p className="text-gray-600">{product.description}</p>
                    </div>
                    <div className="text-lg font-medium">
                        Quantity: <span className="font-bold">{quantity}</span>
                    </div>
                    <div className="text-lg text-green-700 font-semibold">
                        Total: ₹{totalPrice.toLocaleString("en-IN")}
                    </div>
                </div>
            </div>

            <button
                onClick={handleConfirm}
                className="mt-6 w-full bg-black text-white px-6 py-4 rounded-xl shadow hover:scale-105 active:scale-95 transition-transform text-lg"
            >
                Confirm Order
            </button>
        </div>
    )
}

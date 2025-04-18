"use client";

import { formatPrice } from "@/lib/utils";
import { useAppSelector } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ConfirmClient() {
  const router = useRouter();
  const cartItem = useAppSelector((state) => state.cartReducer.items);
  const userDetails = useUser();
  const userEmail = userDetails.user?.primaryEmailAddress;

  if (!cartItem || cartItem.length === 0) {
    return (
      <div className="text-center text-xl text-brown-700 py-16">
        No product selected. Go back and choose something.
      </div>
    );
  }

  const quantity = cartItem[0].quantity;
  const product = cartItem[0];
  const totalPrice = quantity * product.price;

  const handleConfirm = async () => {
    const response = await fetch("/api/send-order-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: userEmail,
        userEmail,
        product,
        quantity,
      }),
    });

    if (response.ok) {
      toast.success("Order confirmed and emails sent!", {
        duration: 2000,
      });
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      alert("Failed to confirm order.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 space-y-10 bg-brown-50 rounded-2xl border border-brown-200 shadow-xl">
      <h1 className="text-4xl font-bold text-center text-brown-800 tracking-wide">
        Confirm Your Order
      </h1>

      <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex-shrink-0 border border-brown-200 rounded-2xl overflow-hidden shadow-md">
          <Image
            src={product?.images?.[0] || "/placeholder.svg"}
            alt={product?.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-between w-full">
          <div>
            <h2 className="text-2xl font-semibold text-brown-900">
              {product?.name}
            </h2>
            <p className="text-brown-600 mt-3 leading-relaxed">
              {product?.description}
            </p>
          </div>
          <div className="mt-6 space-y-2">
            <p className="text-lg text-brown-700 font-medium">
              Quantity: <span className="font-bold">{quantity}</span>
            </p>
            <p className="text-xl font-semibold text-brown-800">
              Total: {formatPrice(totalPrice)}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleConfirm}
        className="w-full bg-brown-700 text-white px-6 py-4 rounded-xl font-medium hover:bg-brown-800 active:scale-95 transition-transform text-lg shadow-md"
      >
        Confirm Order
      </button>
    </div>
  );
}

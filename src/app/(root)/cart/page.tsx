"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CardAside from "./_components/cart-aside";
import CartItemCard from "./_components/cart-item-card";
import { useAppSelector } from "@/store/store";

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cartReducer.items) || [];
  const router = useRouter();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-brown-50 flex flex-col justify-center items-center px-4 text-center">
        <h1 className="text-4xl font-extrabold text-brown-heading mb-10 tracking-wide">
          Your Shopping Cart
        </h1>
        <div className="w-full max-w-md h-[50vh] flex items-center justify-center flex-col">
          <div className="w-24 h-24 bg-brown-200/50 rounded-full flex items-center justify-center shadow-inner mb-6">
            <ShoppingBag className="h-12 w-12 text-brown-heading" />
          </div>
          <h2 className="text-2xl font-semibold text-brown-text mb-2">
            Your cart is empty
          </h2>
          <p className="text-brown-text/70 mb-6 max-w-md mx-auto">
            Looks like you haven’t added any luxurious treats yet. Start browsing our premium collection.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-brown-heading to-brown-text text-white font-medium rounded-full shadow-md hover:opacity-90 transition-all px-8 py-5"
          >
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-brown-50 px-4 lg:px-12 py-6 lg:py-10 overflow-hidden">
      <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-brown-heading to-brown-text mb-10 text-center tracking-wider">
        Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100%-5rem)]">
        {/* Scrollable Cart Section */}
        <div className="lg:col-span-2 overflow-y-auto pr-2 custom-scrollbar">
          <Card className="border border-brown-200 bg-white shadow-xl rounded-2xl overflow-hidden mb-6">
            <CardHeader className="border-b bg-brown-50/50">
              <CardTitle className="text-xl text-brown-heading font-semibold">
                Cart Items ({cartItems.length})
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div className="divide-y">
                {cartItems.map((item: any) => (
                  <CartItemCard key={item.ID} item={item} />
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 mb-10">
            <Button
              variant="outline"
              onClick={() => router.push("/products")}
              className="rounded-full border-brown-300 text-brown-heading hover:bg-brown-100 hover:border-brown-400 transition-all w-full sm:w-auto"
            >
              Continue Shopping
            </Button>
          </div>
        </div>

        {/* Static Sidebar */}
        <div className="lg:col-span-1">
          <CardAside />
        </div>
      </div>
    </div>
  );
}

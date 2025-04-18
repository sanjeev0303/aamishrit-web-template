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

  // Calculate totals

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 pt-2 mt-12">
        <h1 className="lg:text-3xl text-2xl text-brown-text font-bold mb-8">
          Your Shopping Cart
        </h1>
        <div className="text-center w-full h-[50vh] flex items-center justify-center flex-col">
          <div className="mx-auto w-24 h-24 bg-brown-light-text/50 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="h-12 w-12 text-brown-heading " />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-brown-text">
            Your cart is empty
          </h2>
          {/* <p className=" mb-8 text-brown-text/80">Looks like you haven't added anything to your cart yet.</p> */}
          <Button
            asChild
            size="lg"
            className="bg-brown-heading text-brown-light-text hover:bg-brown-heading/90"
          >
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:pt-24 sm:pt-10 overflow-y-hidden pb-10">
      <h1 className="text-3xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-brown-heading to-brown-text overflow-y-hidden">
        Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-y-hidden">
        <div className="lg:col-span-2 items-center">
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardHeader className=" h-full border-b ">
              <CardTitle className="text-xl text-gray-900">
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

          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() => router.push("/products")}
              className="rounded-full border-gray-200 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200"
            >
              Continue Shopping
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/checkout")}
              className="rounded-full border-gray-200 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200"
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardAside />
      </div>
    </div>
  );
}

"use client";

import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { addToCart, openCart } from "@/store/slices/cartSlice";
import {
    clearWishlist,
    removeFromWishlist,
} from "@/store/slices/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Product } from "@/types";
import { useEffect, useState } from "react";

const WishlistPage = () => {
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items || []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRemoveItem = (productId: string, productName: string) => {
    dispatch(removeFromWishlist(productId));
    toast.success(`${productName} removed from wishlist`);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product }));
    dispatch(openCart());
    toast.success(`${product.name} added to cart`);
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast.success("Wishlist cleared");
  };

  if (!mounted) {
    return null;
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 pt-16">
        <h1 className="text-3xl font-bold mb-8 text-brown-800">
          Your Wishlist
        </h1>
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-brown-200 rounded-full flex items-center justify-center mb-6">
            <Heart className="h-12 w-12 text-cocoa/80" />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-brown-800/90">
            Your wishlist is empty
          </h2>
          <p className=" mb-8 text-brown-700/90">Save items you love for later.</p>
          <Button asChild size="lg" className="bg-brown-300 hover:bg-brown-200 text-brown-700 hover:text-brown-800">
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!mounted) {
    return null; // Prevents hydration error
  }

  console.log("wishlist item: ", wishlistItems.map((item) => console.log("item: ", item.ID)
   ));


  return (
    <div className="container mx-auto px-4 py-12 pt-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brown-800">Your Wishlist</h1>
        <Button
          variant="outline"
          className="text-brown-700 bg-brown-300 border-brown-800 hover:bg-brown-200 hover:text-brown-700"
          onClick={handleClearWishlist}
        >
          Clear Wishlist
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.price} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={
                  item.images && item.images.length > 0
                    ? item.images[0]
                    : "/placeholder.svg?height=300&width=300"
                }
                alt={item.name}
                fill
                className="object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-brown-300 hover:bg-brown-200 rounded-full text-brown-700 hover:text-red-600"
                onClick={() => handleRemoveItem(String(item.ID), item.name)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                <Link
                href={`/products/${item.ID}}`}
                className="font-medium hover:underline"
              >
                {item.name}
              </Link>
              <div className="mt-2 font-bold">{formatPrice(item.price)}</div>
                </div>
                <div>
                <div className="w-10 h-10 bg-brown-300 text-brown-700 hover:bg-brown-200 flex items-center justify-center rounded-full" onClick={() => handleAddToCart(item)}>
                <ShoppingCart className="h-6 w-6 p-[2px]" />
              </div>
                </div>
              </div>
            </CardContent>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;

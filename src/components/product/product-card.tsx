"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import { addToCart, openCart } from "@/store/slices/cartSlice";
import { addToWishlist } from "@/store/slices/wishlistSlice";
import { useAppDispatch } from "@/store/store";
import type { Product } from "@/types";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ ...product }));
    dispatch(openCart());
    toast.success(`${product.name} added to cart`);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToWishlist(product));
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist`
    );
  };

  const handleCardClick = () => {
    router.push(`/products/${product.ID}`);
  };

  return (
    <div
  className="group rounded-3xl bg-brown-50 border border-brown-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col"
  onClick={handleCardClick}
>
  {/* Product Image Section */}
  <div className="relative h-64 sm:h-72 lg:h-80 xl:h-96 w-full bg-brown-100 rounded-t-3xl overflow-hidden">
    <Image
      src={product.images[0] || "/placeholder.svg"}
      alt={product.name}
      fill
      className="object-contain transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-brown-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Wishlist & Cart Icons */}
    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
      <div
        onClick={handleAddToWishlist}
        className="p-2 bg-white/80 rounded-full shadow-md backdrop-blur-sm hover:scale-105 transition"
      >
        <Heart
          className={cn(
            "h-5 w-5 text-brown-600 hover:text-brown-800 transition-colors",
            isWishlisted && "text-rose-600"
          )}
        />
      </div>
      <div
        onClick={handleAddToCart}
        className="p-2 bg-white/80 rounded-full shadow-md backdrop-blur-sm hover:scale-105 transition"
      >
        <ShoppingCart className="w-5 h-5 text-brown-600 hover:text-brown-800 transition-colors" />
      </div>
    </div>
  </div>

  {/* Product Info Section */}
  <div className="p-5 flex flex-col justify-between flex-1">
    <div>
      <h3 className="font-semibold text-lg text-brown-800 mb-1 line-clamp-1 transition-colors group-hover:text-brown-700">
        {product.name}
      </h3>
      <p className="text-brown-700 text-xl font-bold">
        {formatPrice(product.price)}
      </p>
    </div>

    {/* Add to Cart (Mobile View) */}
    <Button
      className="w-full mt-4 rounded-full bg-brown-700 hover:bg-brown-800 text-white md:hidden"
      onClick={handleAddToCart}
    >
      Add to Cart
    </Button>
  </div>
</div>

  );
}

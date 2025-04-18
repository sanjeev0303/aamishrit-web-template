"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { ShoppingCart, Heart } from "lucide-react"
import type { Product } from "@/types"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store/store"
import { addToCart, openCart } from "@/store/slices/cartSlice"
import { addToWishlist } from "@/store/slices/wishlistSlice"
import { Badge } from "../ui/badge"
import clsx from "clsx"
import { cn, formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  console.log("Product card: ", product);


  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addToCart({ ...product }))
    dispatch(openCart())
    toast.success(`${product.name} added to cart`)
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addToWishlist(product))
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted
      ? `${product.name} removed from wishlist`
      : `${product.name} added to wishlist`)
  }



  const handleCardClick = () => {
    router.push(`/products/${product.ID}`)
  }

  return (
    <div
      className="group overflow-hidden border-0 cursor-pointer"
      onClick={handleCardClick}
    >
          {/* Product Image */}
          <div className="relative h-100 w-full overflow-hidden bg-gray-100 rounded-lg">
            <Image
              src={product.images[0] || "/placeholder.svg?height=300&width=300"}
              alt={product.name}
              fill
              className="object-cover product-image"
            />

            {/* Sale Badge */}
          {/* {product.onSale && <Badge className="absolute top-2 left-2 product-badge bg-red-500 text-white">Sale</Badge>} */}


            <div onClick={handleAddToWishlist} className={cn("absolute top-2 right-2 w-9 h-9 rounded-full bg-brown-light-text flex items-center justify-center", isWishlisted && "bg-rose-300 text-rose-800")}>
            <Heart className={cn("h-5 w-5 text-brown-heading ", isWishlisted )} />
            </div>

          </div>



        {/* Product Info */}
        <div className="p-4">
          {/* Product Name */}
          <div className="flex items-center justify-between">
            <div>
            <h3 className="font-medium text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Price */}
          <div className="product-price">
            <span className="font-semibold text-gray-900">{formatPrice(product.price)}</span>
            {/* {product.originalPrice && <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>} */}
          </div>
            </div>
            <div>
            <Button
            className="w-full mt-3 rounded-full bg-inherit hover:bg-brand-700 hover:bg-brown-light-text"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-6 h-6 text-brown-heading" />
          </Button>
            </div>
          </div>

          {/* Add to Cart Button (Mobile) */}
          <Button
            className="w-full mt-3 rounded-full bg-brand-600 hover:bg-brand-700 md:hidden"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
  )
}

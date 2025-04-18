"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, ShoppingCart, Star, ChevronRight, ChevronLeft, Plus, Minus } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import Footer from "@/components/global/footer"

import ProductGridSkeleton from "./Product-grid-skeleton"
import ReviewSection from "./review-section"
import { getProductsById } from "@/api/products"
import { formatPrice } from "@/lib/utils"
import { Product } from "@/types"

interface ProductDetailPageProps {
    product: Product
}


export default function ProductDetailPage({product} : ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [showAllThumbnails, setShowAllThumbnails] = useState(false)


  // Fetch related products
//   const { data: relatedProducts, isLoading: isRelatedLoading } = useQuery({
//     queryKey: ["relatedProducts", params.id],
//     queryFn: () => getRelatedProducts(params.id),
//     staleTime: 60 * 1000,
//     enabled: !!product, // Only fetch when product data is available
//   })

  // Fetch product reviews
//   const { data: reviews, isLoading: isReviewsLoading } = useQuery({
//     queryKey: ["productReviews", params.id],
//     queryFn: () => getProductReviews(params.id),
//     staleTime: 60 * 1000,
//     enabled: !!product, // Only fetch when product data is available
//   })

  // Handle loading and error states
//   if (isProductLoading) {
//     return <ProductGridSkeleton />
//   }

//   if (isProductError) {
//     return (
//       <div className="container mx-auto px-4 py-12 text-center">
//         <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h2>
//         <p className="text-gray-700 mb-6">
//           {productError instanceof Error ? productError.message : "Failed to load product details"}
//         </p>
//         <Link href="/products">
//           <Button>Return to Products</Button>
//         </Link>
//       </div>
//     )
//   }

  if (!product) {
    return (
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-700 mb-6">The product you are looking for does not exist or has been removed.</p>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    )
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % (product.images?.length ?? 1))
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + (product.images?.length ?? 1)) % (product.images?.length ?? 1))
  }

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist)

    toast(!isInWishlist ? "Added to Wishlist" : "Removed from Wishlist", {
      description: !isInWishlist
        ? `${product.name} has been added to your wishlist.`
        : `${product.name} has been removed from your wishlist.`,
    })
  }

  const handleAddToCart = () => {
    toast.success("Added to Cart", {
      description: `${quantity} x ${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-dvh bg-[#FDF7F0] font-serif text-[#6B4226]">
  {/* Main Content */}
  <main className="container mx-auto px-4 mt-16 pt-2">
    <div className="mb-8 flex items-center">
      <Link href="/products" className="flex items-center text-[#8B5A2B] hover:text-[#6B4226] transition-colors">
        <ArrowLeft className="h-5 w-5 mr-2" />
        <span className="text-lg">Back to Products</span>
      </Link>
    </div>

    {/* Product Details - Main Section with 70/30 split */}
    <div className="flex flex-col lg:flex-row gap-10 mb-16">
      {/* Product Images - 70% width section */}
      <div className="lg:w-[70%] space-y-6">
        <div className="relative rounded-2xl overflow-hidden border border-[#E6D5C1] shadow-sm h-[400px] md:h-[600px] bg-white">
          <Image
            src={(product.images?.[selectedImage] ?? "/placeholder.svg?height=600&width=600")}
            alt={product.name || "Product image"}
            fill
            className="object-contain p-6"
          />
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-[#6B4226]" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-[#6B4226]" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {product.images?.slice(0, showAllThumbnails ? product.images.length : 4).map((image: string, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                selectedImage === index ? "border-[#8B5A2B]" : "border-[#EBDDC9]"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image || "/placeholder.svg?height=100&width=100"}
                alt={`${product.name} thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="object-cover w-24 h-24"
              />
            </button>
          ))}
          {product.images?.length > 4 && !showAllThumbnails && (
            <button
              onClick={() => setShowAllThumbnails(true)}
              className="flex-shrink-0 rounded-xl overflow-hidden border-2 border-[#D4B08C] w-24 h-24 flex items-center justify-center bg-[#F8EFE3]"
              aria-label="Show all thumbnails"
            >
              <Plus className="h-6 w-6 text-[#8B5A2B]" />
            </button>
          )}
        </div>
      </div>

      {/* Product Info - 30% width section with scrollable content */}
      <div className="lg:w-[30%] space-y-8 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product?.reviews?.[0]?.rating || 0)
                      ? "fill-[#8B5A2B] text-[#8B5A2B]"
                      : i < (product?.reviews?.[0]?.rating || 0)
                        ? "fill-[#8B5A2B] text-[#8B5A2B] opacity-50"
                        : "text-[#E6D5C1]"
                  }`}
                />
              ))}
            </div>
            <span className="text-[#8B5A2B] text-sm">
              {product?.reviews?.[0]?.rating || 0} ({product?.reviews?.[0]?.rating || 0} reviews)
            </span>
          </div>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-semibold text-[#6B4226]">{formatPrice(product?.price)}</span>
          {/* {product.originalPrice && (
            <span className="text-lg text-[#8B5A2B] line-through">{product.originalPrice}</span>
          )} */}
        </div>

        <p className="text-[#8B5A2B] leading-relaxed">{product?.description}</p>

        <div className="flex items-center gap-4">
          <span className={`font-medium ${product?.stock > 0 ? "text-emerald-600" : "text-red-600"}`}>
            {product?.stock > 0 ? `In Stock (${product?.stock} available)` : "Out of Stock"}
          </span>
        </div>

        <Separator className="border-[#E6D5C1]" />

        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[#6B4226] font-medium">Quantity:</span>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-8 w-8 rounded-r-none border-[#D4B08C]"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="h-8 px-5 flex items-center justify-center border-y border-[#D4B08C] bg-white">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                disabled={quantity >= product.stock}
                className="h-8 w-8 rounded-l-none border-[#D4B08C]"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              className="bg-[#8B5A2B] hover:bg-[#6B4226] text-white shadow-sm"
              disabled={product.stock <= 0}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant={isInWishlist ? "default" : "outline"}
              className={
                isInWishlist
                  ? "bg-[#6B4226] hover:bg-[#8B5A2B] text-white"
                  : "border-[#8B5A2B] text-[#8B5A2B] hover:bg-[#F8EFE3]"
              }
              onClick={toggleWishlist}
            >
              <Heart className={`h-5 w-5 mr-2 ${isInWishlist ? "fill-white" : ""}`} />
              {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
            </Button>
          </div>
        </div>

        <Separator className="border-[#E6D5C1]" />

        <div>
          <h3 className="font-semibold text-lg text-[#6B4226] mb-1">Product Details: </h3>
          <span className="text-[#8B5A2B] leading-tight">{product.description}</span>
          <ul className="grid grid-cols-1 gap-2 text-[#8B5A2B]">
            {/* <li>
              <span className="font-medium">Weight:</span> {product.weight}
            </li> */}
          </ul>
        </div>

        <Separator className="border-[#E6D5C1]" />

        <div>
          <h3 className="font-medium text-[#6B4226] mb-2">Features:</h3>
          <ul className="space-y-2">
            {/* {product.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-[#8B5A2B] flex items-center justify-center text-white mr-3 mt-0.5">
                  ✓
                </div>
                <span className="text-[#8B5A2B]">{feature}</span>
              </li>
            ))} */}
          </ul>
        </div>
      </div>
    </div>

    {/* Related Products */}
    {/* <RelatedProducts productId={params.id}
    // relatedProducts={relatedProducts}
    isLoading={isRelatedLoading}
    /> */}

    {/* Reviews Section */}
    {/* <ReviewSection
      productId={params.id}
      productRating={product?.reviews?.[0]?.rating || 0}
      reviewCount={product?.reviews?.[0]?.rating || 0}
    //   reviews={reviews}
    //   isLoading={isReviewsLoading}
    /> */}
  </main>
  <Footer />
</div>

  )
}

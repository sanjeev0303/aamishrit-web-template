"use client"

import ProductGridSkeleton from "./Product-grid-skeleton"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { fetchProducts, setCurrentPage } from "@/store/slices/productSlice"
import { useEffect } from "react"
import { Product } from "@/types"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from "./product-card"

interface ProductGridProps {
  featured?: boolean
  categorySlug?: string
  limit?: number
}

export default function ProductGrid({ limit }: ProductGridProps) {
  const dispatch = useAppDispatch()
  const { filteredItems, status, currentPage, totalPages, itemsPerPage } = useAppSelector(
    (state) => state.productReducer,
  )

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  if (status === "loading") {
    return <ProductGridSkeleton count={limit || 12} />
  }

  if (status === "failed") {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load products. Please try again later.</p>
      </div>
    )
  }

  if (!filteredItems || filteredItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found.</p>
      </div>
    )
  }

//   Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredItems.slice(startIndex, endIndex)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product: Product) => (
          <ProductCard product={product} key={product.ID} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => dispatch(setCurrentPage(page))}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

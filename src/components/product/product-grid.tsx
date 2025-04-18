"use client";

import ProductGridSkeleton from "./Product-grid-skeleton";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchProducts, setCurrentPage } from "@/store/slices/productSlice";
import { useEffect } from "react";
import { Product } from "@/types";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./product-card";

interface ProductGridProps {
  featured?: boolean;
  categorySlug?: string | number;
  limit?: number;
}

export default function ProductGrid({ limit }: ProductGridProps) {
  const dispatch = useAppDispatch();
  const {
    filteredItems,
    status,
    currentPage,
    totalPages,
    itemsPerPage,
  } = useAppSelector((state) => state.productReducer);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <ProductGridSkeleton count={limit || 12} />;
  }

  if (status === "failed") {
    return (
      <div className="text-center py-12 text-brown-600">
        <p className="text-red-500">Failed to load products. Please try again later.</p>
      </div>
    );
  }

  if (!filteredItems || filteredItems.length === 0) {
    return (
      <div className="text-center py-12 text-brown-600">
        <p className="text-brown-400">No products found.</p>
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredItems.slice(startIndex, endIndex);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentProducts.map((product: Product) => (
          <ProductCard product={product} key={product.ID} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            disabled={currentPage === 1}
            className="rounded-full border-brown-300 text-brown-700 hover:bg-brown-100 transition"
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
                className={`w-8 h-8 p-0 rounded-full ${
                  currentPage === page
                    ? "bg-brown-700 text-white hover:bg-brown-600"
                    : "text-brown-600 border-brown-300 hover:bg-brown-100"
                }`}
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
            className="rounded-full border-brown-300 text-brown-700 hover:bg-brown-100 transition"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

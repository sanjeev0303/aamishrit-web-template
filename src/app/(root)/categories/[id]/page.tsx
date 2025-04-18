"use client"

import { useCategory } from "@/hooks/useCategoryById";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/product/product-grid";
import ProductGridSkeleton from "@/components/product/Product-grid-skeleton";
import Image from "next/image";
import { Suspense, use } from "react";
import { cn } from "@/lib/utils";

export default function CategoryPage({ params }: { params: Promise<{ id: string | number }> }) {
    const { id } = use(params); // ✅ Unwrap the Promise using React.use()
    const { data: category, isLoading } = useCategory(id);

    if (isLoading) {
      return <ProductGridSkeleton count={12} />;
    }

    if (!category) {
      notFound();
    }
  return (
    <div className="bg-brown-50 min-h-screen">
      {/* Category Banner */}
      <div className="relative w-full h-60 md:h-96 overflow-hidden">
        {category.images?.[0] && (
          <Image
            src={category.images[0]}
            alt={category.name}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-brown-900/70 to-brown-700/30 flex items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown-100 drop-shadow-md">
            {category.name}
          </h1>
        </div>
      </div>

      {/* Description Section */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="bg-white/70 backdrop-blur-sm border border-brown-200 rounded-xl shadow-xl p-6 md:p-10">
          {category.description && (
            <p className="text-brown-800 text-lg leading-relaxed max-w-3xl mx-auto text-center">
              {category.description}
            </p>
          )}
        </div>

        {/* Products Title */}
        <div className="text-center mt-16 mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-brown-800">
            Explore Our Products
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 bg-gradient-to-r from-brown-500 via-brown-700 to-brown-500 rounded-full" />
        </div>

        {/* Product Grid */}
        <Suspense fallback={<ProductGridSkeleton count={12} />}>
          <ProductGrid categorySlug={category.id} />
        </Suspense>
      </div>
    </div>
  );
}

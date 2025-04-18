import ProductGrid from "@/components/product/product-grid";
import ProductGridSkeleton from "@/components/product/Product-grid-skeleton";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brown-50 via-brown-100 to-brown-50 py-12 px-4 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-left">
          <h1 className="text-4xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-brown-800 to-brown-600">
            Products
          </h1>

        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <Suspense>
            <div className="w-full">
              <Suspense fallback={<ProductGridSkeleton count={12} />}>
                <ProductGrid />
              </Suspense>
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

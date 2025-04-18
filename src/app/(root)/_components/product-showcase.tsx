import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Heart, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { addToCart, openCart } from "@/store/slices/cartSlice";
import { toast } from "sonner";

const ProductShowcase = () => {
  const { products, loading, error } = useProducts();
  const [categories, setCategories] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  console.log("Products: ", products ?? "No category available");
  if (products.length > 0) {
    products.forEach((product) => {
      console.log("Category Name:", product.Category ?? "No category");
    });
  }
  if (error)
    return <div className="text-center py-20 text-red-600">Error: {error}</div>;

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = Array.from(
        new Set(
          products
            .map((product) => product.Category?.[0]?.name)
            .filter((name) => name !== undefined && name !== null)
        )
      );
      setCategories(uniqueCategories);
    }
  }, [products]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-brown-50/60 backdrop-blur-md border border-brown-100 rounded-2xl shadow-lg p-4 animate-pulse flex flex-col items-center space-y-4"
            >
              <div className="relative w-full aspect-square bg-brown-100/70 rounded-xl flex items-center justify-center">
                <Image
                  src="/placeholder.svg"
                  alt="Loading"
                  width={60}
                  height={60}
                  className="opacity-40"
                />
              </div>
              <div className="h-5 bg-brown-200 rounded w-3/4" />
              <div className="h-3 bg-brown-100 rounded w-full" />
              <div className="h-3 bg-brown-100 rounded w-5/6" />
              <div className="h-4 bg-brown-300 rounded w-1/3" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 px-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brown-heading via-brown-700 to-brown-500 drop-shadow-sm mb-4">
            Our Products
          </h2>

          <div className="mx-auto h-1 w-16 bg-gradient-to-r from-brown-500 via-brown-heading to-brown-500 rounded-full mb-6" />

          <p className="text-lg md:text-xl text-brown-text/80 max-w-2xl mx-auto leading-relaxed">
            Discover our collection of premium organic products, carefully
            crafted for your health and enjoyment.
          </p>
        </motion.div>

        {categories.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-lg text-brown-700">
              No product categories availabel.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {categories.map((category) => {
              const categoryProducts = products.filter(
                (product) => product.Category[0]?.name === category
              );

              if (categoryProducts.length === 0) {
                return null;
              }

              const handleAddToCart = (e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(addToCart(products[0]));
                dispatch(openCart());
                toast.success(`${products[0].name} added to cart`);
              };

              return (
                <div key={category} className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-brown-800 ">
                      {formatCategoryName(category)}
                    </h3>
                    <Link
                      href={`/category/${category}`}
                      className="flex items-center text-brown-600 hover:text-brown-800 transition-colors"
                    >
                      <span>View all</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {categoryProducts.map((product) => (
                      <motion.div
                        key={product.ID}
                        variants={itemVariants}
                        whileHover={{ y: -4 }}
                        className="bg-white/60 backdrop-blur-md border border-brown-200 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl group overflow-hidden
    w-full sm:max-w-[97%] md:max-w-[90%] mx-auto"
                      >
                        <div className="relative h-64 sm:h-72 lg:h-80 xl:h-96 overflow-hidden bg-brown-50">
                          <Link href={`/products/${product.ID}`}>
                            <Image
                              src={product.images?.[0] || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brown-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </Link>

                          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="bg-white/70 hover:bg-white rounded-full shadow backdrop-blur-sm"
                              onClick={handleAddToCart}
                            >
                              <ShoppingCart className="w-5 h-5 text-brown-700" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="bg-white/70 hover:bg-white rounded-full shadow backdrop-blur-sm"
                              onClick={handleAddToCart}
                            >
                              <Heart className="w-5 h-5 text-brown-700" />
                            </Button>
                          </div>
                        </div>

                        <div className="p-5 flex flex-col justify-between">
                          <h4 className="text-xl font-semibold text-brown-800 mb-2 line-clamp-1">
                            {product.name}
                          </h4>
                          {product.description && (
                            <p className="text-sm text-brown-700/70 line-clamp-2 mb-2">
                              {product.description}
                            </p>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-brown-700">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductShowcase;

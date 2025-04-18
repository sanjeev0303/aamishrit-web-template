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
  const dispatch = useAppDispatch()

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
      <div className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brown-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center text-brown-heading mb-4">
            Our Products
          </h2>
          <p className="text-center text-brown-text/80 max-w-2xl mx-auto mb-12">
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
                e.preventDefault()
                e.stopPropagation()
                dispatch(addToCart(products[0]))
                dispatch(openCart())
                toast.success(`${products[0].name} added to cart`)
              }

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
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8"
                  >
                    {categoryProducts.map((product) => (
                      <motion.div
                        key={product.ID}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 hover:group"
                      >
                        <div className="relative aspect-square overflow-hidden ">
                          <Link href={`/products/${product.ID}`}>
                          <Image
                            src={product.images?.[0] || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-contain transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50  opacity-0 hover:opacity-3 transition-opacity duration-300"></div>
                          </Link>
                          {/* {product.isNew && (
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-brown-600 text-white">
                                New
                              </Badge>
                            </div>
                          )} */}
                          {/* {product.isBestseller && (
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-brown-700/80 text-white">
                                Bestseller
                              </Badge>
                            </div>
                          )} */}
                         <div className="absolute top-2 right-2 flex flex-col items-center">
                         <Button
                              variant="ghost"
                              size="sm"
                              className="text-brown-700 hover:bg-transparent hover:text-brown-900"
                              onClick={() => handleAddToCart}
                            >
                              <ShoppingCart className="w-4 h-4" />
                            </Button>
                         <Button
                              variant="ghost"
                              size="sm"
                              className="text-brown-700 hover:bg-transparent hover:text-brown-900"
                              onClick={() => handleAddToCart}
                            >
                              <Heart className="w-4 h-4" />
                            </Button>
                            </div>
                        </div>
                        <div className="px-4 py-1">
                          <h4 className="text-lg font-semibold text-brown-text  line-clamp-1 leading-tight">
                            {product.name}
                          </h4>
                          {product.description && (
                            <p className="text-sm text-brown-text/70  line-clamp-2">
                              {product.description}
                            </p>
                          )}
                          <div className="flex justify-between items-center mt-1 ">
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

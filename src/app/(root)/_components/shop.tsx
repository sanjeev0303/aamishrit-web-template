"use client";

import { useAllCategories } from "@/hooks/useCategory";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ShopSection = () => {
  // Fetch categories using the custom hook
  const { data: categories, isLoading } = useAllCategories();

  console.log("shop categories: ", categories?.map((item) => console.log("category Id: ", item.ID)
  ));


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Skeleton loader
  if (isLoading) {
    return (
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-brown-heading animate-pulse bg-brown-100 h-8 w-56 mx-auto rounded"></h2>
            <p className="max-w-2xl mx-auto mt-4 h-5 bg-brown-100 rounded animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col bg-white shadow-sm rounded overflow-hidden animate-pulse"
              >
                <div className="relative h-60 bg-brown-100" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-brown-100 rounded w-3/4" />
                  <div className="h-4 bg-brown-100 rounded w-full" />
                  <div className="h-4 bg-brown-100 rounded w-5/6" />
                  <div className="h-10 bg-brown-100 rounded w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0)
    return <p>No categories found.</p>;

  return (
    <section id="categories" className="py-16 lg:px-16 px-2 md:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 px-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brown-heading via-brown-600 to-brown-500 drop-shadow-sm mb-4">
            Shop by Category
          </h2>

          <div className="mx-auto h-1 w-16 bg-gradient-to-r from-brown-600 via-brown-heading to-brown-500 rounded-full mb-6" />

          <p className="text-lg md:text-xl text-brown-text/80 max-w-2xl mx-auto leading-relaxed">
            Explore our carefully curated collection of premium organic
            products, each crafted with attention to quality and sustainability.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories?.map((category) => (
            <motion.div
              variants={itemVariants}
              key={category.ID}
              className="product-card group flex flex-col rounded-2xl shadow-xl bg-white border border-brown-100 hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1"
            >
              {/* Image Wrapper */}
              <div className="relative w-full h-60 sm:h-56 md:h-52 lg:h-90 overflow-hidden">
                <Image
                  src={category.images?.[0] || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="px-4 py-5 flex flex-col flex-grow bg-gradient-to-b from-white via-white to-brown-50">
                <h3 className="text-xl font-bold tracking-wide text-brown-900 uppercase mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-brown-600 mb-4 flex-grow line-clamp-3">
                  {category.description || "No description available"}
                </p>

                <Link href={`/categories/${category.ID}}`}>
                  <Button className="w-full bg-brown-800 text-white hover:bg-brown-900 transition duration-300 ease-in-out rounded-full font-semibold tracking-wide shadow-md hover:shadow-lg">
                    Browse {category.name}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ShopSection;

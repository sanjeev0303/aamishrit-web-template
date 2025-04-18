import { useAllCategories } from "@/hooks/useCategory";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const { data: categories, isLoading } = useAllCategories();

  if (isLoading) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-brown-800 to-brown-600 text-brown-background w-full">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Skeleton height={40} width={250} className="mx-auto mb-4" />
            <Skeleton count={2} width={500} className="mx-auto" />
          </div>
          <div className="space-y-16">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative h-64 md:h-96 rounded-xl overflow-hidden bg-brown-100 flex items-center justify-center">
                    <div className="w-24 h-24 bg-brown-200 rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <Skeleton height={30} width={200} />
                  <Skeleton count={3} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) return <p>No categories found.</p>;

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 md:px-8 bg-gradient-to-b from-brown-800 to-brown-600 text-brown-background w-full"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold tracking-wide text-brown-light uppercase mb-4">
            About Our Products
          </h2>
          <p className="text-center text-brown-100 max-w-2xl mx-auto text-lg">
            Learn more about our commitment to quality, sustainability, and the
            unique benefits of our organic products.
          </p>
        </motion.div>

        <div className="space-y-20">
          {categories.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-10 items-center`}
            >
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl bg-white"
                >
                  <Image
                    src={item.images?.[0] || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 ease-in-out hover:scale-105"
                  />
                </motion.div>
              </div>
              <div className="w-full md:w-1/2">
                <motion.h3
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl font-bold text-brown-100 uppercase mb-4 tracking-wider"
                >
                  {item.name}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-brown-200/90 text-lg leading-relaxed mb-4"
                >
                  {item.description?.split(".")[0] || "No description available"}.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-brown-200/90 text-lg leading-relaxed"
                >
                  {item.description?.split(".").slice(1).join(".") || ""}
                </motion.p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

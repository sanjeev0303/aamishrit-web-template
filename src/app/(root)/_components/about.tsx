import { useAllCategories } from "@/hooks/useCategory";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const AboutSection = () => {
    const sectionRef = useRef(null);
    const { data: categories, isLoading } = useAllCategories();

    if (isLoading) return <p>Loading...</p>;
    if (!categories || categories.length === 0) return <p>No categories found.</p>;

    return (
        <section
            ref={sectionRef}
            className="py-16 px-4 md:px-8 bg-brown-text/90 text-brown-background w-full"
        >
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">About Our Products</h2>
                    <p className="text-center text-luxury-text/80 max-w-2xl mx-auto mb-12">
                        Learn more about our commitment to quality, sustainability, and the
                        unique benefits of our organic products.
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {categories.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                } gap-8 items-center`}
                        >
                            <div className="w-full md:w-1/2">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className="relative h-64 md:h-96 rounded-lg overflow-hidden bg-brown-50"
                                >
                                    <Image
                                        src={item.images?.[0] || "/placeholder.svg"}
                                        alt={item.name}
                                        fill
                                        className="object-contain"
                                    />
                                </motion.div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <motion.h3
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="text-2xl md:text-3xl font-bold text-brown-200 mb-6 uppercase"
                                >
                                    {item.name}
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-luxury-text/80 mb-6 leading-relaxed"
                                >
                                    {item.description || "No description available"}
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

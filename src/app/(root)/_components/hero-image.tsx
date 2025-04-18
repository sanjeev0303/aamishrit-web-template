"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Suspense, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const HeroImage = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current && window.innerWidth >= 1024) {
        const viewportHeight = window.innerHeight;
        imageRef.current.style.height = `${viewportHeight * 0.92}px`;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-full h-screen bg-brown-900">
          <Loader2 className="animate-spin text-white" />
        </div>
      }
    >
      <motion.div
        ref={imageRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:min-h-screen md:h-[75vh] max-sm:h-[40vh] relative overflow-hidden select-none bg-brown-900"
      >
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          className="w-full h-full"
        >
          <Image
            src="/Background.jpg"
            alt="hero-image"
            width={1500}
            height={1000}
            priority
            className="object-cover w-full h-full max-sm:h-[40vh] bg-brown-900"
          />
        </motion.div>

        {/* Gradient Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 p-6 md:p-12 bg-gradient-to-t from-brown-900/80 via-brown-700/40 to-transparent text-white"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brown-50 drop-shadow-md">
            Aamishrit
          </h1>
          <p className="text-lg md:text-xl mt-2 text-brown-100 max-w-2xl leading-relaxed drop-shadow">
            Purity you taste, Quality you can trust.
          </p>
        </motion.div>
      </motion.div>
    </Suspense>
  );
};

export default HeroImage;

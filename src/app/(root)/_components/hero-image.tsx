"use client"

import { Loader2 } from "lucide-react"
import Image from "next/image"
import { Suspense, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const HeroImage = () => {
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current && window.innerWidth >= 1024) {
        const viewportHeight = window.innerHeight
        // Set height to 92% of viewport height for large screens
        imageRef.current.style.height = `${viewportHeight * 0.92}px`
      }
    }

    // Initial call
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Suspense fallback={<Loader2 className="animate-spin text-white bg-black" />}>
      <motion.div
        ref={imageRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:min-h-screen md:h-[75vh] max-sm:h-[40vh] relative overflow-hidden select-none bg-black"
      >
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          className="w-full h-full"
        >
          <Image
            src={"/Background.jpg"}
            alt="hero-image"
            width={1500}
            height={1000}
            priority
            className="object-fill w-full h-full max-sm:h-[40vh]"
          />
        </motion.div>
      </motion.div>
    </Suspense>
  )
}


export default HeroImage

'use client'; 

import React from 'react';
import { useRouter } from 'next/navigation'; 
import { motion, AnimatePresence } from 'framer-motion'; 

// Varian animasi
const pageVariants = {
  initial: {
    opacity: 0,
    filter: 'blur(4px)',
  },
  in: {
    opacity: 1,
    filter: 'blur(0px)',
  },
  out: {
    opacity: 0,
    filter: 'blur(4px)',
  },
};

// Transisi animasi
const pageTransition = {
  type: 'tween',
  ease: 'anticipate', 
  duration: 0.8,
};

const NAMA_BRAND = "[Nama Brand Kamu]";
const TAGLINE = "Capturing Emotion in Every Frame";

export default function LandingPage() {
  const router = useRouter(); 
    
  const handleEnter = () => {
    router.push('/portfolio'); 
  };
    
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="landing"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="relative flex items-center justify-center w-screen h-screen overflow-hidden bg-anthracite"
        style={{
          backgroundImage: "url('https://placehold.co/1920x1080/393D47/FFFFFF?text=Background+Video/Gambar+Sinematik')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
    
        <motion.div 
          className="relative z-10 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 
            className="mb-4 text-5xl font-bold md:text-8xl font-serif text-white" 
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            {NAMA_BRAND}
          </h1>
          <p className="text-lg md:text-2xl font-sans tracking-widest text-white/90">
            {TAGLINE}
          </p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
            onClick={handleEnter} 
            className="px-10 py-3 mt-10 text-lg font-sans tracking-widest uppercase transition-all duration-300 border-2 border-white rounded-sm text-white hover:bg-white hover:text-anthracite"
          >
            Enter Portfolio
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


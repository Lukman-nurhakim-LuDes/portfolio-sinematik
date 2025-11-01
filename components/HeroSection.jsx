'use client';
import React from 'react';
import { motion } from 'framer-motion';

// Ganti NAMA_BRAND
const NAMA_BRAND = "[Nama Brand Kamu]";
const DESKRIPSI_SINGKAT = "Menangkap emosi dalam setiap bingkai."; // Ganti dengan deskripsi Anda

export default function HeroSection() {
  return (
    <section 
      id="home" 
      className="relative flex items-center justify-center w-full h-screen pt-20 text-center bg-center bg-no-repeat bg-cover"
      // Ganti URL gambar placeholder ini dengan foto highlight Anda
      style={{ 
        backgroundImage: "url('https://placehold.co/1920x1080/393D47/FFFFFF?text=Foto+Highlight+Anda')"
      }}
    >
      {/* Overlay gelap untuk kontras teks */}
      <div className="absolute inset-0 bg-black/50" />

      <motion.div 
        className="relative z-10 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <h1 
          className="mb-4 text-5xl font-bold md:text-7xl font-serif text-shadow-lg"
          style={{ fontFamily: "'Libre Baskerville', serif" }}
        >
          {NAMA_BRAND}
        </h1>
        <p className="max-w-xl mx-auto text-lg md:text-xl font-sans tracking-wider text-shadow">
          {DESKRIPSI_SINGKAT}
        </p>
      </motion.div>
    </section>
  );
}
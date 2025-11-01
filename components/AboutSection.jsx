'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  // Varian animasi untuk 'scroll into view'
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section 
      id="about" 
      className="container grid grid-cols-1 gap-12 px-6 py-24 mx-auto md:grid-cols-2"
    >
      {/* Kolom Gambar */}
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Memicu animasi saat 30% elemen terlihat
      >
        <img 
          // Ganti URL placeholder ini dengan foto Anda
          src="https://placehold.co/600x800/6B7280/FFFFFF?text=Foto+Fotografer" 
          alt="Fotografer" 
          className="object-cover w-full h-full rounded-md shadow-xl grayscale"
        />
      </motion.div>

      {/* Kolom Teks */}
      <motion.div
        className="flex flex-col justify-center"
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 
          className="mb-6 text-4xl font-serif"
          style={{ fontFamily: "'Libre Baskerville', serif" }}
        >
          Filosofi Kami
        </h2>
        <p className="mb-4 leading-relaxed font-sans opacity-90">
          Bagi kami, fotografi bukan hanya tentang mengambil gambar, tetapi tentang mengabadikan jiwa dari sebuah momen. Kami percaya setiap klik adalah cerita, setiap bayangan adalah emosi, dan setiap cahaya adalah harapan.
        </p>
        <p className="mb-4 leading-relaxed font-sans opacity-90">
          Dengan pendekatan sinematik, kami berusaha menciptakan karya yang tidak hanya indah secara visual, tetapi juga abadi dan penuh makna. Kami mendedikasikan diri untuk menangkap esensi sejati Anda dalam setiap frame.
        </p>
        <p className="leading-relaxed font-sans opacity-90">
          Mari ciptakan sesuatu yang tak terlupakan bersama.
        </p>
      </motion.div>
    </section>
  );
}
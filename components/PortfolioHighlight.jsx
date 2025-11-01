'use client';
import React from 'react';
import { motion } from 'framer-motion';

// Data mock ini nanti bisa dipindah ke page.jsx atau diambil dari Supabase
const mockHighlights = [
  {
    id: 1,
    title: "Momen Sakral Pernikahan",
    description: "Mengabadikan 'I do' yang magis, di mana dua jiwa menjadi satu. Kami fokus pada detail intim dan emosi yang tulus di hari bahagia Anda.",
    // Ganti dengan URL gambar Anda
    imageUrl: "https://placehold.co/800x600/393D47/FFFFFF?text=Highlight+1"
  },
  {
    id: 2,
    title: "Cinta Lintas Alam",
    description: "Sesi pre-wedding yang menakjubkan dengan latar belakang alam yang megah. Biarkan kisah cinta Anda menyatu dengan keindahan bumi.",
    imageUrl: "https://placehold.co/800x600/6B7280/FFFFFF?text=Highlight+2"
  },
  {
    id: 3,
    title: "Senyum Keluarga",
    description: "Potret keluarga yang hangat dan otentik. Merekam tawa, pelukan, dan koneksi yang menjadikan keluarga Anda unik.",
    imageUrl: "https://placehold.co/800x600/393D47/FFFFFF?text=Highlight+3"
  },
  {
    id: 4,
    title: "Detail & Dekorasi",
    description: "Setiap detail kecil di hari besar Anda menceritakan sebuah kisah. Dari bunga hingga cincin, kami menangkap keindahan dalam setiap elemen.",
    imageUrl: "https://placehold.co/800x600/6B7280/FFFFFF?text=Highlight+4"
  },
  {
    id: 5,
    title: "Tarian Pertama",
    description: "Gerakan, tatapan, dan romansa dari tarian pertama Anda sebagai suami istri. Momen klasik yang diabadikan secara sinematik.",
    imageUrl: "https://placehold.co/800x600/393D47/FFFFFF?text=Highlight+5"
  },
  {
    id: 6,
    title: "Cahaya Senja",
    description: "Menggunakan 'golden hour' untuk menciptakan potret yang dramatis dan hangat, menonjolkan siluet dan keintiman.",
    imageUrl: "https://placehold.co/800x600/6B7280/FFFFFF?text=Highlight+6"
  }
];

// Varian animasi
const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function PortfolioHighlight() {
  return (
    <section className="py-24 bg-black/10">
      <div className="container px-6 mx-auto space-y-16">

        <motion.h2 
          className="text-4xl text-center font-serif" 
          style={{ fontFamily: "'Libre Baskerville', serif" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Karya Pilihan
        </motion.h2>

        {mockHighlights.map((item, index) => (
          <motion.div
            key={item.id}
            className="grid items-center grid-cols-1 gap-12 md:grid-cols-2"
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Kolom Teks */}
            <motion.div 
              variants={itemVariants}
              // Tentukan urutan: genap (index 0, 2, 4) teks di KIRI
              className={`flex flex-col justify-center ${index % 2 === 0 ? 'md:order-first' : 'md:order-last'}`}
            >
              <h3 
                className="mb-4 text-3xl font-serif" 
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                {item.title}
              </h3>
              <p className="leading-relaxed opacity-90">
                {item.description}
              </p>
            </motion.div>

            {/* Kolom Gambar */}
            <motion.div 
              variants={itemVariants}
              // Tentukan urutan: genap (index 0, 2, 4) gambar di KANAN
              className={`${index % 2 === 0 ? 'md:order-last' : 'md:order-first'}`}
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="object-cover w-full h-auto rounded-md shadow-xl"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
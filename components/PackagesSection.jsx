'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

// Data mock (nanti bisa dipindah atau diambil dari Supabase jika perlu)
const weddingPackages = [
  {
    name: "Akad",
    price: "Rp 3.000.000",
    features: [
      "1 Fotografer",
      "Liputan 4 Jam",
      "50 Foto Edit",
      "Album Kolase 20x30",
      "File Asli via Google Drive"
    ]
  },
  {
    name: "Intimate",
    price: "Rp 5.500.000",
    features: [
      "2 Fotografer",
      "Liputan 8 Jam (Akad + Resepsi)",
      "100 Foto Edit",
      "Album Kolase 20x30",
      "1 Cetakan 16R + Bingkai",
      "File Asli via Google Drive"
    ]
  },
  {
    name: "The Royal",
    price: "Rp 8.000.000",
    features: [
      "2 Fotografer, 1 Videografer",
      "Liputan 12 Jam",
      "150 Foto Edit",
      "Video Sinematik 1 Menit",
      "Video Liputan 5-7 Menit",
      "Album Kolase Premium",
      "2 Cetakan 16R + Bingkai",
      "File Asli via Flashdisk"
    ]
  }
];

const preweddingPackages = [
  {
    name: "Short",
    price: "Rp 1.500.000",
    features: [
      "1 Fotografer",
      "Sesi 2 Jam",
      "1 Lokasi",
      "25 Foto Edit",
      "File Asli via Google Drive"
    ]
  },
  {
    name: "Medium",
    price: "Rp 2.500.000",
    features: [
      "1 Fotografer",
      "Sesi 4 Jam",
      "2 Lokasi",
      "40 Foto Edit",
      "1 Cetakan 12R + Bingkai",
      "File Asli via Google Drive"
    ]
  },
  {
    name: "Premium",
    price: "Rp 4.000.000",
    features: [
      "2 Fotografer",
      "Sesi 6 Jam",
      "2-3 Lokasi",
      "60 Foto Edit",
      "Video Sinematik 1 Menit",
      "Album Kolase 20x20",
      "File Asli via Google Drive"
    ]
  }
];

// Varian animasi
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.5, 
      staggerChildren: 0.2 
    } 
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

// Komponen Kartu Paket
function PackageCard({ name, price, features }) {
  return (
    <motion.div 
      className="flex flex-col p-6 rounded-lg shadow-xl bg-white/5 h-full"
      variants={cardVariants}
    >
      <h3 className="text-2xl font-semibold font-serif text-soft-gold">{name}</h3>
      <p className="mt-2 mb-4 text-3xl font-bold">{price}</p>
      <ul className="space-y-2 text-sm opacity-90 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <Check size={16} className="mr-2 text-soft-gold" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button 
        onClick={() => scrollToSection('contact')} // Arahkan ke section contact
        className="w-full px-6 py-3 mt-6 font-sans text-sm tracking-widest uppercase transition-all duration-300 rounded-sm bg-soft-gold text-anthracite hover:bg-opacity-80"
      >
        Pilih Paket
      </button>
    </motion.div>
  );
}

// Fungsi helper untuk scroll, tambahkan di dalam 'use client'
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function PackagesSection() {
  return (
    <section id="packages" className="py-24 bg-black/10">
      <div className="container px-6 mx-auto">
        {/* Paket Wedding */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="mb-12 text-4xl text-center font-serif" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            Paket Wedding
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {weddingPackages.map((pkg, i) => (
              <PackageCard key={`w-${i}`} {...pkg} />
            ))}
          </div>
        </motion.div>

        {/* Paket Pre-Wedding */}
        <motion.div
          className="mt-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="mb-12 text-4xl text-center font-serif" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            Paket Pre-Wedding
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {preweddingPackages.map((pkg, i) => (
              <PackageCard key={`p-${i}`} {...pkg} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
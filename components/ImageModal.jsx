'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Varian untuk backdrop/overlay
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Varian untuk modal
const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 20 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } }
};

export default function ImageModal({ image, onClose }) {
  // Kita menggunakan AnimatePresence untuk animasi saat komponen
  // muncul (image != null) dan hilang (image == null)
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          // Klik backdrop untuk menutup modal
          onClick={onClose}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop gelap */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Konten Modal */}
          <motion.div
            className="relative z-[101] max-w-4xl max-h-[90vh] p-4 bg-anthracite rounded-md shadow-xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            // Hentikan propagasi klik agar klik di modal tidak menutupnya
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Tombol Tutup (X) */}
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 z-[102] p-2 rounded-full bg-soft-gold text-anthracite transition-transform hover:scale-110"
              aria-label="Tutup modal"
            >
              <X size={24} />
            </button>

            {/* Gambar */}
            <img 
              src={image.src} 
              alt={image.caption || 'Foto portofolio'} 
              className="object-contain w-full max-h-[80vh] rounded" 
            />

            {/* Caption */}
            {image.caption && (
              <p className="mt-3 text-center text-white opacity-90">
                {image.caption}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
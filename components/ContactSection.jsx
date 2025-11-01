'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail } from 'lucide-react'; // Impor ikon

export default function ContactSection() {
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 150 } }
  };

  return (
    <section id="contact" className="container px-6 py-24 mx-auto">
      <motion.div 
        className="max-w-3xl mx-auto text-center"
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div>
          <motion.h2 
            className="mb-4 text-4xl font-serif" 
            style={{ fontFamily: "'Libre Baskerville', serif" }}
            variants={itemVariants}
          >
            Hubungi Kami
          </motion.h2>
          <motion.p 
            className="mb-8 leading-relaxed max-w-xl mx-auto opacity-90"
            variants={itemVariants}
          >
            Mari diskusikan bagaimana kami bisa mengabadikan momen spesial Anda. Temukan kami di media sosial.
          </motion.p>
          <motion.div 
            className="flex justify-center space-x-8"
            variants={itemVariants}
          >
            {/* Ganti '#' dengan link Instagram Anda */}
            <a 
              href="#" 
              aria-label="Instagram"
              className="transition-transform hover:scale-110 hover:text-soft-gold"
            >
              <Instagram size={32} />
            </a>
            {/* Ganti '#' dengan link email Anda */}
            <a 
              href="mailto:emailanda@gmail.com" 
              aria-label="Email"
              className="transition-transform hover:scale-110 hover:text-soft-gold"
            >
              <Mail size={32} />
            </a>
            {/* // Uncomment jika Anda ingin menambahkan Behance
            <a href="#" className="transition-transform hover:scale-110 hover:text-soft-gold">
              <Behance size={32} /> 
            </a> 
            */}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
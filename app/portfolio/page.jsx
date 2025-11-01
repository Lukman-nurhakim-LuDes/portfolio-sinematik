'use client'; // Dibutuhkan untuk state, effect, dan interaksi

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Hanya perlu motion, AnimatePresence ada di modal
    
// Impor semua komponen Anda
// '@/' adalah alias ke folder root proyek Anda
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PortfolioHighlight from '@/components/PortfolioHighlight';
import PortfolioGallery from '@/components/PortfolioGallery';
import PackagesSection from '@/components/PackagesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ImageModal from '@/components/ImageModal';
    
// Impor Supabase client
import { supabase } from '@/lib/supabaseClient';
    
// Varian animasi (diambil dari simulasi)
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
    
// Transisi animasi (diambil dari simulasi)
const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.8,
};

export default function PortfolioPage() {
  // State untuk galeri foto dari Supabase
  const [galleryImages, setGalleryImages] = useState([]);
  // State untuk status loading awal
  const [loading, setLoading] = useState(true);
  // State untuk modal (gambar apa yang ditampilkan)
  const [modalImage, setModalImage] = useState(null);

  // State 'isAuth' telah dihapus
      
  // Ambil data dari Supabase saat komponen dimuat (hanya sekali)
  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false }); // Urutkan terbaru di atas

      if (error) {
        console.error('Error fetching photos:', error);
      } else {
        setGalleryImages(data);
      }
      setLoading(false);
    }
        
    fetchImages();
  }, []); // Array dependensi kosong berarti useEffect hanya berjalan sekali
      
  // Fungsi ini dipanggil oleh PortfolioGallery.jsx SETELAH upload berhasil
  const handleImageUpload = (newImage) => {
    // Tambahkan gambar baru ke state galeri di paling depan
    setGalleryImages([newImage, ...galleryImages]);
  };

  return (
    <motion.div
      key="portfolio"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="bg-anthracite text-white min-h-screen"
      style={{ fontFamily: "'Work Sans', sans-serif" }} // Set font default
    >
      {/* Header (sticky) */}
      <Header /> 
          
      <main>
        {/* Semua section yang telah kita buat */}
        <HeroSection />
        <AboutSection />
            
        {/* PortfolioHighlight menggunakan mock data internalnya */}
        <PortfolioHighlight /> 
            
        <PortfolioGallery 
          // Props 'isAuth' and 'onAuthToggle' telah dihapus
          initialImages={galleryImages} // Data dari Supabase
          loading={loading}
              
          // Kirim fungsi/event handler ke komponen
          onImageUpload={handleImageUpload} // Callback setelah upload
          onShowModal={setModalImage} // Fungsi untuk membuka modal
        />
            
        {/* PackagesSection menggunakan mock data internalnya */}
        <PackagesSection /> 
            
        <ContactSection />
      </main>
          
      {/* Footer */}
      <Footer />
          
      {/* ImageModal ada di sini, di luar <main>.
        Ia hanya akan tampil jika 'modalImage' bukan null.
      */}
      <ImageModal 
        image={modalImage} 
        onClose={() => setModalImage(null)} // Fungsi untuk menutup modal
      />
    </motion.div>
  );
}


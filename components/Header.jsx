'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react'; // Impor ikon untuk menu

// Ganti NAMA_BRAND
const NAMA_BRAND = "[Nama Brand Kamu]";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk menu mobile

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Tutup menu setelah link diklik
  };

  const navLinks = ['Home', 'About', 'Portfolio', 'Packages', 'Contact'];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-anthracite/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <nav className="container flex items-center justify-between px-6 py-4 mx-auto">
        {/* Logo di Kiri */}
        <div 
          className="text-2xl font-bold cursor-pointer font-serif tracking-wider z-50" 
          style={{ fontFamily: "'Libre Baskerville', serif" }}
          onClick={() => scrollToSection('home')}
        >
          {NAMA_BRAND}
        </div>

        {/* Navigasi Desktop */}
        <div className="hidden space-x-6 md:flex">
          {navLinks.map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.toLowerCase());
              }}
              className="font-sans text-sm tracking-widest uppercase transition-colors hover:text-soft-gold"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Tombol Hamburger (HANYA tampil di 'md' ke bawah) */}
        <div className="md:hidden z-50">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu Mobile (Overlay) */}
        {isMenuOpen && (
          <motion.div 
            className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-screen pt-20 bg-anthracite md:hidden"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", ease: "easeInOut" }}
          >
            {navLinks.map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.toLowerCase());
                }}
                className="py-4 text-2xl font-sans tracking-widest uppercase transition-colors hover:text-soft-gold"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}

      </nav>
    </motion.header>
  );
}


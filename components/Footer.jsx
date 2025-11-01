import React from 'react';

// Ganti NAMA_BRAND
const NAMA_BRAND = "[Nama Brand Kamu]";

export default function Footer() {
  return (
    <footer className="py-8 text-center bg-black/50">
      <div className="container px-6 mx-auto">
        <p className="text-sm opacity-70 font-sans">
          {/* Ini akan otomatis mengambil tahun saat ini */}
          Hak Cipta &copy; {new Date().getFullYear()} {NAMA_BRAND}. Semua Hak Dilindungi.
        </p>
      </div>
    </footer>
  );
}
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient'; 
import { Upload, Loader2, LogIn, LogOut } from 'lucide-react';

export default function PortfolioGallery({ 
  user, // Terima 'user' dari props
  onLogin, // Terima 'onLogin' dari props
  onLogout, // Terima 'onLogout' dari props
  initialImages, 
  onImageUpload, 
  onShowModal,
  loading 
}) {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  
  // State untuk form login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFileChange = (e) => {
    setMessage(''); 
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Fungsi login dikirim ke parent (page.jsx)
  const attemptLogin = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleUpload = async () => {
    setMessage(''); 
    if (!file) {
      setMessage("Silakan pilih file untuk di-upload.");
      return;
    }
    // Cek 'user' sekarang sudah valid karena login nyata
    if (!user) {
      setMessage("Anda harus login untuk upload.");
      return;
    }

    setUploading(true);

    try {
      // 1. Upload file ke Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio_images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Dapatkan URL publik dari file yang di-upload
      const { data: urlData } = supabase.storage
        .from('portfolio_images')
        .getPublicUrl(filePath);
      
      const publicUrl = urlData.publicUrl;

      // 3. Simpan URL ke tabel 'photos'
      const newPhoto = {
        image_url: publicUrl,
        caption: "Caption default", 
        storage_path: filePath
      };

      const { data: dbData, error: dbError } = await supabase
        .from('photos')
        .insert(newPhoto)
        .select() 
        .single(); 

      if (dbError) throw dbError;

      // 4. Panggil callback untuk update UI
      onImageUpload(dbData); 
      setMessage("Upload berhasil!");
      setFile(null); 
      if(document.getElementById('file-upload-input')) {
        document.getElementById('file-upload-input').value = null;
      }

    } catch (error) {
      console.error('Error uploading file:', error.message);
      setMessage(`Upload gagal: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section id="portfolio" className="container px-6 py-24 mx-auto">
      <h2 className="mb-12 text-4xl text-center font-serif" style={{ fontFamily: "'Libre Baskerville', serif" }}>
        Galeri Kami
      </h2>
      
      {/* Tampilkan form login ATAU form upload */}
      <div className="flex flex-col items-center justify-center p-4 mb-8 space-y-4 rounded-md bg-white/5">
        {!user ? (
          // Jika TIDAK ADA user, tampilkan Form Login
          <form onSubmit={attemptLogin} className="w-full max-w-sm space-y-3">
            <h3 className="text-lg font-semibold text-center">Login Admin</h3>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md bg-white/10 text-white placeholder-white/50"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md bg-white/10 text-white placeholder-white/50"
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-sm rounded-md bg-soft-gold text-anthracite"
            >
              <LogIn size={16} />
              <span>Login</span>
            </button>
          </form>
        ) : (
          // Jika ADA user, tampilkan Form Upload
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <input 
                type="file" 
                id="file-upload-input"
                accept="image/*" 
                onChange={handleFileChange}
                className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-white/10 file:text-white hover:file:bg-white/20"
              />
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="flex items-center px-4 py-2 space-x-2 text-xs rounded-md bg-blue-600 disabled:bg-gray-500"
              >
                {uploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                <span>{uploading ? 'Mengunggah...' : 'Upload'}</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center px-4 py-2 space-x-2 text-xs rounded-md bg-red-600"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
            <p className="text-xs text-center text-white/70">
              Login sebagai: {user.email}
            </p>
          </div>
        )}
      </div>
      
      {/* Tampilkan pesan notifikasi */}
      {message && (
        <p className={`mt-4 text-center text-sm ${message.startsWith('Upload gagal') ? 'text-red-400' : 'text-green-400'}`}>
          {message}
        </p>
      )}

      {/* Status Loading Awal */}
      {loading && <p className="text-center">Memuat galeri...</p>}
      
      {/* Masonry Grid */}
      <div className="columns-1 gap-6 pt-8 md:columns-2 lg:columns-3">
        {initialImages.map((img) => (
          <motion.div
            key={img.id}
            className="relative mb-6 overflow-hidden rounded-md shadow-lg cursor-pointer break-inside-avoid"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => onShowModal({ src: img.image_url, caption: img.caption })}
          >
            <img src={img.image_url} alt={img.caption || 'Foto portofolio'} className="w-full h-auto" />
            <div className="absolute inset-0 flex items-center justify-center text-white transition-opacity duration-300 bg-black opacity-0 hover:opacity-70">
              <p>{img.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


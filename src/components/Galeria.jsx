import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiMessageCircle, FiUpload, FiLoader } from 'react-icons/fi';
import { uploadPhoto, getPhotos, deletePhoto, hidePhoto, restorePhoto, likePhoto } from '../services/supabase';
import Masonry from 'react-masonry-css';

const Galeria = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [uploadedBy, setUploadedBy] = useState('');

  const fetchPhotos = async () => {
    setLoading(true);
    const result = await getPhotos();
    if (result.success) {
      setPhotos(result.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !uploadedBy) {
      alert('Por favor ingresa tu nombre y selecciona una foto');
      return;
    }

    setUploading(true);
    const result = await uploadPhoto(file, uploadedBy);
    if (result.success) {
      setUploadedBy('');
      fetchPhotos();
      alert('¡Foto subida exitosamente!');
    } else {
      alert('Error al subir la foto: ' + result.error);
    }
    setUploading(false);
    e.target.value = '';
  };

  const displayPhotos = showMore ? photos : photos.slice(0, 12);

  const breakpoints = {
    default: 4,
    1536: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1
  };

  return (
    <section className="py-20 px-4 bg-dark-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            ÁLBUM DE RECUERDOS
          </h2>

          <p className="text-gray-400 text-center mb-12">
            {photos.length} fotografías
          </p>

          {/* Upload Section */}
          <div className="bg-dark-card p-6 rounded-2xl mb-12 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-gray-300 mb-2">Tu nombre:</label>
                <input
                  type="text"
                  value={uploadedBy}
                  onChange={(e) => setUploadedBy(e.target.value)}
                  placeholder="Ingresa tu nombre"
                  className="w-full px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-green"
                />
              </div>
              <label className="col-span-1 md:col-span-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-6 py-2 bg-primary-green text-white font-bold rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
                >
                  <FiUpload /> SUBIR FOTO
                </motion.div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Photos Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <FiLoader className="text-4xl text-primary-green animate-spin" />
            </div>
          ) : displayPhotos.length > 0 ? (
            <>
              <Masonry
                breakpointCols={breakpoints}
                className="masonry-grid"
                columnClassName="masonry-grid-column"
              >
                {displayPhotos.map((photo, idx) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-dark-card rounded-xl overflow-hidden shadow-lg hover:shadow-glow transition-all group"
                  >
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={photo.url}
                        alt="Foto"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-end p-4">
                        <div className="w-full space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex gap-2">
                            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-red text-white rounded-lg hover:bg-red-600 transition-colors text-sm">
                              <FiHeart /> {photo.likes || 0}
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-green text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                              <FiMessageCircle /> Comentar
                            </button>
                          </div>
                          <p className="text-xs text-gray-300 text-center">Subida por: {photo.uploader}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </Masonry>

              {photos.length > 12 && !showMore && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMore(true)}
                  className="mt-12 mx-auto block px-8 py-3 bg-primary-green text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
                >
                  VER MÁS
                </motion.button>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No hay fotos aún. ¡Sé el primero en subir una!</p>
            </div>
          )}
        </motion.div>
      </div>

      <style>{`
        .masonry-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          grid-auto-rows: auto;
          gap: 1rem;
          width: auto;
        }
        @media (max-width: 640px) {
          .masonry-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Galeria;

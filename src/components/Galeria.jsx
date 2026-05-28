import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { uploadPhoto, getPhotos, deletePhoto, hidePhoto, restorePhoto, likePhoto, supabase } from '../services/supabase';
import { FaCamera, FaHeart, FaTrash, FaEye, FaEyeSlash, FaEllipsisV } from 'react-icons/fa';
import Masonry from 'react-masonry-css';

const Galeria = () => {
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [expandedPhoto, setExpandedPhoto] = useState(null);
  const [likedPhotos, setLikedPhotos] = useState(new Set());

  useEffect(() => {
    setIsAdmin(localStorage.getItem('adminToken') === 'authenticated');
    fetchPhotos();

    const subscription = supabase
      .on('postgres_changes', { event: '*', schema: 'public', table: 'fotos' }, () => {
        fetchPhotos();
      })
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('fotos')
        .select('*')
        .eq('visible', true)
        .order('created_at', { ascending: false });

      if (!error) {
        setPhotos(data || []);
      }
    } catch (err) {
      console.error('Error fetching photos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('galeria')
        .upload(`photos/${fileName}`, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('galeria')
        .getPublicUrl(`photos/${fileName}`);

      const { error: dbError } = await supabase
        .from('fotos')
        .insert([{
          url: publicUrl,
          uploader: 'Estudiante',
          created_at: new Date(),
          likes: 0,
          visible: true
        }]);

      if (!dbError) {
        fetchPhotos();
      }
    } catch (err) {
      console.error('Error uploading photo:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta fotografía?')) {
      await deletePhoto(id);
      fetchPhotos();
    }
  };

  const handleHidePhoto = async (id, hidden) => {
    if (hidden) {
      await restorePhoto(id);
    } else {
      await hidePhoto(id);
    }
    fetchPhotos();
  };

  const handleLikePhoto = async (id) => {
    const newLiked = new Set(likedPhotos);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
      await likePhoto(id);
    }
    setLikedPhotos(newLiked);
  };

  const displayedPhotos = showMore ? photos : photos.slice(0, visibleCount);

  const breakpointColumns = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <motion.section
      id="galeria"
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-dark-bg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2">
            Álbum de <span className="text-primary-green">Recuerdos</span>
          </h2>
          <p className="text-gray-400">Total de fotografías: {photos.length}</p>
        </motion.div>

        {/* Upload Button */}
        <motion.label
          className="block w-full max-w-md mx-auto mb-12 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="p-8 border-2 border-dashed border-primary-green rounded-xl bg-dark-card/50 hover:bg-dark-card transition text-center">
            <FaCamera className="text-4xl text-primary-green mx-auto mb-4" />
            <p className="text-white font-semibold">
              {uploading ? 'Subiendo...' : 'SUBIR FOTO'}
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              disabled={uploading}
              className="hidden"
            />
          </div>
        </motion.label>

        {/* Photos Grid */}
        {loading ? (
          <div className="text-center text-gray-400">Cargando fotografías...</div>
        ) : photos.length === 0 ? (
          <div className="text-center text-gray-400">Aún no hay fotografías. ¡Sé el primero en compartir!</div>
        ) : (
          <>
            <Masonry
              breakpointCols={breakpointColumns}
              className="masonry-grid"
              columnClassName="masonry-grid-column"
            >
              {displayedPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  className="relative group cursor-pointer mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  onClick={() => setExpandedPhoto(photo)}
                >
                  <img
                    src={photo.url}
                    alt="Foto"
                    className="w-full h-auto rounded-xl shadow-lg hover:shadow-glow transition"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-end p-4">
                    <div className="flex items-center space-x-2 text-white">
                      <FaHeart />
                      <span>{photo.likes || 0}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Masonry>

            {/* View More Button */}
            {photos.length > visibleCount && !showMore && (
              <motion.button
                onClick={() => setShowMore(true)}
                className="block mx-auto mt-12 px-8 py-4 bg-primary-green hover:shadow-glow text-white font-bold rounded-lg transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                VER MÁS
              </motion.button>
            )}
          </>
        )}
      </div>

      {/* Expanded Photo Modal */}
      {expandedPhoto && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setExpandedPhoto(null)}
        >
          <motion.div
            className="relative max-w-4xl w-full"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={expandedPhoto.url}
              alt="Expandida"
              className="w-full h-auto rounded-xl"
            />
            <button
              onClick={() => setExpandedPhoto(null)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-primary-green transition"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default Galeria;

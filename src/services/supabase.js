import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Auth Functions
export const adminLogin = async (username, password) => {
  try {
    // Verify credentials
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminToken', 'authenticated');
      localStorage.setItem('adminUsername', username);
      return { success: true };
    }
    return { success: false, error: 'Credenciales inválidas' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const adminLogout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUsername');
};

export const isAdminAuthenticated = () => {
  return localStorage.getItem('adminToken') === 'authenticated';
};

// Gallery Functions
export const uploadPhoto = async (file, uploader) => {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('galeria')
      .upload(`photos/${fileName}`, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('galeria')
      .getPublicUrl(`photos/${fileName}`);

    const { data: photoData, error: dbError } = await supabase
      .from('fotos')
      .insert([
        {
          url: publicUrl,
          uploader,
          created_at: new Date(),
          likes: 0,
          visible: true
        }
      ])
      .select();

    if (dbError) throw dbError;
    return { success: true, data: photoData[0] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getPhotos = async () => {
  try {
    const { data, error } = await supabase
      .from('fotos')
      .select('*')
      .eq('visible', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deletePhoto = async (photoId) => {
  try {
    const { error } = await supabase
      .from('fotos')
      .delete()
      .eq('id', photoId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const hidePhoto = async (photoId) => {
  try {
    const { error } = await supabase
      .from('fotos')
      .update({ visible: false })
      .eq('id', photoId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const restorePhoto = async (photoId) => {
  try {
    const { error } = await supabase
      .from('fotos')
      .update({ visible: true })
      .eq('id', photoId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const likePhoto = async (photoId) => {
  try {
    const { data, error: fetchError } = await supabase
      .from('fotos')
      .select('likes')
      .eq('id', photoId)
      .single();

    if (fetchError) throw fetchError;

    const { error } = await supabase
      .from('fotos')
      .update({ likes: (data.likes || 0) + 1 })
      .eq('id', photoId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Announcements Functions
export const createAnnouncement = async (announcement) => {
  try {
    const { data, error } = await supabase
      .from('anuncios')
      .insert([announcement])
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAnnouncements = async () => {
  try {
    const { data, error } = await supabase
      .from('anuncios')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateAnnouncement = async (id, announcement) => {
  try {
    const { error } = await supabase
      .from('anuncios')
      .update(announcement)
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteAnnouncement = async (id) => {
  try {
    const { error } = await supabase
      .from('anuncios')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Memory Book Functions
export const addMemory = async (message, author) => {
  try {
    const { data, error } = await supabase
      .from('libro_recuerdos')
      .insert([{ message, author, created_at: new Date() }])
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getMemories = async () => {
  try {
    const { data, error } = await supabase
      .from('libro_recuerdos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteMemory = async (id) => {
  try {
    const { error } = await supabase
      .from('libro_recuerdos')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Members Functions
export const getMembers = async () => {
  try {
    const { data, error } = await supabase
      .from('integrantes')
      .select('*')
      .order('nombre', { ascending: true });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const addMember = async (member) => {
  try {
    const { data, error } = await supabase
      .from('integrantes')
      .insert([member])
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateMember = async (id, member) => {
  try {
    const { error } = await supabase
      .from('integrantes')
      .update(member)
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteMember = async (id) => {
  try {
    const { error } = await supabase
      .from('integrantes')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

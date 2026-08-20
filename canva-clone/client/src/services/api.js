import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000
});

export const templateApi = {
  getAll: () => api.get('/templates')
};

export const designApi = {
  getAll: () => api.get('/design'),
  create: (payload) => api.post('/design', payload),
  update: (id, payload) => api.put(`/design/${id}`, payload),
  remove: (id) => api.delete(`/design/${id}`),
  updateBackground: (id, backgroundColor) => api.patch(`/design/${id}/background`, { backgroundColor })
};

export const uploadApi = {
  image: (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload', formData, { onUploadProgress });
  }
};

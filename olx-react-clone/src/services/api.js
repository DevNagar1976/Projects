const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export const productApi = {
  getAll() {
    return request('/products');
  },

  getById(id) {
    return request(`/products/${id}`);
  },

  add(product) {
    return request('/add-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
  },

  remove(id) {
    return request(`/products/${id}`, { method: 'DELETE' });
  },

  uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    return request('/upload', {
      method: 'POST',
      body: formData,
    });
  },
};

export { API_URL };

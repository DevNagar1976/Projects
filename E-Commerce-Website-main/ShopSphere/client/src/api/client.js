const API_URL = import.meta.env.VITE_API_URL || "/api";
const TOKEN_KEY = "shopsphere-token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const token = getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || "Something went wrong");
    error.status = response.status;
    error.errors = data.errors;
    throw error;
  }
  return data;
}

export const api = {
  register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  me: () => request("/auth/me"),
  products: (params = {}) => {
    const query = new URLSearchParams(Object.entries(params).filter(([, value]) => value !== "" && value != null));
    return request(`/products?${query}`);
  },
  getCart: () => request("/cart"),
  addToCart: (productId, quantity = 1) => request("/cart", { method: "POST", body: JSON.stringify({ productId, quantity }) }),
  updateCart: (productId, quantity) => request(`/cart/${productId}`, { method: "PUT", body: JSON.stringify({ quantity }) }),
  removeCartItem: (productId) => request(`/cart/${productId}`, { method: "DELETE" }),
  clearCart: () => request("/cart", { method: "DELETE" }),
  createOrder: (payload) => request("/orders", { method: "POST", body: JSON.stringify(payload) }),
  orders: () => request("/orders/mine"),
};

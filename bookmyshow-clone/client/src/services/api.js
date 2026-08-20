const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export const movieApi = {
  getMovies: () => request('/movies'),
  searchMovies: (q) => request(`/search-movies?q=${encodeURIComponent(q)}`)
};

export const bookingApi = {
  getBookedSeats: (movieId) => request(`/booked-seats/${movieId}`),
  bookTicket: ({ movieId, seatNumber, userEmail }) =>
    request('/book-ticket', {
      method: 'POST',
      body: JSON.stringify({ movieId, seatNumber, userEmail })
    })
};

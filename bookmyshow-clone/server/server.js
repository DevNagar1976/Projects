import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { connectDB } from './config/db.js';
import bookingRoutes from './routes/bookingRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173'
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'BookMyShow Clone API is running',
    endpoints: [
      'GET /api/movies',
      'GET /api/search-movies?q=sky',
      'GET /api/booked-seats/:movieId',
      'POST /api/book-ticket'
    ]
  });
});

app.use('/api', movieRoutes);
app.use('/api', bookingRoutes);

// Task 4: Keep the error middleware after all routes.
app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`BookMyShow API running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Server failed to start: ${error.message}`);
    process.exit(1);
  });

import express from 'express';
import Booking from '../models/Booking.js';
import { movies } from '../data/movies.js';

const router = express.Router();

function normalizeSeatNumbers(seatNumber) {
  const values = Array.isArray(seatNumber) ? seatNumber : [seatNumber];
  return values
    .filter(Boolean)
    .map((seat) => String(seat).trim().toUpperCase())
    .filter(Boolean);
}

// Task 5: AI-assisted seat validation helper.
// ChatGPT helped improve this by normalizing input, checking duplicates and keeping
// the validation reusable instead of repeating seat-check logic inside the route.
function hasAlreadyBookedSeat(bookedSeatNumbers, newSeatNumber) {
  const booked = new Set(bookedSeatNumbers.map((seat) => String(seat).toUpperCase()));
  return normalizeSeatNumbers(newSeatNumber).some((seat) => booked.has(seat));
}

// Extra route used by the React seat map to show seats already stored in MongoDB.
router.get('/booked-seats/:movieId', async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);
    const bookings = await Booking.find({ movieId }).select('seatNumber -_id').lean();
    res.json({ success: true, seats: bookings.map((booking) => booking.seatNumber) });
  } catch (error) {
    next(error);
  }
});

// Task 2 + Task 5: Book one or multiple seats and store them in MongoDB.
router.post('/book-ticket', async (req, res, next) => {
  try {
    const { movieId, seatNumber, userEmail } = req.body;
    const numericMovieId = Number(movieId);
    const seatNumbers = normalizeSeatNumbers(seatNumber);

    if (!numericMovieId || seatNumbers.length === 0 || !userEmail) {
      res.status(400);
      throw new Error('movieId, seatNumber and userEmail are required');
    }

    const movie = movies.find((item) => item.id === numericMovieId);
    if (!movie) {
      res.status(404);
      throw new Error('Movie not found');
    }

    const existingBookings = await Booking.find({ movieId: numericMovieId })
      .select('seatNumber -_id')
      .lean();
    const bookedSeatNumbers = existingBookings.map((booking) => booking.seatNumber);

    if (hasAlreadyBookedSeat(bookedSeatNumbers, seatNumbers)) {
      res.status(409);
      throw new Error('One or more selected seats are already booked. Please choose different seats.');
    }

    if (new Set(seatNumbers).size !== seatNumbers.length) {
      res.status(400);
      throw new Error('Duplicate seat numbers were selected');
    }

    const docs = seatNumbers.map((seat) => ({
      movieId: numericMovieId,
      movieTitle: movie.title,
      seatNumber: seat,
      userEmail
    }));

    const createdBookings = await Booking.insertMany(docs, { ordered: true });

    res.status(201).json({
      success: true,
      message: `Ticket confirmed for movieId ${numericMovieId}, seatNumber ${seatNumbers.join(', ')}, userEmail ${userEmail}`,
      movieId: numericMovieId,
      seatNumber: seatNumbers.length === 1 ? seatNumbers[0] : seatNumbers,
      userEmail,
      bookings: createdBookings
    });
  } catch (error) {
    if (error?.code === 11000) {
      res.status(409);
      return next(new Error('That seat was just booked by another user. Please select another seat.'));
    }
    next(error);
  }
});

export default router;

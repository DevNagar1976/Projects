import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: true
    },
    movieTitle: {
      type: String,
      required: true,
      trim: true
    },
    seatNumber: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },
    userEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    }
  },
  { timestamps: true }
);

// Prevent the same seat from being booked twice for the same movie.
bookingSchema.index({ movieId: 1, seatNumber: 1 }, { unique: true });

export default mongoose.model('Booking', bookingSchema);

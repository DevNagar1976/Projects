import React, { useEffect, useMemo, useState } from 'react';
import { bookingApi } from '../services/api.js';

const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
const seats = rows.flatMap((row) => Array.from({ length: 10 }, (_, i) => `${row}${i + 1}`));
const demoUnavailable = ['A3', 'A4', 'B7', 'C2', 'C3', 'D8', 'E5', 'F1'];

export default function BookingModal({ movie, onClose }) {
  const [selected, setSelected] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(demoUnavailable);
  const [userEmail, setUserEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const ticketPrice = 220;
  const total = useMemo(() => selected.length * ticketPrice, [selected]);

  useEffect(() => {
    if (!movie) return;
    setSelected([]);
    setUserEmail('');
    setConfirmed(false);
    setError('');

    bookingApi.getBookedSeats(movie.id)
      .then((data) => setBookedSeats([...new Set([...demoUnavailable, ...(data.seats || [])])]))
      .catch(() => setBookedSeats(demoUnavailable));
  }, [movie]);

  if (!movie) return null;

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setError('');
    setSelected((current) => current.includes(seat) ? current.filter((s) => s !== seat) : [...current, seat]);
  };

  const confirmBooking = async () => {
    if (!selected.length || !userEmail.trim()) {
      setError('Select at least one seat and enter your email.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await bookingApi.bookTicket({
        movieId: movie.id,
        seatNumber: selected,
        userEmail: userEmail.trim()
      });
      setConfirmed(true);
    } catch (err) {
      setError(err.message);
      try {
        const data = await bookingApi.getBookedSeats(movie.id);
        setBookedSeats([...new Set([...demoUnavailable, ...(data.seats || [])])]);
        setSelected((current) => current.filter((seat) => !(data.seats || []).includes(seat)));
      } catch {
        // The original booking error is more useful to the user.
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <section className="booking-modal">
        <div className="booking-head">
          <button className="icon-btn" onClick={onClose}>←</button>
          <div><strong>{movie.title}</strong><small>CityPlex • Ahmedabad</small></div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        {confirmed ? (
          <div className="success-state">
            <div className="success-icon">✓</div>
            <h2>Booking Confirmed!</h2>
            <p>{movie.title}</p>
            <p>Seats: <strong>{selected.join(', ')}</strong></p>
            <p>Email: <strong>{userEmail}</strong></p>
            <p>Total paid: <strong>₹{total}</strong></p>
            <small>Your booking is saved in MongoDB.</small>
            <button className="primary-btn" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <div className="showtime-row">
              <button className="date-pill active"><strong>10</strong><span>AUG</span></button>
              <button className="date-pill"><strong>11</strong><span>AUG</span></button>
              <button className="date-pill"><strong>12</strong><span>AUG</span></button>
              <button className="time-pill active">07:30 PM</button>
              <button className="time-pill">10:15 PM</button>
            </div>

            <div className="screen">All eyes this way please!</div>
            <div className="seat-map">
              {rows.map((row) => (
                <div className="seat-row" key={row}>
                  <span className="row-label">{row}</span>
                  {seats.filter((s) => s.startsWith(row)).map((seat) => {
                    const disabled = bookedSeats.includes(seat);
                    const active = selected.includes(seat);
                    return (
                      <button
                        key={seat}
                        disabled={disabled}
                        className={`seat ${active ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
                        onClick={() => toggleSeat(seat)}
                      >{seat.slice(1)}</button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="seat-legend">
              <span><i className="legend available"></i> Available</span>
              <span><i className="legend selected"></i> Selected</span>
              <span><i className="legend sold"></i> Sold</span>
            </div>

            <div className="booking-email-row">
              <label htmlFor="booking-email">Email for confirmation</label>
              <input
                id="booking-email"
                type="email"
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
                placeholder="you@example.com"
              />
              {error && <p className="booking-error">{error}</p>}
            </div>

            <div className="booking-footer">
              <div><span>{selected.length} ticket(s)</span><strong>₹{total}</strong></div>
              <button className="primary-btn" disabled={!selected.length || submitting} onClick={confirmBooking}>
                {submitting ? 'Booking...' : `Pay ₹${total}`}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

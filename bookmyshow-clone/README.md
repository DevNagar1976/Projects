# BookMyShow MERN Clone

Full-stack BookMyShow-style clone built with React + JavaScript on the frontend and Node.js + Express + MongoDB on the backend.

## Stack
- React + Vite + JavaScript
- Node.js + Express.js
- MongoDB + Mongoose
- REST API

## Assignment tasks included
1. `GET /api/movies` returns a hardcoded list of 5 upcoming movies with title, language and release date (plus UI fields).
2. `POST /api/book-ticket` accepts `movieId`, `seatNumber`, and `userEmail`, saves the booking in MongoDB, and returns a confirmation.
3. `GET /api/search-movies?q=sky` searches movie titles using `Array.filter()` and `String.toLowerCase()`.
4. Central Express 404 + error-handling middleware returns JSON errors.
5. Reusable AI-assisted seat validation checks whether selected seats are already booked and includes the requested explanatory comment.

The React seat map also calls `GET /api/booked-seats/:movieId` so MongoDB bookings immediately appear as sold seats.

## Folder structure
```text
bookmyshow-mern-clone/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── services/api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
├── server/
│   ├── config/db.js
│   ├── data/movies.js
│   ├── middleware/errorMiddleware.js
│   ├── models/Booking.js
│   ├── routes/movieRoutes.js
│   ├── routes/bookingRoutes.js
│   ├── .env.example
│   └── server.js
└── package.json
```

## Run the project

### 1. Create MongoDB environment file
Copy:
```text
server/.env.example
```
to:
```text
server/.env
```

For local MongoDB:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/bookmyshow_clone
CLIENT_URL=http://localhost:5173
```

For MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

### 2. Install dependencies
From the project root:
```bash
npm run install-all
```

### 3. Start frontend + backend together
```bash
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

## API examples

### Get movies
```http
GET http://localhost:5000/api/movies
```

### Search movies
```http
GET http://localhost:5000/api/search-movies?q=sky
```

### Book ticket
```http
POST http://localhost:5000/api/book-ticket
Content-Type: application/json
```

```json
{
  "movieId": 1,
  "seatNumber": "A1",
  "userEmail": "demo@example.com"
}
```

Multiple seats are also supported by passing an array:
```json
{
  "movieId": 1,
  "seatNumber": ["A1", "A2"],
  "userEmail": "demo@example.com"
}
```

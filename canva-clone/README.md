# Canvasly — Canva-style MERN Design Editor

A full-stack educational Canva-inspired poster maker built with React, Vite, Node.js, Express, MongoDB, Mongoose and Multer.

## Assignment requirements included

- Express server with a root HTML route
- `GET /api/templates` returns five template objects with `id`, `name`, and `imageUrl`
- `POST /api/design` accepts text + template information and stores the design in MongoDB
- `POST /api/upload` uses Multer and returns the uploaded image URL
- Background color selection is supported in the editor and through `PATCH /api/design/:id/background`
- CRUD for saved designs
- Responsive Canva-style editor UI

## Project structure

```text
canva-clone-mern/
├── client/                 React + Vite frontend
│   ├── public/templates/   Local SVG template previews
│   └── src/
│       ├── components/
│       ├── services/api.js
│       ├── App.jsx
│       └── styles.css
├── server/                 Node + Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   └── uploads/
└── package.json
```

## Run locally

### 1. Install packages

```bash
npm install
npm run install:all
```

### 2. Configure environment files

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/canva_clone
CLIENT_URL=http://localhost:5173
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

For MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

### 3. Start both frontend and backend

```bash
npm run dev
```

Open `http://localhost:5173`.

## Main API routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/templates` | Get five templates |
| GET | `/api/design` | Get saved designs |
| POST | `/api/design` | Create a design |
| PUT | `/api/design/:id` | Update a design |
| PATCH | `/api/design/:id/background` | Change background color |
| DELETE | `/api/design/:id` | Delete a design |
| POST | `/api/upload` | Upload image with field name `image` |

## Notes

This is an educational Canva-inspired clone, not an exact copy of Canva branding or proprietary features.

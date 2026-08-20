# OLX Clone - React + JavaScript + Express Backend

A full-stack OLX-style assignment project using **React + Vite + JavaScript** for the frontend and **Node.js + Express.js** for the backend.

## Features

- OLX-style responsive UI
- Search and category filtering
- Product cards and product detail modal
- Add new product using backend API
- Delete product using backend API
- Image URL support
- Real image upload with Multer
- Backend 404 handling for missing products
- In-memory product array (as required by the assignment)
- No TypeScript and no database required

## Assignment API routes

| Task | Method | Route | Purpose |
|---|---|---|---|
| 1 | GET | `/products` | Return all product objects as JSON |
| 2 | POST | `/add-product` | Add a product from `req.body` and return updated products |
| 3 | GET | `/products/:id` | Return one product; 404 if not found |
| 4 | DELETE | `/products/:id` | Delete using `filter()` and return updated products |
| 5 | POST | `/upload` | Upload one image using Multer |

Backend default URL: `http://localhost:5000`

## Project structure

```text
olx-react-clone/
├── public/
│   └── images/
├── src/
│   ├── components/
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── server/
│   ├── uploads/
│   ├── AI_IMAGE_UPLOAD_REVIEW.md
│   ├── package.json
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

## Run the full project

From the main `olx-react-clone` folder:

```bash
npm install
npm run dev:full
```

This starts:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

### Or run separately

Terminal 1:

```bash
npm run server
```

Terminal 2:

```bash
npm run dev
```

## POST /add-product sample body

```json
{
  "title": "iPhone 15",
  "price": 65000,
  "imageUrl": "/images/phone.svg",
  "location": "Ahmedabad, Gujarat",
  "category": "Mobile Phones",
  "description": "Good condition"
}
```

## Image upload test

Use `POST /upload` with `form-data` and field name:

```text
image = <choose a JPG/PNG/WEBP file>
```

Security consideration implemented: uploads are limited to 2 MB, allowed MIME types are restricted, and random server-side file names are generated. See `server/AI_IMAGE_UPLOAD_REVIEW.md`.

## Important

Products are stored in an **in-memory array**, so newly added/deleted data resets when the backend server restarts. This matches the assignment requirement.

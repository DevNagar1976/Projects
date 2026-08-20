# ShopSphere — Full-Stack MERN E-commerce Assignment

ShopSphere is a responsive e-commerce application built with **React + JavaScript + JSX**, **Node.js**, **Express**, and **MongoDB**. The React interface is connected to a REST API for authentication, products, persistent carts, checkout, orders, inventory, and admin product management.

## Main features

### Frontend

- Premium responsive React + Vite interface
- Product search, category filtering, and sorting
- Login and registration forms connected to the API
- Guest cart using `localStorage`
- Saved MongoDB cart after login
- Quantity controls, remove item, and clear cart
- Checkout form and cash-on-delivery order creation
- Automatic subtotal, 5% delivery charge, and total
- Wishlist, mobile navigation, loading states, and toast messages
- Local image assets with no third-party image dependency

### Backend

- Express REST API with a modular MVC structure
- MongoDB and Mongoose models for users, products, carts, and orders
- JWT authentication and bcrypt password hashing
- User and admin role authorization
- Product listing, search, filtering, sorting, and pagination
- Admin product create, update, and archive endpoints
- Persistent per-user cart with stock validation
- Order creation, order history, inventory reduction, and status updates
- Input validation with `express-validator`
- Helmet, CORS, rate limiting, request logging, and centralized error responses
- Seed script and automated API/unit tests

## Project structure

```text
ShopSphere-React-Frontend/
├── client/                 React + Vite frontend
│   ├── src/
│   │   ├── api/            API client and token helpers
│   │   ├── assets/         Local storefront images
│   │   ├── data/           Offline fallback products
│   │   ├── App.jsx
│   │   └── styles.css
│   └── .env.example
├── server/                 Node + Express backend
│   ├── src/
│   │   ├── config/         MongoDB connection
│   │   ├── controllers/    Request handlers
│   │   ├── data/           Product seed data
│   │   ├── middleware/     Auth, validation, logging, errors
│   │   ├── models/         Mongoose schemas
│   │   ├── routes/         REST routes
│   │   ├── utils/          JWT and cart calculations
│   │   ├── app.js
│   │   ├── seed.js
│   │   └── server.js
│   ├── tests/
│   └── .env.example
└── package.json            Root workspace commands
```

## Requirements

- Node.js 18 or newer
- npm
- MongoDB Community Server, MongoDB Compass, or a MongoDB Atlas connection string

## Run locally

1. Install all frontend and backend dependencies from the project root:

   ```bash
   npm install
   ```

2. Copy `server/.env.example` to `server/.env` and update these required values:

   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/shopsphere
   JWT_SECRET=replace_this_with_a_random_secret_at_least_32_characters
   ```

   For MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string. Do not commit the real `.env` file.

3. Add the sample products and admin account:

   ```bash
   npm run seed
   ```

4. Start the React frontend and Express backend together:

   ```bash
   npm run dev
   ```

5. Open:

   - Frontend: `http://localhost:5173`
   - API: `http://localhost:5000/api`
   - Health check: `http://localhost:5000/api/health`

The development admin login comes from `server/.env`. The example values are `admin@shopsphere.dev` and `Admin@12345`; change them for any real deployment.

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run frontend and backend together |
| `npm run client` | Run only the React app |
| `npm run server` | Run only the Express API with Nodemon |
| `npm run seed` | Reset product/cart/order sample data and create the admin |
| `npm test` | Run backend unit and API tests |
| `npm run build` | Create the production frontend build |
| `npm start` | Start the production Express server |

## REST API

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Create an account and return a JWT |
| `POST` | `/api/auth/login` | Public | Log in and return a JWT |
| `GET` | `/api/auth/me` | User | Get the logged-in profile |
| `GET` | `/api/products` | Public | List/search/filter/sort products |
| `GET` | `/api/products/:id` | Public | Get one product |
| `POST` | `/api/products` | Admin | Create a product |
| `PUT` | `/api/products/:id` | Admin | Update a product |
| `DELETE` | `/api/products/:id` | Admin | Archive a product |
| `GET` | `/api/cart` | User | Get the saved cart and totals |
| `POST` | `/api/cart` | User | Add a product to the cart |
| `PUT` | `/api/cart/:productId` | User | Change quantity |
| `DELETE` | `/api/cart/:productId` | User | Remove one item |
| `DELETE` | `/api/cart` | User | Clear the cart |
| `POST` | `/api/orders` | User | Checkout and create an order |
| `GET` | `/api/orders/mine` | User | Get personal order history |
| `GET` | `/api/orders` | Admin | Get every order |
| `PATCH` | `/api/orders/:id/status` | Admin | Change an order status |

Protected routes use this header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

## Production

Build the client with `npm run build`, set `NODE_ENV=production`, configure the production MongoDB URI, JWT secret, and allowed `CLIENT_URL`, then run `npm start`. Express is configured to serve `client/dist` in production.

# OLX Clone Assignment Tasks - Completed

## 1. GET /products
Implemented in `server/server.js`.
Returns a hardcoded/in-memory array of product objects in JSON format.

## 2. POST /add-product
Implemented in `server/server.js`.
Reads product data from `req.body`, validates title/price, adds the product to the in-memory array, and returns the updated array.

## 3. GET /products/:id
Implemented in `server/server.js`.
Returns one product by ID. Returns HTTP 404 with `Product not found` if no item matches.

## 4. DELETE /products/:id
Implemented in `server/server.js`.
Uses JavaScript `filter()` to remove the selected item and returns the updated product list.

## 5. Image upload + AI code review
Implemented as `POST /upload` using Multer.
The sample was improved by:
- limiting images to 2 MB,
- allowing only JPG/PNG/WEBP MIME types,
- generating random server-side file names.

See `server/AI_IMAGE_UPLOAD_REVIEW.md` for the written security consideration.

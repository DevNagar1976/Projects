import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');

fs.mkdirSync(uploadsDir, { recursive: true });

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'DELETE'],
}));
app.use(express.json({ limit: '1mb' }));
app.use('/uploads', express.static(uploadsDir));

let products = [
  {
    id: 1,
    title: 'Apple iPhone 15 Pro 256GB',
    price: 82999,
    location: 'Ahmedabad, Gujarat',
    category: 'Mobile Phones',
    imageUrl: '/images/phone.svg',
    featured: true,
    description: 'Excellent condition iPhone 15 Pro, 256GB storage, original box and charger included.'
  },
  {
    id: 2,
    title: 'Hyundai Creta SX Petrol 2022',
    price: 1340000,
    location: 'Surat, Gujarat',
    category: 'Cars',
    imageUrl: '/images/car.svg',
    featured: true,
    description: 'Single owner, low mileage, fully serviced Hyundai Creta with clean interior.'
  },
  {
    id: 3,
    title: 'Royal Enfield Classic 350',
    price: 165000,
    location: 'Rajkot, Gujarat',
    category: 'Motorcycles',
    imageUrl: '/images/bike.svg',
    featured: false,
    description: 'Well maintained Classic 350 with insurance and all documents available.'
  },
  {
    id: 4,
    title: '2 BHK Fully Furnished Flat',
    price: 4800000,
    location: 'Vadodara, Gujarat',
    category: 'For Sale: Houses & Apartments',
    imageUrl: '/images/home.svg',
    featured: true,
    description: 'Ready to move 2 BHK apartment in a well-connected area with parking facility.'
  },
  {
    id: 5,
    title: 'Samsung Galaxy S24 Ultra',
    price: 74999,
    location: 'Gandhinagar, Gujarat',
    category: 'Mobile Phones',
    imageUrl: '/images/phone2.svg',
    featured: false,
    description: 'Samsung Galaxy S24 Ultra in excellent condition. 12GB RAM, 256GB storage.'
  },
  {
    id: 6,
    title: 'Honda Activa 6G 2023',
    price: 72000,
    location: 'Mehsana, Gujarat',
    category: 'Scooters',
    imageUrl: '/images/scooter.svg',
    featured: false,
    description: '2023 Activa 6G, first owner, low running and regularly serviced.'
  },
  {
    id: 7,
    title: 'Gaming Laptop RTX 4060',
    price: 89999,
    location: 'Ahmedabad, Gujarat',
    category: 'Electronics',
    imageUrl: '/images/laptop.svg',
    featured: true,
    description: 'Powerful gaming laptop with RTX 4060 graphics, 16GB RAM and 1TB SSD.'
  },
  {
    id: 8,
    title: 'Office Chair - Ergonomic',
    price: 4999,
    location: 'Palanpur, Gujarat',
    category: 'Furniture',
    imageUrl: '/images/chair.svg',
    featured: false,
    description: 'Comfortable ergonomic office chair with adjustable height and lumbar support.'
  }
];

// Task 1: return the full hardcoded/in-memory product array.
app.get('/products', (req, res) => {
  res.json(products);
});

// Task 2: add a product to the in-memory array.
app.post('/add-product', (req, res) => {
  const { title, price, imageUrl, location, category, description, featured = false } = req.body;

  if (!title || price === undefined || price === null || Number(price) <= 0) {
    return res.status(400).json({ message: 'title and a valid price are required' });
  }

  const product = {
    id: Date.now(),
    title: String(title).trim(),
    price: Number(price),
    imageUrl: imageUrl?.trim() || '/images/other.svg',
    location: location?.trim() || 'Gujarat, India',
    category: category?.trim() || 'Other',
    description: description?.trim() || '',
    featured: Boolean(featured),
  };

  products = [product, ...products];
  return res.status(201).json(products);
});

// Task 3: return one product, or a 404 if it does not exist.
app.get('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.json(product);
});

// Task 4: delete one product using filter() and return the updated list.
app.delete('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const exists = products.some((item) => item.id === id);

  if (!exists) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products = products.filter((item) => item.id !== id);
  return res.json(products);
});

// Task 5: image upload sample with Multer.
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${extension}`;
    cb(null, safeName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPG, PNG and WEBP images are allowed'));
    }
    cb(null, true);
  },
});

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Image file is required' });
  }

  return res.status(201).json({
    message: 'Image uploaded successfully',
    imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
  });
});

app.get('/', (_req, res) => {
  res.json({
    message: 'OLX Clone API is running',
    routes: [
      'GET /products',
      'POST /add-product',
      'GET /products/:id',
      'DELETE /products/:id',
      'POST /upload',
    ],
  });
});

app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  if (err) {
    return res.status(400).json({ message: err.message || 'Request failed' });
  }
  return res.status(500).json({ message: 'Server error' });
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`OLX backend running at http://localhost:${PORT}`);
});

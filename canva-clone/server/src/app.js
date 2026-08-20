import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import designRoutes from './routes/designRoutes.js';
import templateRoutes from './routes/templateRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/', (_req, res) => {
  res.send(`<!doctype html><html><head><title>Canvasly API</title><style>body{font-family:Arial;padding:40px;background:#111827;color:#fff}code{color:#67e8f9}</style></head><body><h1>Canvasly MERN API</h1><p>API is running.</p><p><code>GET /api/templates</code></p><p><code>POST /api/design</code></p><p><code>POST /api/upload</code></p></body></html>`);
});

app.get('/api/health', (_req, res) => res.json({ success: true, message: 'Canvasly API is healthy' }));
app.use('/api/templates', templateRoutes);
app.use('/api/design', designRoutes);
app.use('/api/upload', uploadRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;

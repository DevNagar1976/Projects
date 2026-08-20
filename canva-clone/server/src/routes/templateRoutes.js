import { Router } from 'express';
import { getTemplates } from '../controllers/designController.js';

const router = Router();
router.get('/', getTemplates);
export default router;

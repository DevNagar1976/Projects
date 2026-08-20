import { Router } from 'express';
import {
  createDesign,
  deleteDesign,
  getDesign,
  getDesigns,
  updateBackground,
  updateDesign
} from '../controllers/designController.js';

const router = Router();
router.route('/').get(getDesigns).post(createDesign);
router.route('/:id').get(getDesign).put(updateDesign).delete(deleteDesign);
router.patch('/:id/background', updateBackground);
export default router;

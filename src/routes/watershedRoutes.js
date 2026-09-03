import { Router } from 'express';
import { upload } from '../middlewares/uploadMiddleware.js';
import { processFieldSubmission, getWatershedById } from '../controllers/watershedController.js';

const router = Router();

router.post('/assess', upload.single('fieldImage'), processFieldSubmission);
router.get('/:id', getWatershedById);

export default router;
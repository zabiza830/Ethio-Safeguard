import { Router } from 'express';
import { createAidRequest, getSenderAidRequests, getAvailableForDriver, updateAidStatus } from '../controllers/aidController';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.post('/', verifyToken, createAidRequest); // sender creates
router.get('/sender', verifyToken, getSenderAidRequests);
router.get('/available', verifyToken, getAvailableForDriver); // driver views pending
router.patch('/:id/status', verifyToken, updateAidStatus);

export default router;

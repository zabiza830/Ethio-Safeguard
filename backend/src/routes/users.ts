import { Router } from 'express';
import { listRegistrationRequests, updateRegistrationStatus } from '../controllers/userController';
import { verifyToken } from '../middleware/auth';

const router = Router();

// Only admins should use these in a real app - simple token check here
router.get('/registrations', verifyToken, listRegistrationRequests);
router.patch('/registrations/:id', verifyToken, updateRegistrationStatus);

export default router;

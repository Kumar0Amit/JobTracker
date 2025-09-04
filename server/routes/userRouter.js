import { Router } from 'express';
const router = Router();

// Import controller functions
import {
  getCurrentUser,
  updateUser,
  getApplicationStats,
} from '../controllers/userController.js';

// Import validation and security middleware
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import {
  authorizePermissions,
  restrictDemoUserAccess,
} from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

// Route to get the currently logged-in user's profile
router.get('/current-user', getCurrentUser);

// Route to update the user's profile.
// It uses a chain of middleware for security, file upload, and data validation.
router.patch(
  '/update-user',
  restrictDemoUserAccess,
  upload.single('avatar'), // Handles single file upload with the field name 'avatar'
  validateUpdateUserInput,
  updateUser
);

// Admin-only route to get application statistics
router.get(
  '/admin/app-stats',
  authorizePermissions('admin'), // Ensures only users with the 'admin' role can access
  getApplicationStats
);

export default router;
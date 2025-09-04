import { Router } from 'express';
const router = Router();

// Import controller functions
import {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
  showStats,
  snoozeFollowUp,
  markFollowUpDone,
  getFollowUpJobs 
} from '../controllers/jobController.js';

// Import validation middleware
import {
  validateIdParam,
  validateJobInput,
} from '../middleware/validationMiddleware.js';

// Import security middleware
import { restrictDemoUserAccess } from '../middleware/authMiddleware.js';
import { checkJobOwnership } from '../middleware/CheckJobExistenceMiddleware.js'; // Using our final, secure version

// Routes for getting all jobs and creating a new job
router
 .route('/')
 .get(getAllJobs)
 .post(restrictDemoUserAccess, validateJobInput, createJob);

// Route for job statistics (must come before the '/:id' route)
router.route('/stats').get(showStats);

router.get('/follow-ups', getFollowUpJobs);

// Routes for single job operations (get, update, delete)
// This is the most secure part, applying a chain of middleware checks.
router
 .route('/:id')
 .get(validateIdParam, checkJobOwnership, getJob)
 .patch(
    restrictDemoUserAccess,
    validateIdParam,
    validateJobInput,
    checkJobOwnership,
    updateJob
  )
 .delete(restrictDemoUserAccess, validateIdParam, checkJobOwnership, deleteJob);

router.patch('/snooze-followup/:id', snoozeFollowUp);
router.patch('/toggle-followup/:id', markFollowUpDone);
// router.get('/follow-ups', getFollowUpJobs);

export default router;
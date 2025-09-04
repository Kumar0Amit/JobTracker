import Job from '../models/jobModel.js';
import { NotFoundError, UnauthorizedError } from '../errors/customErrors.js';

/**
 * Middleware to check if a job exists and if the current user is authorized to access it.
 * It attaches the found job to the request object for subsequent use in the controller.
 */
export const checkJobOwnership = async (req, res, next) => {
  const { id } = req.params;

  const job = await Job.findById(id);

  // 1. Check if the job exists
  if (!job) {
    throw new NotFoundError(`No job with id ${id}`);
  }

  // 2. Check for ownership
  const isAdmin = req.user.role === 'admin';
  // CRITICAL: Use req.user.userId from the authenticateUser middleware, NOT req.body
  const isOwner = req.user.userId === job.createdBy.toString();

  if (!isAdmin &&!isOwner) {
    throw new UnauthorizedError('Not authorized to access this route');
  }

  // If checks pass, attach the job to the request object.
  // This is an efficiency improvement so the controller doesn't need to find the job again.
  req.job = job;
  next();
};
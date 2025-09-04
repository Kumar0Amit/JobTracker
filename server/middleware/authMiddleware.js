// middleware/authMiddleware.js

import {BadRequestError,UnauthenticatedError, UnauthorizedError } from '../errors/customErrors.js';
import { verifyJWT } from '../utils/jwt.js';

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('Authentication invalid');

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Not authorized to access this route');
    }
    next();
  };
};


export const restrictDemoUserAccess = (req, res, next) => {
  if (req.user.isTestUser)
    throw new BadRequestError(
      'Read-only mode. Demo User cannot perform write operations.'
    );
  next();
};





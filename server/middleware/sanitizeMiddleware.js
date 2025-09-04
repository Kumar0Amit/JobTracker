// server/middleware/sanitizeMiddleware.js
import mongoSanitize from 'mongo-sanitize';

/**
 * Sanitizes incoming request data to prevent NoSQL injection.
 * Compatible with Express 5 — avoids reassignment of req.query.
 */
export const sanitizeMiddleware = (req, res, next) => {
  if (req.body) {
    req.body = mongoSanitize(req.body);
  }

  if (req.params) {
    req.params = mongoSanitize(req.params);
  }

  if (req.query) {
    Object.assign(req.query, mongoSanitize(req.query)); // Safe mutation
  }

  next();
};

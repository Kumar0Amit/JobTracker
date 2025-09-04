import User from '../models/userModel.js';
import Job from '../models/jobModel.js';
import { v2 as cloudinary } from 'cloudinary';
import { formatImage } from '../middleware/multerMiddleware.js';

/**
 * @desc Get current logged-in user
 * @route GET /api/users/me
 * @access Private
 */
export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ user });
};

/**
 * @desc Update user profile (name, email, location, avatar, etc.)
 * @route PUT /api/users/me
 * @access Private
 */
export const updateUser = async (req, res) => {
  const updates = { ...req.body };
  delete updates.password; // never update password here

  // Handle avatar upload if present
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.uploader.upload(file);

    updates.avatar = response.secure_url;
    updates.avatarPublicId = response.public_id;
  }

  // Get current user before updating (for avatar cleanup)
  const userBeforeUpdate = await User.findById(req.user.userId);

  if (!userBeforeUpdate) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update user
  const updatedUser = await User.findByIdAndUpdate(
    req.user.userId,
    updates,
    { new: true, runValidators: true }
  ).select('-password');

  // Delete old avatar if replaced
  if (req.file && userBeforeUpdate.avatarPublicId) {
    await cloudinary.uploader.destroy(userBeforeUpdate.avatarPublicId);
  }

  res.status(200).json({
    message: 'User updated successfully',
    user: updatedUser,
  });
};


/**
 * @desc Get application stats (admin usage)
 * @route GET /api/users/stats
 * @access Private/Admin
 */
export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(200).json({ users, jobs });
};

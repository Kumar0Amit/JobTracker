import Job from '../models/jobModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import dayjs from 'dayjs';
import { JOB_STATUS } from '../utils/constants.js'; // Import constants for consistency

/**
 * @desc    Get all jobs for the logged-in user with filtering, sorting, and pagination
 * @route   GET /api/v1/jobs
 * @access  Private
 */
// controllers/jobController.js

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;

  // always create a new object, don't mutate req.query
  const queryObject = { createdBy: req.user.userId };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }

  if (jobStatus && jobStatus !== 'all') queryObject.jobStatus = jobStatus;
  if (jobType && jobType !== 'all') queryObject.jobType = jobType;

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  };
  const sortKey = sortOptions[sort] || sortOptions.newest;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

export const snoozeFollowUp = async (req, res) => {
  const jobId = req.params.id;

  const job = await Job.findOne({ _id: jobId, createdBy: req.user.userId });
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  if (!job.followUpDate) {
    return res.status(400).json({ message: 'No follow-up date set for this job' });
  }

  const newDate = new Date(job.followUpDate);
  newDate.setDate(newDate.getDate() + 3); // ⏰ Push by 3 days

  job.followUpDate = newDate;
  await job.save();

  res.status(200).json({ message: 'Follow-up date snoozed by 3 days', followUpDate: job.followUpDate });
};

export const markFollowUpDone = async (req, res) => {
  const jobId = req.params.id;

  const job = await Job.findOne({ _id: jobId, createdBy: req.user.userId });
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  job.followUpDone = !job.followUpDone;
  await job.save();

  res.status(200).json({
    message: `Follow-up marked as ${job.followUpDone ? 'done' : 'not done'}`,
    followUpDone: job.followUpDone,
  });
};



/**
 * @desc    Create a new job
 * @route   POST /api/v1/jobs
 * @access  Private
 */

export const createJob = async (req, res) => {
  const {
  contactName,
  contactEmail,
  contactPhone,
  ...rest
} = req.body;

const jobData = {
  ...rest,
  createdBy: req.user.userId,
  contactInfo: {
    name: contactName,
    email: contactEmail,
    phone: contactPhone,
  },
};


  const job = await Job.create(jobData);

  res.status(StatusCodes.CREATED).json({ job });
};

/**
 * @desc    Get a single job by ID
 * @route   GET /api/v1/jobs/:id
 * @access  Private
 */
export const getJob = async (req, res) => {
  res.status(StatusCodes.OK).json({ job: req.job });
};

/**
 * @desc    Update a job
 * @route   PATCH /api/v1/jobs/:id
 * @access  Private
 */
export const updateJob = async (req, res) => {
  const {
  contactName,
  contactEmail,
  contactPhone,
  ...rest
} = req.body;

const updatedData = {
  ...rest,
  contactInfo: {
    name: contactName,
    email: contactEmail,
    phone: contactPhone,
  },
};

const updatedJob = await Job.findByIdAndUpdate(req.params.id, updatedData, {
  new: true,
  runValidators: true,
});

  res.status(StatusCodes.OK).json({ message: 'Job updated successfully', job: updatedJob });
};



/**
 * @desc    Delete a job
 * @route   DELETE /api/v1/jobs/:id
 * @access  Private
 */
export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ message: 'Job deleted successfully', job: removedJob });
};



/**
 * @desc    Show stats about jobs (by status) and monthly applications
 * @route   GET /api/v1/jobs/stats
 * @access  Private
 */
export const showStats = async (req, res) => {

  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: "$jobStatus",
        count: { $sum: 1 },
      },
    },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = Object.values(JOB_STATUS).reduce((acc, status) => {
    acc[status] = stats[status] || 0;
    return acc;
  }, {});

  let monthlyApplications = [];
  try {
    monthlyApplications = await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 },
    ]);
    console.log("Aggregation result:", monthlyApplications);
  } catch (err) {
    console.error("Aggregation error:", err);
  }

  monthlyApplications = monthlyApplications
    .map((item) => {
      const { _id: { year, month }, count } = item;
      const date = dayjs().month(month - 1).year(year).format("MMM YY");
      return { date, count };
    })
    .reverse();

  const followUpsDue = await Job.countDocuments({
  createdBy: new mongoose.Types.ObjectId(req.user.userId),
  followUpDate: { $lte: new Date() },
  followUpDone: false,
});

res.status(StatusCodes.OK).json({
  defaultStats,
  monthlyApplications,
  followUpsDue,
});
};


/**
 * @desc    Show followups
 * @route   GET /api/v1/jobs/follow-ups
 * @access  Private
 */
export const getFollowUpJobs = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.userId);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const query = {
    createdBy: userId,
    followUpDate: { $lte: new Date() },
    followUpDone: false,
  };

  const jobsPromise = Job.find(query)
    .sort({ followUpDate: 1 })
    .skip(skip)
    .limit(limit);

  const countPromise = Job.countDocuments(query);

  const [jobs, totalJobs] = await Promise.all([jobsPromise, countPromise]);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(200).json({
    jobs,
    totalJobs,
    numOfPages,
    currentPage: page,
  });
};


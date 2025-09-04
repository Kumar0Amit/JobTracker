import mongoose from 'mongoose';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      trim: true,
      maxlength: 100,
    },
    position: {
      type: String,
      required: [true, 'Please provide job position'],
      trim: true,
      maxlength: 100,
    },
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: 'Remote',
      trim: true,
    },
 
    notes: {
      type: String,
      maxlength: 500,
    },
    jobLink: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
        'Please provide a valid URL',
      ],
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    interviewDate: {
      type: Date,
    },
    offerDate: {
      type: Date,
    },
    rejectionDate: {
      type: Date,
    },
    contactInfo: {
      name: { type: String, trim: true },
      email: { type: String, trim: true },
      phone: { type: String, trim: true },
    },
    followUpDate: {
        type: Date,
    },
    followUpDone: {
        type: Boolean,
        default: false,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Job must belong to a user'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Job', jobSchema);




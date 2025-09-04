import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      minlength: [2, 'Name must have at least 2 characters'],
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must have at least 8 characters'],
      maxlength: [32, 'Password cannot exceed 32 characters'],
      select: false, // never return password unless explicitly asked
    },
    country: { type: String, required: true ,default:""},
    state: { type: String, required: true ,default:""},
    city: { type: String, required: true , default:"" },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatar: {
      type: String, // cloudinary URL
      default: '',
    },
    avatarPublicId: {
      type: String, // needed to delete old images from cloudinary
      default: '',
    },
    accountVerified: { type: Boolean, default: false },

    verificationToken: String,
    verificationTokenExpires: Date,

    // Fields for OTP-based actions (like 2FA or phone verification)
    verificationCode: Number,
    verificationCodeExpire: Date,

    // Fields for Password Reset
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// 🔹 Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔹 Compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// 🔹 Generate OTP code (for 2FA, phone verification, etc.)
userSchema.methods.generateVerificationCode = function () {
  const code = Math.floor(100000 + Math.random() * 900000); // 6 digits
  this.verificationCode = code;
  this.verificationCodeExpire = Date.now() + 10 * 60 * 1000; // 10 mins
  return code;
};

// 🔹 Generate reset password token
userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
   .createHash('sha256')
   .update(resetToken)
   .digest('hex');

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 mins

  return resetToken;
};

// 🔹 Remove sensitive fields before sending user object in response
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.resetPasswordToken;
  delete obj.resetPasswordExpire;
  delete obj.verificationToken; // <-- ADDED
  delete obj.verificationTokenExpires; // <-- ADDED
  delete obj.verificationCode;
  delete obj.verificationCodeExpire;
  return obj;
};

const User = mongoose.model('User', userSchema);

export default User;
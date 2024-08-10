import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  },
  gender: {
    type: String,
    lowercase: true,
    enum: ['male', 'female', 'other'],
    required: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  friends: [{
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'accepted'],
      default: 'pending'
    }
  }],
  friendRequests: [{
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    }
  }]
}, {
  timestamps: true
});

export const UserModel = mongoose.model('User', userSchema);

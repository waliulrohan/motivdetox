import { Schema, Document, model, models } from 'mongoose';



const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  verifyCode: {
    type: String,
    required: [true, 'Verify Code is required'],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, 'Verify Code Expiry is required'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  rewards: [{ type: Schema.Types.ObjectId, ref: 'Reward' }],
}, { timestamps: true });

const UserModel = models.User || model('User', UserSchema);

export default UserModel;

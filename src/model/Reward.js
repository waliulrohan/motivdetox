import { Schema,  model, models } from 'mongoose';

const RewardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, default: 0 },
  badges: [{ type: String }],
}, { timestamps: true });

const RewardModel = models.Reward || model('Reward', RewardSchema);

export default RewardModel;

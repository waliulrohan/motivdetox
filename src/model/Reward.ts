import { Schema, Document, model, models } from 'mongoose';

export interface Reward extends Document {
  user: Schema.Types.ObjectId;
  points: number;
  badges: string[];
}

const RewardSchema: Schema<Reward> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, default: 0 },
  badges: [{ type: String }],
}, { timestamps: true });

const RewardModel = models.Reward || model<Reward>('Reward', RewardSchema);

export default RewardModel;

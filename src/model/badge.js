import { Schema,  model, models } from 'mongoose';

const BadgeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  icon: { type : String, required: true},
  name: { type: String, required: true }
}, { timestamps: true });

const BadgeModel = models.Reward || model('Reward', BadgeSchema);

export default BadgeModel;

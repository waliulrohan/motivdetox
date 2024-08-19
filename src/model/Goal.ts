import { Schema, Document, model, models } from 'mongoose';

export interface Goal extends Document {
  user: Schema.Types.ObjectId;
  title: string;
  description?: string;
  steps: string[];
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GoalSchema: Schema<Goal> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  steps: [{ type: String }],
  completed: { type: Boolean, default: false },
},{ timestamps: true });

const GoalModel = models.Goal || model<Goal>('Goal', GoalSchema);

export default GoalModel;

import { z } from 'zod';

export const createGoalSchema = z.object({
  user: z.string().length(24, 'User ID must be a valid ObjectId'), 
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  steps: z.array(z.string()).min(1, 'At least one step is required'),
  completed: z.boolean().optional(),
});

import { z } from 'zod';

export const createRewardSchema = z.object({
  user: z.string().length(24, 'User ID must be a valid ObjectId'), 
  points: z.number().min(0, 'Points must be a non-negative number'),
  badges: z.array(z.string()).optional(),
});

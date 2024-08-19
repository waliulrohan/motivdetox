import { z } from 'zod';

export const verifySchema = z.object({
  code: z.string().length(6, 'Verification code must be 6 digits'),
});

export const usernameValidation = z
  .string()
  .min(4, 'Username must be at least 4 characters')
  .max(20, "Username can't more be than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');

export const signUpSchema = z.object({
  username: usernameValidation,

  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const signInSchema = z.object({
    identifier: z.string(),
    password: z.string(),
})
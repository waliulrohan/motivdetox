'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, signUpSchema } from '@/schemas/userSchema';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAsyncMutation } from '@/hooks/hooks';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { notifyError, notifyLoading, notifySuccess } from '@/lib/Toasting';

const UserForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

 
  const onSubmit = async(data) => {
    try {
      setIsLoading(true)
      const toastId = notifyLoading('Signing in.')

      console.log(data)
      const result = await signIn('credentials', {
          redirect: false,
          identifier: data.identifier,
          password: data.password,
        });
      console.log(result)

    
        if (result?.error) {
          if (result.error === 'CredentialsSignin') {
            notifyError("Incorrect username or password", {id: toastId})
          } else {
              notifyError(result.error, {id: toastId})
          }
        }
    
        if (result?.url) {
          router.replace('/dashboard');
          notifySuccess('Successfully signed in.', {id: toastId})
        }
    } catch (error) {
      console.log(error)
    } finally{
      setIsLoading(false)
    }

  };

  return (
    <div className="h-full w-full md:h-fit md:w-1/2 lg:w-1/3 p-8 bg-black shadow-lg rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-6">Sign In to MOTIVDETOX</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="identifier" className="block text-sm font-medium mb-1">Email or Username</label>
          <input
            disabled={isLoading}
            id="identifier"
            {...register('identifier')}
            className="block w-full border border-gray-300 rounded-md py-2 px-3 bg-transparent shadow-sm sm:text-sm"
            placeholder="Enter your email or username"
          />
          {errors.identifier && <span className="text-gray-200 text-sm mt-1">{errors.identifier.message}</span>}
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              disabled={isLoading}
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="block w-full border border-gray-300 rounded-md py-2 px-3 bg-transparent shadow-sm sm:text-sm"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-2 right-0 pr-3 flex items-center hover:text-gray-500"
            >
              {showPassword ? (
                <EyeOff/>
              ) : (
                <Eye/>
              )}
            </button>
          </div>
          {errors.password && <span className="text-gray-200 text-sm mt-1">{errors.password.message}</span>}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default UserForm;

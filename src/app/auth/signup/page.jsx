'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/schemas/userSchema';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAsyncMutation } from '@/hooks/hooks';
import { useRouter } from 'next/navigation';

const UserForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [debouncedUsername, setDebouncedUsername] = useState(''); 

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedUsername(username);  // Update debouncedValue after a delay
    }, 1000); // 1000ms delay

    // Cleanup function that clears the timeout if value changes before delay is complete
    return () => {
      clearTimeout(handler);
    };
  }, [username]);
  
  const { data: usernameUniqueMessage, error, isError, isLoading: isCheckingUsername } = useQuery({
    queryKey: ['checkUsernameUnique', debouncedUsername],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/check-username-unique?username=${debouncedUsername}`);
        return response.data.message; // Axios automatically throws an error for non-2xx responses
      } catch (err) {
        const axiosError = err;
        return (axiosError.response?.data?.message || 'Error checking username');
      }
    },
    enabled: !!debouncedUsername,  // Only run query when debouncedUsername is valid
    retry: false, // Disable retry if the query fails
  });

  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  //mutation
  const signupUser = async (formData) => {
    const { data } = await axios.post('/api/signup', formData);
    return data;
  };
  const mutation = useMutation({
    mutationFn: signupUser,
  })
  const [executeMutation, isLoadingMutation, mutationData] = useAsyncMutation(mutation);

  const onSubmit = async(data) => {
    const executionData = await executeMutation("Signing up...",data);

    if(executionData && executionData.success){
      router.replace(`/auth/verify/${data.username}`)
    }
  };

  return (
    <div className="h-full w-full md:h-fit md:w-1/2 lg:w-1/3 p-8 bg-black shadow-lg rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-6">Sign Up to MOTIVDETOX</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
          <input
            disabled={isLoadingMutation}
            id="username"
            {...register('username')}
            onChange={(e) => {
              setUsername(e.target.value);
              clearErrors('username'); 
            }}
            autoComplete="new-password"
            className="block w-full border border-gray-300 rounded-md py-2 px-3 bg-transparent shadow-sm sm:text-sm"
            placeholder="Enter your username"
          />
          {errors.username && <span className="text-gray-200 text-sm mt-1 ml-2">{errors.username.message}</span>}
          {usernameUniqueMessage && <span className="text-gray-200 text-sm mt-1">{usernameUniqueMessage}</span>}
          {isCheckingUsername && <div className="text-green-600 text-sm mt-1 flex gap-2 items-center">
            Checking username
            <LoaderCircle className="animate-spin" size={15}/> 
          </div>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            disabled={isLoadingMutation}
            id="email"
            {...register('email')}
            className="block w-full border border-gray-300 rounded-md py-2 px-3 bg-transparent shadow-sm sm:text-sm"
            placeholder="Enter your email"
          />
          {errors.email && <span className="text-gray-200 text-sm mt-1">{errors.email.message}</span>}
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              disabled={isLoadingMutation}
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
          disabled={isLoadingMutation}
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default UserForm;

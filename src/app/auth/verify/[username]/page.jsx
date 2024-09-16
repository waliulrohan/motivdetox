'use client';

import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifySchema } from '@/schemas/userSchema';
import { useMutation} from '@tanstack/react-query';
import axios from 'axios';
import { useAsyncMutation } from '@/hooks/hooks';
import { useParams, useRouter } from 'next/navigation';

const UserForm = () => {
  const router = useRouter();
  const params = useParams()

  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: {
        code:""
    },
  });

  //mutation
  const verifyUser = async (bodyData) => {
    const { data } = await axios.post('/api/verify-code', bodyData);
    return data;
  };
  const mutation = useMutation({
    mutationFn: verifyUser,
  })
  const [executeMutation, isLoadingMutation, mutationData] = useAsyncMutation(mutation);

  const onSubmit = async(data) => {
    const executionData = await executeMutation("Verifying user...",{code: data.code, username: params.username});

    if(executionData && executionData.success){
      router.replace(`/auth/signin`)
    }
  };

  return (
    <div className="h-full w-full md:h-fit md:w-1/2 lg:w-1/3 p-8 bg-black shadow-lg rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-6">Verify on MOTIVDETOX</h2>
      <span className="text-gray-200 text-sm mt-1">Check your email for verification code</span>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">     
        <div>
          <label htmlFor="code" className="block text-sm font-medium mb-1">Verify Code</label>
          <input
            disabled={isLoadingMutation}
            id="code"
            {...register('code')}
            className="block w-full border border-gray-300 rounded-md py-2 px-3 bg-transparent shadow-sm sm:text-sm"
            placeholder="Enter your verification code"
          />
          {errors.code && <span className="text-gray-200 text-sm mt-1">{errors.code.message}</span>}
        </div>

        <button
          disabled={isLoadingMutation}
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default UserForm;

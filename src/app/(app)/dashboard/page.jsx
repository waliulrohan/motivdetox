'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React from 'react';

const Dashboard = () => {

  const fetchQuote = async () => {
		const response = await axios.get(`/api/ai/quote`);
		return response.data;
	};

    const { data, isLoading, isError, error, refetch } = useQuery({
      queryKey: ['quote'],
      queryFn: fetchQuote,
    });


  return (
    <div className="w-full h-full ">
      <div className="bg-red-100 p-4 rounded-lg shadow-md">
        {isLoading?
         (
          <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
          </div>
         ) :
        (
          <div className="text-center">
            <p className="text-lg font-semibold italic text-gray-800">{data.quote}</p>
            <p className="text-sm font-medium text-gray-600 mt-2">- {data.author}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

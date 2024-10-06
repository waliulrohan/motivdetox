'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";


const Dashboard = () => {

  return (
    <div className="w-full h-full text-gray-200">      
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-[75%] grid-flow-dense grid-cols-12 gap-4"
      >
        <HeaderBlock />
        <AboutBlock/>

      </motion.div>
    </div>
  );
};


const Block = ({ className, ...rest }) => {

  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={`col-span-4 rounded-lg border border-gray-700 bg-gray-800 p-6 ${className}`}
      {...rest}
    />
  );
};

const HeaderBlock = () => {

    const fetchQuote = async () => {
		const response = await axios.get(`/api/ai/quote`);
		return response.data;
	  };

    const { data, isLoading, isError, error, refetch } = useQuery({
      queryKey: ['quote'],
      queryFn: fetchQuote,
    });

   return (
    <Block className="col-span-12 row-span-2">
      <div className="p-4">
          {isLoading?
          (
            <div className="flex justify-center items-center h-full">
                  <Loader2 className="animate-spin h-8 w-8 text-gray-200" />
            </div>
          ) :
          (
            <div className="text-center">
              <p className="text-lg font-semibold italic">{data.quote}</p>
              <p className="text-sm font-medium text-gray-100 mt-2">- {data.author}</p>
            </div>
          )}
        </div>
    </Block>
    )
};

const AboutBlock = () => {
  function percentageOfYearPassed() {
    const now = new Date();
    
    // Get the start and end date of the current year
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
    
    // Calculate the total number of milliseconds in the year
    const totalMillisecondsInYear = endOfYear - startOfYear;
    
    // Calculate the number of milliseconds passed so far
    const millisecondsPassed = now - startOfYear;
    
    // Calculate the percentage of the year passed
    const percentagePassed = (millisecondsPassed / totalMillisecondsInYear) * 100;
    
    return percentagePassed.toFixed(2);  // Round to 2 decimal places
  }

  const [time, setTime] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format hours, minutes, and seconds with leading zero
  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return [
      hours < 10 ? "0" + hours : hours,
      minutes < 10 ? "0" + minutes : minutes,
      seconds < 10 ? "0" + seconds : seconds,
    ].join(":");
  };

  return (
    <>
    <Block className="col-span-6 text-xl">
      <p>
        {percentageOfYearPassed() + "% of the year has passed."}
      </p>
    </Block>

    <Block className="col-span-6 text-2xl">
      <div className="flex flex-col justify-center items-center ">
        <div>
          {formatTime(time)}
        </div>
        Every second counts.
      </div>
    </Block>
    </>
)
};

export default Dashboard;

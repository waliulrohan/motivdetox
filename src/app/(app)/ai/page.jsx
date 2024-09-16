'use client'

import { ArrowUp } from 'lucide-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ChatSidebar from '@/components/ai-chat-components/ChatSidebar';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';





const Page = () => {
	const router = useRouter()
	const { register, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			message: '',
		},
	});


	const createNewConversation = async (text) => {
		const response = await axios.post('/api/ai/chat', { text, isNewConversation: true });
		return response.data;
	  };

	  const queryClient = useQueryClient();
	
	  const mutation = useMutation({
		mutationFn: createNewConversation,
		onSuccess: (data) => {
		  // Invalidate and refetch
		  console.log(data);
		  queryClient.invalidateQueries({ queryKey: ['conversations'] });
		  router.push(`/ai/${data.conversationId}`);
		},
	  });
	
	  
	const handleNewConversation = async (text) => {
		try {
			const result = await mutation.mutateAsync(text);
			console.log("New conversation created:", result);
			// You can add additional logic here, such as updating the UI or navigating to the new conversation
		} catch (error) {
			console.error("Error creating new conversation:", error);
			// Handle the error appropriately
		}
	};
	  


	const onSubmit = (data) => {
		// Handle form submission
		console.log(data);
		handleNewConversation(data.message);
	};

	return (
		<>
			<ChatSidebar />
			<div className='w-full h-full bg-slate-400 flex flex-col'>
				{/* Header*/}
				<div className="w-full h-11 bg-slate-600 flex items-center px-4">
					{/* Header content */}
				</div>
				{/* cards */}
				<div className="flex-1 flex flex-wrap gap-4 p-4 items-center justify-center">
					<div className="flex flex-wrap gap-4 p-4 items-start justify-center">
						<div className="w-[150px] h-[90px] bg-slate-600 rounded-lg"></div>
						<div className="w-[150px] h-[90px] bg-slate-600 rounded-lg"></div>
						<div className="w-[150px] h-[90px] bg-slate-600 rounded-lg"></div>
					</div>
				</div>

				{/* Chat input */}
				<div className="w-full p-4 flex flex-row items-center justify-center">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-row gap-2 items-center justify-center w-4/5 bg-slate-600 py-2 px-4 rounded-lg"
					>
						<div className="flex-grow relative">
							<textarea
								autoCorrect='off'
								id="message"
								{...register('message', { required: 'Message is required' })}
								className="block w-full bg-transparent text-white outline-none resize-none rounded-md p-2 pr-10 min-h-[40px] max-h-[120px]"
								placeholder="Enter your message"
								rows={1}
								onInput={(e) => {
									e.target.style.height = 'auto';
									e.target.style.height = `${e.target.scrollHeight}px`;
								}}
							/>
						</div>

						<button
							type="submit"
							className="rounded-full bg-blue-500 hover:bg-blue-600 transition-colors px-3 py-3 text-white"
						>
							<ArrowUp size={20} />
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Page;
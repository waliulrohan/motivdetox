'use client'

import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import MessageItem from '@/components/ai-chat-components/messageItem';
import NewPrompt from '@/components/ai-chat-components/newPrompt';
import { useQuery } from '@tanstack/react-query';
import ChatSidebar from '@/components/ai-chat-components/ChatSidebar';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const Page = () => {

    const { conversationId } = useParams();

    const fetchMessages = async () => {
		const response = await axios.get(`/api/ai/messages/${conversationId}`);
		return response.data;
	};

    const { data: messagesData, isLoading, isError, refetch } = useQuery({
      queryKey: ['messages', conversationId],
      queryFn: fetchMessages,
    });

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [conversationId, messagesData]);

	return (
        <>
			<ChatSidebar />
            <div className='w-full h-full flex flex-col pb-24 '>
                {/* Header*/}
                <div className="w-full h-11 bg-transparent flex items-center px-4">
                    {/* Header content */}
                </div>
                {/* conversations */}
                <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
                    {isLoading ?
                    (
                      <div className="flex justify-center items-center h-full">
                        <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
                      </div>
                    ) :

                    messagesData && messagesData.messages.length > 0 ?
                    messagesData.messages.map((message) => (
                        <MessageItem key={message._id} message={message.parts[0].text} role={message.role} />
                    )) :
                    (<div>No messages found</div>)
                    
                    
                    }
                   {messagesData && <NewPrompt conversationId={conversationId} messages={messagesData.messages} />}
                    <div ref={endRef} />
                </div>
            </div>
        </>
	);
};

export default Page;
'use client'

import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import MessageItem from '@/components/ai-chat-components/messageItem';
import NewPrompt from '@/components/ai-chat-components/newPrompt';

const Page = () => {

    const { conversationId } = useParams();

    const [conversations, setConversations] = useState([
        {
            _id: '1',
            message: 'Hello, how are you? how can I help you?',
            role: 'model',
            createdAt: new Date(),
        },
        {
            _id: '2',
            message: 'I am fine, thank you for asking.',
            role: 'user',
            createdAt: new Date(),
        },
        {
            _id: '3',
            message: 'Hello, how are you? how can I help you?',
            role: 'model',
            createdAt: new Date(),
        },
        {
            _id: '4',
            message: 'I am fine, thank you for asking.',
            role: 'user',
            createdAt: new Date(),
        },
        {
            _id: '5',
            message: 'Hello, how are you? how can I help you?',
            role: 'model',
            createdAt: new Date(),
        },
        {
            _id: '6',
            message: 'I am fine, thank you for asking.',
            role: 'user',
            createdAt: new Date(),
        },
    ]);
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [conversationId]);

	return (
		<div className='w-full h-full bg-slate-400 flex flex-col'>
            {/* Header*/}
			<div className="w-full h-11 bg-slate-600 flex items-center px-4">
				{/* Header content */}
			</div>
            {/* conversations */}
            <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
                {conversations.map((conversation) => (
                    <MessageItem key={conversation._id} message={conversation.message} role={conversation.role} />
                ))}
				<NewPrompt />
                <div ref={endRef} />
			</div>
		</div>
	);
};

export default Page;
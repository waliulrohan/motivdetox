import React from 'react';
import Image from 'next/image';
import { BrainCircuit } from 'lucide-react';
import Markdown from 'react-markdown';

const MessageItem = ({ message, role }) => {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} rounded-lg p-3`}>
        {role === 'model' && (
          <div className="flex items-center justify-center mb-2 rounded-full bg-slate-600 p-2 w-10 h-10">
            <BrainCircuit className=" stroke-[0.75] min-w-8 w-8" />
          </div>
        )}
        {/* <Markdown>{message}</Markdown> */}
        <p>{message}</p>
      </div>
    </div>
  );
};

export default MessageItem;


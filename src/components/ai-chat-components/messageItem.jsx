import React from 'react';
import { BrainCircuit } from 'lucide-react';
import Markdown from 'react-markdown';

const MessageItem = ({ message, role }) => {
  const messageContent = React.isValidElement(message) ? message.props.children : message;

  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${role === 'user' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} rounded-lg p-2`}>
        {role === 'model' && (
          <div className="flex items-center justify-center mb-2 rounded-full bg-gray-700 p-1 w-10 h-10">
            <BrainCircuit className="stroke-[1.5] min-w-8 w-8 text-gray-300" />
          </div>
        )}
        <Markdown>{messageContent}</Markdown>
      </div>
    </div>
  );
};

export default MessageItem;


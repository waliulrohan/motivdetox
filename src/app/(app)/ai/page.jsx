import { MessageSquare, History, Zap, Globe, Sparkles } from 'lucide-react';

const Page = ({}) => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-400">Welcome to AI Chat</h1>
        <p className="text-xl mb-8 text-center text-gray-300">Start a conversation with our AI assistant and explore the power of artificial intelligence.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-indigo-300">
              <MessageSquare className="mr-2" size={24} />
              New Chat
            </h2>
            <p className="mb-6 text-gray-400">Begin a new conversation with the AI.</p>
            <button className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
              <Zap className="mr-2" size={20} />
              Start Chat
            </button>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-green-500/30 transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-green-300">
              <History className="mr-2" size={24} />
              Recent Chats
            </h2>
            <p className="mb-6 text-gray-400">Continue your previous conversations.</p>
            <button className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
              <History className="mr-2" size={20} />
              View History
            </button>
          </div>
        </div>

        <div className="mt-12 bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-300">AI Chat Features</h2>
          <ul className="space-y-4">
            <li className="flex items-center text-lg">
              <Zap className="w-6 h-6 mr-3 text-yellow-400" />
              <span>Real-time responses</span>
            </li>
            <li className="flex items-center text-lg">
              <Sparkles className="w-6 h-6 mr-3 text-pink-400" />
              <span>Customizable AI personality</span>
            </li>
            <li className="flex items-center text-lg">
              <Globe className="w-6 h-6 mr-3 text-blue-400" />
              <span>Multi-language support</span>
            </li>
          </ul>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl text-gray-300 mb-6">Ready to experience the future of AI communication?</p>
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
            <Sparkles className="mr-2" size={24} />
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
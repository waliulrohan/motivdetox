"use client"
import { MessageSquare, History, Zap, Globe, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Page = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div
      className="bg-gray-900 text-gray-100 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center text-indigo-400"
          variants={itemVariants}
        >
          Welcome to AI Chat
        </motion.h1>
        <motion.p
          className="text-xl mb-8 text-center text-gray-300"
          variants={itemVariants}
        >
          Start a conversation with our AI assistant and explore the power of artificial intelligence.
        </motion.p>
        
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={itemVariants}>
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-indigo-300">
              <MessageSquare className="mr-2" size={24} />
              New Chat
            </h2>
            <p className="mb-6 text-gray-400">Begin a new conversation with the AI.</p>
            <button className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
              <Zap className="mr-2" size={20} />
              Start Chat
            </button>
          </motion.div>
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-green-500/30 transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-green-300">
              <History className="mr-2" size={24} />
              Recent Chats
            </h2>
            <p className="mb-6 text-gray-400">Continue your previous conversations.</p>
            <button className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
              <History className="mr-2" size={20} />
              View History
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 bg-gray-800 p-8 rounded-lg shadow-lg"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-300">AI Chat Features</h2>
          <ul className="space-y-4">
            {[
              { icon: Zap, text: 'Real-time responses', color: 'text-yellow-400' },
              { icon: Sparkles, text: 'Customizable AI personality', color: 'text-pink-400' },
              { icon: Globe, text: 'Multi-language support', color: 'text-blue-400' },
            ].map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center text-lg cursor-pointer"
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: hoveredFeature === index ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className={`w-6 h-6 mr-3 ${feature.color}`} />
                </motion.div>
                <span>{feature.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div className="mt-12 text-center" variants={itemVariants}>
          <p className="text-xl text-gray-300 mb-6">Ready to experience the future of AI communication?</p>
          <motion.button
            className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center mx-auto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Sparkles className="mr-2" size={24} />
            Get Started Now
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Page;
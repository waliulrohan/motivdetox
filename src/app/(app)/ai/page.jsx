"use client"
import { MessageSquare, History, Zap, Globe, Sparkles, ChevronDown } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';

const Page = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const containerVariants = {
    hidden: { 
    opacity: 0,
     y: 50,
     scale: 0.9,
     rotate: -5,
     },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3,
        duration: 0.5,
        ease: "easeOut"
      } 
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: 'spring', 
        stiffness: 100,
        damping: 10,
      } 
    },
  };

  const floatingAnimation = {
    y: ['-10%', '10%'],
    transition: {
      y: {
        duration: 2,
        yoyo: Infinity,
        ease: 'easeInOut',
      }
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-gray-100 min-h-screen"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          className="text-6xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400"
          variants={itemVariants}
        >
          Welcome to AI Chat
        </motion.h1>
        <motion.p
          className="text-2xl mb-12 text-center text-gray-300"
          variants={itemVariants}
        >
          Explore the future of communication with our advanced AI assistant.
        </motion.p>
        
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={itemVariants}>
          <motion.div
            className="bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-blur-md border border-indigo-500/30"
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(79, 70, 229, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-3xl font-semibold mb-4 flex items-center text-indigo-300">
              <MessageSquare className="mr-3" size={32} />
              New Chat
            </h2>
            <p className="mb-6 text-gray-400 text-lg">Begin a new conversation with the AI.</p>
            <motion.button 
              className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg text-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="mr-3" size={24} />
              Start Chat
            </motion.button>
          </motion.div>
          <motion.div
            className="bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-blur-md border border-green-500/30"
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(34, 197, 94, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-3xl font-semibold mb-4 flex items-center text-green-300">
              <History className="mr-3" size={32} />
              Recent Chats
            </h2>
            <p className="mb-6 text-gray-400 text-lg">Continue your previous conversations.</p>
            <motion.button 
              className="w-full bg-green-600 text-white px-6 py-4 rounded-lg text-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <History className="mr-3" size={24} />
              View History
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 bg-gray-800 bg-opacity-50 p-10 rounded-lg shadow-lg backdrop-blur-md"
          variants={itemVariants}
        >
          <h2 className="text-4xl font-semibold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">AI Chat Features</h2>
          <ul className="space-y-6">
            {[
              { icon: Zap, text: 'Real-time responses', color: 'text-yellow-400' },
              { icon: Sparkles, text: 'Customizable AI personality', color: 'text-pink-400' },
              { icon: Globe, text: 'Multi-language support', color: 'text-blue-400' },
            ].map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center text-xl cursor-pointer"
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                whileHover={{ scale: 1.05, x: 20 }}
              >
                <motion.div
                  animate={{ rotate: hoveredFeature === index ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className={`w-8 h-8 mr-4 ${feature.color}`} />
                </motion.div>
                <span>{feature.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div className="mt-16 text-center" variants={itemVariants}>
          <p className="text-2xl text-gray-300 mb-8">Ready to experience the future of AI communication?</p>
          <motion.button
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-full text-2xl font-bold shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center mx-auto"
            whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(79, 70, 229, 0.5)' }}
            whileTap={{ scale: 0.9 }}
          >
            <Sparkles className="mr-3" size={28} />
            Get Started Now
          </motion.button>
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          animate={floatingAnimation}
        >
          <ChevronDown size={40} className="text-indigo-400 mx-auto" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Page;
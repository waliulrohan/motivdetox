"use client"
import { motion, useAnimationControls, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import ChatSidebarLink from "./ChatSidebarLink"
import { BrainCircuit, ChartArea, LayoutDashboard, Loader2, Plus } from "lucide-react"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';







const containerVariants = {
  close: {
    width: "0rem",
    padding: "0rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "16rem",
    padding: "1.25rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
}

const svgVariants = {
  close: {
    rotate: 360,
    stroke: "#ffffff", 
  },
  open: {
    rotate: 180,
    stroke: "#ffffff",
  },
}


const ChatSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const containerControls = useAnimationControls()
  const svgControls = useAnimationControls()

  const { conversationId } = useParams();

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open")
      svgControls.start("open")
    } else {
      containerControls.start("close")
      svgControls.start("close")
    }
  }, [isOpen])

  	const fetchConversations = async () => {
		const response = await axios.get('/api/ai/conversations');
		return response.data;
	};

    const { data: conversationsData, isLoading, isError, refetch } = useQuery({
      queryKey: ['conversations'],
      queryFn: fetchConversations,
    });


  useEffect(() => {
    if (conversationId) {

    }
  }, [conversationId]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen)
    setSelectedProject(null)
  }

  return (
    <>
      <motion.nav
        onMouseEnter={()=> setIsOpen(true)}
        onMouseLeave={()=> setIsOpen(false)}
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className={`bg-gray-800 flex flex-col z-10 gap-5  fixed top-0 left-0 min-h-dvh max-h-dvh  shadow-lg shadow-gray-900`} >  
        <div className="flex flex-row w-full justify-between place-items-center">
          <AnimatePresence>
            {isOpen
            && 
            <motion.div 
            initial="close"
            animate="open"
            exit="close"
            variants={{
              close: {
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.3, ease: "easeInOut" }
              },
              open: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.3, ease: "easeOut" }
              }
            }}
            className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center rounded-full" 
            >
              <BrainCircuit className="stroke-[1.5] min-w-8 w-8 text-gray-300" />
            </motion.div>}
          </AnimatePresence>
          <button
            className="p-1 rounded-full flex"
            onClick={() => handleOpenClose()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8 stroke-neutral-200"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={svgVariants}
                animate={svgControls}
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-3 flex-grow min-h-full ">

          <div className="h-[50px] flex flex-row justify-center items-end ">
              <ChatSidebarLink _id={'random2'} name="New conversation" isOpen={isOpen} hrefPath="/ai">
                <Plus className="stroke-inherit stroke-[0.75] min-w-6 w-6" />
              </ChatSidebarLink>
            </div>

          <div className="flex flex-col gap-3 flex-grow h-[calc(100%-100px)] overflow-y-auto overflow-x-hidden ">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
              </div>
            ) : conversationsData.conversations && conversationsData.conversations?.length > 0 ? (
              conversationsData.conversations.map((item) => (
                <ChatSidebarLink
                  key={item._id}
                  name={item.title || 'Untitled Conversation'}
                  isOpen={isOpen}
                  hrefPath={`/ai/${item._id}`}
                >
                  
                </ChatSidebarLink>
              ))
            ) : (
              <div className="text-neutral-400 text-center p-4">
                {conversationsData === null ? 'Error loading conversations' : 'No conversations yet'}
              </div>
            )}
          </div>
          <div className="h-[50px] flex flex-row justify-center items-end ">
            <ChatSidebarLink name="Back to Dashboard" _id={'random1'} isOpen={isOpen} hrefPath="/">
              <LayoutDashboard className="stroke-inherit stroke-[0.75] min-w-6 w-6" />
            </ChatSidebarLink>
          </div>
        </div>
      
      </motion.nav>
    </>
  )
}

export default ChatSidebar
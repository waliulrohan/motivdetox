"use client"
import { motion, useAnimationControls, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import ChatSidebarLink from "./ChatSidebarLink"
import { ChartArea, LayoutDashboard, Plus } from "lucide-react"

const chatList = [
  {
    id: "project_1"
  },
  {
    id: "task_manager"
  },
  {
    id: "personal_assistant"
  },
  {
    id: "code_review_helper"
  },
  {
    id: "brainstorming_session"
  },
  {
    id: "bug_tracker"
  },
  {
    id: "feature_planner"
  },
  {
    id: "documentation_helper"
  },
  {
    id: "performance_optimizer"
  },
  {
    id: "security_advisor"
  },
  {
    id: "ui_ux_consultant"
  },
  {
    id: "database_designer"
  },
]


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
    stroke: "#000000", 
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

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open")
      svgControls.start("open")
    } else {
      containerControls.start("close")
      svgControls.start("close")
    }
  }, [isOpen])

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
        className={`bg-neutral-900 flex flex-col z-10 gap-5  fixed top-0 left-0 min-h-dvh max-h-dvh  shadow shadow-neutral-600`} >  
        <div className="flex flex-row w-full justify-between place-items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full" />
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
              <ChatSidebarLink name="New conversation" isOpen={isOpen} hrefPath="/">
                <Plus className="stroke-inherit stroke-[0.75] min-w-6 w-6" />
              </ChatSidebarLink>
            </div>

          <div className="flex flex-col gap-3 flex-grow h-[calc(100%-100px)] overflow-y-auto overflow-x-hidden ">
            {chatList.map((item) => (
              <ChatSidebarLink key={item.id} name={item.id} isOpen={isOpen} hrefPath={`/ai/${item.id}`}>

              </ChatSidebarLink>
            ))}
          </div>
          <div className="h-[50px] flex flex-row justify-center items-end ">
            <ChatSidebarLink name="Back to Dashboard" isOpen={isOpen} hrefPath="/">
              <LayoutDashboard className="stroke-inherit stroke-[0.75] min-w-6 w-6" />
            </ChatSidebarLink>
          </div>
        </div>
      
      </motion.nav>
    </>
  )
}

export default ChatSidebar
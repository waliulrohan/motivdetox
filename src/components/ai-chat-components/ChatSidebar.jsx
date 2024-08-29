"use client"
import { motion, useAnimationControls, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"


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
        className={`bg-neutral-900 flex flex-col z-10 gap-20  absolute top-0 left-0 h-full shadow shadow-neutral-600`}      >
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
        <div className="flex flex-col gap-3">
        </div>
      
      </motion.nav>
    </>
  )
}

export default ChatSidebar
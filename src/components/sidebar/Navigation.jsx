"use client"
import { motion, useAnimationControls, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import NavigationLink from "./NavigationLink"
import ProjectLink from "./ProjectLink"
import ProjectNavigation from "./ProjectNavigation"
import { BrainCircuit, ChartBarIcon, ChartPie, SquareStack, UsersIcon } from "lucide-react"

const containerVariants = {
  close: {
    width: "3rem",
    padding: "5px",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "16rem",
    padding: "20px",
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
  },
  open: {
    rotate: 180,
  },
}

const Navigation = () => {
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
      <motion.div
        onMouseEnter={()=> setIsOpen(true)}
        onMouseLeave={()=> setIsOpen(false)}
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className="bg-gray-800 flex flex-col z-10 gap-20 absolute top-0 left-0 h-full shadow shadow-gray-900"
      >
        <div className="flex flex-row w-full justify-between place-items-center">
          <div className="w-10 h-10 bg-gradient-to-br  from-gray-700 to-gray-800  rounded-full" />
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
          <NavigationLink name="Dashboard" isOpen={isOpen}>
            <ChartBarIcon className="stroke-inherit stroke-[1.7] min-w-8 w-8 text-gray-300" />
          </NavigationLink>
          <NavigationLink name="Projects" isOpen={isOpen}>
            <SquareStack className="stroke-inherit stroke-[1.7] min-w-8 w-8" />
          </NavigationLink>
          {/* <NavigationLink name="Tasks" isOpen={isOpen}>
            <DocumentCheckIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink> */}
          <NavigationLink name="Reporting" isOpen={isOpen}>
            <ChartPie className="stroke-inherit stroke-[1.7] min-w-8 w-8" />
          </NavigationLink>
          <NavigationLink name="Users" isOpen={isOpen}>
            <UsersIcon className="stroke-inherit stroke-[1.7] min-w-8 w-8" />
          </NavigationLink>
          <NavigationLink name="AI" isOpen={isOpen} hrefPath="ai">
            <BrainCircuit className="stroke-inherit stroke-[1.7] min-w-8 w-8" />
          </NavigationLink>
        </div>
       {/*
        <div className="flex flex-col gap-3">
          <ProjectLink
            name="Virtual Reality"
            setSelectedProject={setSelectedProject}
          >
          <div className="min-w-4 mx-2 border-pink-600 border rounded-full aspect-square bg-pink-700" />
          </ProjectLink>
          <ProjectLink
            name="Apple Vision Pro"
            setSelectedProject={setSelectedProject}
          >
            <div className="min-w-4 mx-2 border-indigo-600 border rounded-full aspect-square bg-indigo-700" />
          </ProjectLink>
          <ProjectLink name="Porsche" setSelectedProject={setSelectedProject}>
            <div className="min-w-4 mx-2 border-cyan-600 border rounded-full aspect-square bg-cyan-700" />
          </ProjectLink>
          <ProjectLink
            name="Secret Project"
            setSelectedProject={setSelectedProject}
          >
            <div className="min-w-4 mx-2 border-yellow-600 border rounded-full aspect-square bg-yellow-700" />
          </ProjectLink>
        </div>
       */}
      </motion.div>
      <AnimatePresence>
        {selectedProject && (
          <ProjectNavigation
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            isOpen={isOpen}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
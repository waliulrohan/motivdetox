'use client'
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link";

const linkVariants = {
  close: {
    x: -20,
    opacity: 0,
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      delay: 0.1, 
    },
  },
};

const iconVariants = {
  close: {
    opacity: 0,
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      delay: 0.1, 
    },
  },
};

const ChatSidebarLink = ({ children, name, isOpen, hrefPath="/", _id }) => {
  return (
    <motion.div 
    className=""
     whileTap={{
      scale: 0.95,
     }}
     whileHover={{
      scale: 1.05,
     }}
    >
    <Link
      href={hrefPath}
      className="flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-gray-100 stroke-gray-400 text-gray-400 hover:text-gray-100 place-items-center gap-3 hover:bg-gray-700/40 transition-colors duration-150"
    >
      <AnimatePresence>
      {isOpen && (
        <motion.div
          key={`link-${_id}`}
          initial="close"
          animate="open"
          exit="close"
          className="flex items-center gap-3 w-full"
        >
          <motion.div
            variants={iconVariants}
            className="text-inherit font-poppins overflow-clip whitespace-nowrap tracking-wide"
          >
            {children}
          </motion.div>
          <motion.p
            variants={linkVariants}
            className="text-inherit font-poppins whitespace-nowrap tracking-wide overflow-hidden text-ellipsis"
          >
            {name}
          </motion.p>
        </motion.div>
      )}
      </AnimatePresence>
    </Link>
    </motion.div>
  )
}

export default ChatSidebarLink

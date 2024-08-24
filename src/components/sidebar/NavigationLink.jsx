'use client'
import { motion, AnimatePresence } from "framer-motion"

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

const NavigationLink = ({ children, name, isOpen }) => {
  return (
    <a
      href="#"
      className="flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100"
    >
      {children}
      <AnimatePresence>
      {isOpen && (
          <motion.p
            key={name}
            variants={linkVariants}
            initial="close"
            animate="open"
            exit="close"
            className="text-inherit font-poppins overflow-clip whitespace-nowrap tracking-wide"
          >
            {name}
          </motion.p>
      )}
      </AnimatePresence>
    </a>
  )
}

export default NavigationLink

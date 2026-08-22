import { motion } from 'framer-motion'

const variants = {
  enter: (direction) => ({ x: direction === 'back' ? '-100%' : '100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction === 'back' ? '100%' : '-100%', opacity: 0 }),
}

export default function ScreenTransition({ screenKey, direction, children }) {
  return (
    <motion.div
      key={screenKey}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.32 }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  )
}

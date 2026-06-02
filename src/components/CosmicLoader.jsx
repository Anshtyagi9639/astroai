import { motion } from 'framer-motion'

export default function CosmicLoader({ message = 'Consulting the cosmos...' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 gap-6"
    >
      <div className="relative w-20 h-20">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{ borderTopColor: '#7c3aed', borderRightColor: '#4f46e5' }}
        />
        {/* Inner ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-3 rounded-full border-2 border-transparent"
          style={{ borderTopColor: '#06b6d4', borderLeftColor: '#7c3aed' }}
        />
        {/* Center star */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center text-2xl"
        >
          ✦
        </motion.div>
      </div>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-nebula-400 text-sm font-medium"
      >
        {message}
      </motion.p>
    </motion.div>
  )
}

import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function HoroscopeResult({ data, insights }) {
  if (!data) return null

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header card */}
      <motion.div variants={item} className="glass-card p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          background: `radial-gradient(ellipse at center, ${data.color || '#7c3aed'} 0%, transparent 70%)`
        }} />
        <div
          className="text-7xl mb-2 font-display"
          style={{ filter: `drop-shadow(0 0 20px ${data.color || '#7c3aed'})` }}
        >
          {data.zodiacSymbol}
        </div>
        <h2 className="font-display text-3xl font-bold text-gradient">{data.zodiacSign}</h2>
        <p className="text-stardust/60 text-sm mt-1">
          {data.element} · {data.rulingPlanet} · {data.chineseSign} Year
        </p>
        <p className="text-stardust/80 text-sm mt-3 leading-relaxed max-w-sm mx-auto">
          {data.description}
        </p>
      </motion.div>

      {/* Grid: lucky + daily */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div variants={item} className="glass-card p-4 text-center">
          <p className="text-xs text-nebula-400 font-medium mb-1">Lucky Number</p>
          <p className="font-display text-4xl font-bold text-gradient">{data.luckyNumber}</p>
        </motion.div>
        <motion.div variants={item} className="glass-card p-4 text-center">
          <p className="text-xs text-nebula-400 font-medium mb-1">Lucky Color</p>
          <p className="font-display text-xl font-bold text-stardust">{data.luckyColor}</p>
          <div className="w-6 h-6 rounded-full mx-auto mt-1.5 border border-white/20"
            style={{ background: data.color }} />
        </motion.div>
      </div>

      {/* Traits */}
      <motion.div variants={item} className="glass-card p-5">
        <h3 className="text-xs text-nebula-400 font-medium uppercase tracking-widest mb-3">Personality Traits</h3>
        <div className="flex flex-wrap gap-2">
          {data.traits?.map(t => (
            <span key={t} className="px-3 py-1 text-xs font-medium rounded-full"
              style={{ background: `${data.color}22`, border: `1px solid ${data.color}44`, color: data.color }}>
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Daily horoscope */}
      <motion.div variants={item} className="glass-card p-5">
        <h3 className="text-xs text-nebula-400 font-medium uppercase tracking-widest mb-3">Today's Cosmic Message</h3>
        <p className="text-stardust/85 text-sm leading-relaxed italic">
          "{data.dailyHoroscope}"
        </p>
      </motion.div>

      {/* AI Insights */}
      {insights && (
        <>
          <motion.p variants={item} className="text-xs text-nebula-400 font-medium uppercase tracking-widest text-center">
            ✦ AI-Powered Cosmic Insights ✦
          </motion.p>
          {[
            { key: 'career', icon: '💼', label: 'Career' },
            { key: 'love', icon: '💜', label: 'Love & Relationships' },
            { key: 'finance', icon: '💰', label: 'Finance' },
            { key: 'health', icon: '🌿', label: 'Health & Wellness' },
            { key: 'opportunities', icon: '🌟', label: 'Upcoming Opportunities' },
          ].map(({ key, icon, label }) => insights[key] && (
            <motion.div key={key} variants={item} className="glass-card glass-card-hover p-5">
              <h3 className="font-medium text-sm text-nebula-400 mb-2">{icon} {label}</h3>
              <p className="text-stardust/80 text-sm leading-relaxed">{insights[key]}</p>
            </motion.div>
          ))}
          {insights.cosmicMessage && (
            <motion.div variants={item} className="glass-card p-5 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(79,70,229,0.1))' }}>
              <p className="text-sm font-medium text-nebula-300 italic">✨ "{insights.cosmicMessage}"</p>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  )
}

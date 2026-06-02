import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SIGNS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓']

const TEAM = [
  { name: 'AI Astrologer', role: 'Powered by Claude', icon: '🤖', desc: 'Our AI engine trained on centuries of astrological wisdom.' },
  { name: 'Vedic Engine', role: 'Ancient Wisdom', icon: '🕉️', desc: 'Deep integration of Jyotish principles and planetary periods.' },
  { name: 'Western System', role: 'Tropical Zodiac', icon: '⭐', desc: 'Complete Sun sign analysis with transit forecasting.' },
]

export default function About() {
  return (
    <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="text-5xl mb-4">🌌</div>
        <h1 className="font-display text-5xl font-black text-gradient mb-4">About AstroAI</h1>
        <p className="text-stardust/60 text-lg max-w-xl mx-auto leading-relaxed">
          We're merging ancient cosmic wisdom with cutting-edge artificial intelligence to help you navigate life's journey with clarity and purpose.
        </p>
      </motion.div>

      {/* Zodiac wheel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-16"
      >
        {SIGNS.map((sym, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="w-12 h-12 glass-card glass-card-hover flex items-center justify-center text-2xl cursor-default"
          >
            {sym}
          </motion.div>
        ))}
      </motion.div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-8 mb-10 text-center"
      >
        <h2 className="font-display text-2xl font-bold text-stardust mb-4">Our Mission</h2>
        <p className="text-stardust/65 leading-relaxed max-w-2xl mx-auto">
          AstroAI exists to make cosmic wisdom accessible to everyone. By combining the time-tested principles of Vedic and Western astrology with the intelligence of modern AI, we deliver personalized guidance that speaks directly to your unique journey. We believe that understanding your cosmic blueprint can illuminate your path, deepen self-awareness, and reveal the timing of life's most significant opportunities.
        </p>
      </motion.div>

      {/* Team */}
      <div className="grid md:grid-cols-3 gap-5 mb-12">
        {TEAM.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="glass-card glass-card-hover p-6 text-center"
          >
            <div className="text-4xl mb-3">{t.icon}</div>
            <h3 className="font-display font-bold text-stardust">{t.name}</h3>
            <p className="text-nebula-400 text-xs font-medium mb-2">{t.role}</p>
            <p className="text-stardust/55 text-sm">{t.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="glass-card p-5 mb-10 text-center"
      >
        <p className="text-stardust/40 text-xs leading-relaxed">
          ✦ AstroAI is designed for entertainment, self-reflection, and personal growth. Our readings are not a substitute for professional advice. Always consult qualified professionals for medical, legal, or financial decisions. ✦
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <Link to="/horoscope" className="btn-primary px-8 py-4 text-base inline-block">
          <span>Start Your Cosmic Journey ✨</span>
        </Link>
      </motion.div>
    </div>
  )
}

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

const FEATURES = [
  { icon: '🔮', title: 'Birth Chart Analysis', desc: 'Deep cosmic profile from your exact birth moment, revealing planetary influences and life patterns.' },
  { icon: '✨', title: 'Daily Horoscopes', desc: 'Personalized daily guidance attuned to your zodiac sign and planetary transits.' },
  { icon: '🤖', title: 'AI Cosmic Chat', desc: 'Converse with our AI astrologer for instant insights on career, love, health, and destiny.' },
  { icon: '💫', title: 'Lucky Numbers & Colors', desc: "Discover your cosmic lucky numbers and colors to align with the universe's flow." },
  { icon: '🌙', title: 'Personality Insights', desc: 'Uncover your deepest traits, strengths, and shadows through your zodiac blueprint.' },
  { icon: '🌟', title: 'Future Opportunities', desc: 'AI-powered forecasts reveal upcoming cosmic windows for growth and transformation.' },
]

const TESTIMONIALS = [
  { name: 'Priya S.', sign: '♏ Scorpio', text: 'AstroAI gave me insights no other platform has. The AI chat feels like talking to a real astrologer.' },
  { name: 'Arjun M.', sign: '♌ Leo', text: 'Incredibly accurate personality analysis. The career insights were spot on for my current situation.' },
  { name: 'Sara K.', sign: '♓ Pisces', text: 'The daily horoscopes are beautifully written and actually resonate with my life. Love this app!' },
]

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card text-xs font-medium text-nebula-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-aurora-400 animate-pulse" />
            AI-Powered Vedic & Western Astrology
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black leading-[1.05] mb-6">
            <span className="text-gradient glow-text">Discover Your</span>
            <br />
            <span className="text-stardust">Cosmic Destiny</span>
          </h1>
          <p className="text-stardust/60 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Unlock the ancient wisdom of the stars, powered by modern AI. Your personalized cosmic roadmap awaits.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <Link to="/horoscope" className="btn-primary px-8 py-4 text-base">
            <span>Read My Stars ✨</span>
          </Link>
          <Link to="/chat" className="px-8 py-4 text-base rounded-xl border border-nebula-600/30 text-stardust/80 hover:border-nebula-500/50 hover:text-stardust transition-all font-medium">
            AI Astro Chat 🤖
          </Link>
        </motion.div>

        {/* Orbiting zodiac */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative w-48 h-48"
        >
          <div className="absolute inset-0 rounded-full border border-nebula-600/20" />
          <div className="absolute inset-0 flex items-center justify-center font-display text-5xl">♈</div>
          {['♌','♎','♒','♊'].map((sym, i) => (
            <div
              key={i}
              className="absolute text-lg opacity-40"
              style={{
                top: '50%', left: '50%',
                transform: `rotate(${i * 90}deg) translateX(80px) rotate(-${i * 90}deg)`,
                marginLeft: '-0.5em', marginTop: '-0.5em',
              }}
            >
              {sym}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gradient mb-4">Cosmic Features</h2>
            <p className="text-stardust/50 max-w-md mx-auto">Everything you need to navigate life with the wisdom of the stars</p>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.08}>
              <div className="glass-card glass-card-hover p-6 h-full">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-display font-bold text-lg text-stardust mb-2">{f.title}</h3>
                <p className="text-stardust/55 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <FadeIn>
          <h2 className="font-display text-3xl font-bold text-center text-gradient mb-12">What the Stars Say About Us</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div className="glass-card p-5">
                <p className="text-stardust/70 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div>
                  <p className="text-stardust font-medium text-sm">{t.name}</p>
                  <p className="text-nebula-400 text-xs">{t.sign}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center" id="contact">
        <FadeIn>
          <div className="max-w-2xl mx-auto glass-card p-12">
            <h2 className="font-display text-4xl font-bold text-stardust mb-4">
              Ready to Explore Your <span className="text-gradient">Cosmic Path</span>?
            </h2>
            <p className="text-stardust/50 mb-8">Your birth chart holds the blueprint of your soul. Let AI decode it for you.</p>
            <Link to="/horoscope" className="btn-primary px-10 py-4 text-base inline-block">
              <span>Begin Your Cosmic Journey ✨</span>
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}

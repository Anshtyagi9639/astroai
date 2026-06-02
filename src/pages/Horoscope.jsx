import { motion } from 'framer-motion'
import BirthForm from '../components/BirthForm.jsx'
import HoroscopeResult from '../components/HoroscopeResult.jsx'
import CosmicLoader from '../components/CosmicLoader.jsx'
import { useAstrology } from '../hooks/useAstrology.js'

export default function Horoscope() {
  const { loading, error, astrologyData, insights, fetchAstrology } = useAstrology()

  return (
    <div className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="text-5xl mb-4">🔮</div>
          <h1 className="font-display text-4xl font-bold text-gradient mb-3">Your Horoscope</h1>
          <p className="text-stardust/50 text-sm">Enter your birth details to unlock your cosmic profile</p>
        </motion.div>

        {/* Form card */}
        {!astrologyData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 md:p-8"
          >
            {error && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                ⚠ {error}
              </div>
            )}
            <BirthForm onSubmit={fetchAstrology} loading={loading} />
          </motion.div>
        )}

        {/* Loading */}
        {loading && <CosmicLoader message="Reading the celestial patterns for you..." />}

        {/* Results */}
        {astrologyData && !loading && (
          <>
            <HoroscopeResult data={astrologyData} insights={insights} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-8"
            >
              <button
                onClick={() => window.location.reload()}
                className="text-sm text-nebula-400 hover:text-nebula-300 underline underline-offset-4 transition-colors"
              >
                ← Read another chart
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

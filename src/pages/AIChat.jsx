import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BirthForm from '../components/BirthForm.jsx'
import CosmicLoader from '../components/CosmicLoader.jsx'
import { useAstrology } from '../hooks/useAstrology.js'
import { useChat } from '../hooks/useAstrology.js'

const QUICK_QUESTIONS = [
  'What does my career look like this month?',
  'When will I find love?',
  'What are my financial prospects?',
  'How can I improve my health?',
  'What opportunities should I watch for?',
]

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-nebula-gradient flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">
          ✦
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-nebula-600/30 border border-nebula-500/30 text-stardust rounded-br-sm'
            : 'glass-card text-stardust/90 rounded-bl-sm'
        }`}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {msg.content}
        {msg.insights && (
          <div className="mt-3 space-y-2 border-t border-nebula-600/20 pt-3">
            {[
              ['💼', 'career', 'Career'],
              ['💜', 'love', 'Love'],
              ['💰', 'finance', 'Finance'],
              ['🌿', 'health', 'Health'],
              ['🌟', 'opportunities', 'Opportunities'],
            ].map(([icon, key, label]) => msg.insights[key] && (
              <div key={key}>
                <p className="text-xs text-nebula-400 font-medium">{icon} {label}</p>
                <p className="text-xs text-stardust/75 mt-0.5">{msg.insights[key]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function AIChat() {
  const { loading: initLoading, astrologyData, fetchAstrology } = useAstrology()
  const { messages, loading, sendMessage, setMessages } = useChat(astrologyData)
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Welcome message once chart is loaded
  useEffect(() => {
    if (astrologyData && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: `✨ Namaste, ${astrologyData.name}! I've read your cosmic blueprint.\n\nYou're a ${astrologyData.zodiacSign} (${astrologyData.zodiacSymbol}), ruled by ${astrologyData.rulingPlanet}, with ${astrologyData.element} energy flowing through you.\n\nI'm ready to guide you through your career, love, finances, health, and the opportunities the cosmos has aligned for you. What would you like to explore?`,
        id: 'welcome',
      }])
    }
  }, [astrologyData])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    await sendMessage(text)
  }

  return (
    <div className="pt-20 min-h-screen flex flex-col max-w-2xl mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-6 text-center"
      >
        <h1 className="font-display text-3xl font-bold text-gradient">AI Astrology Chat</h1>
        <p className="text-stardust/40 text-xs mt-1">
          {astrologyData ? `✦ ${astrologyData.zodiacSign} · ${astrologyData.name}` : 'Enter your birth details to begin'}
        </p>
      </motion.div>

      {/* Setup form */}
      {!astrologyData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6"
        >
          <h2 className="font-medium text-stardust/80 text-sm mb-5 text-center">
            🌟 First, let me read your stars
          </h2>
          <BirthForm onSubmit={fetchAstrology} loading={initLoading} />
        </motion.div>
      )}

      {initLoading && <CosmicLoader message="Mapping your celestial chart..." />}

      {/* Chat window */}
      {astrologyData && !initLoading && (
        <div className="flex-1 flex flex-col glass-card overflow-hidden mb-4" style={{ minHeight: '60vh' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: '55vh' }}>
            <AnimatePresence>
              {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
            </AnimatePresence>
            {loading && (
              <div className="flex items-center gap-2 text-nebula-400 text-xs ml-10">
                <div className="flex gap-1">
                  {[0, 0.2, 0.4].map((d, i) => (
                    <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-nebula-400"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, delay: d, repeat: Infinity }} />
                  ))}
                </div>
                <span>AstroAI is consulting the cosmos...</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-stardust/30 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_QUESTIONS.map(q => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); }}
                    className="text-xs px-3 py-1.5 rounded-full border border-nebula-600/25 text-stardust/50 hover:text-stardust/80 hover:border-nebula-500/40 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-nebula-600/15">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask about your destiny..."
                className="input-cosmic flex-1 text-sm py-2.5"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="btn-primary px-4 py-2.5 text-sm rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>✦</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

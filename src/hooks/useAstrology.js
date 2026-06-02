import { useState } from 'react'
import { getAstrologyData } from '../services/astrologyService'
import { getAstrologyInsights } from '../services/openaiService'

export function useAstrology() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [astrologyData, setAstrologyData] = useState(null)
  const [insights, setInsights] = useState(null)

  const fetchAstrology = async (formData) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAstrologyData(formData)
      setAstrologyData(data)
      const ai = await getAstrologyInsights(data)
      setInsights(ai)
      return { data, insights: ai }
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, astrologyData, insights, fetchAstrology }
}

export function useChat(astrologyData) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async (text) => {
    const userMsg = { role: 'user', content: text, id: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const insights = await getAstrologyInsights(astrologyData, text)
      const reply = insights.cosmicMessage
        ? `✨ ${insights.career}\n\n💫 ${insights.love}\n\n🌟 ${insights.cosmicMessage}`
        : 'The stars are aligning your answer...'

      const botMsg = {
        role: 'assistant',
        content: reply,
        insights,
        id: Date.now() + 1,
      }
      setMessages(prev => [...prev, botMsg])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'The cosmic energies are momentarily disrupted. Please try again.',
        id: Date.now() + 1,
      }])
    } finally {
      setLoading(false)
    }
  }

  return { messages, loading, sendMessage, setMessages }
}

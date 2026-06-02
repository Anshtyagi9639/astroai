// ─── AI Astrology Insights Service ───────────────────────────────────────────
// Uses the Anthropic API embedded in this artifact environment.
// Falls back to rich static content when no API key is configured.

export async function getAstrologyInsights(astrologyData, userMessage = null) {
  const systemPrompt = `You are AstroAI, a mystical and insightful astrology guide with deep knowledge of vedic and western astrology. 
You speak with elegant, poetic wisdom while remaining practical and grounded. 
Your responses blend cosmic symbolism with actionable life guidance.
Always structure your response as JSON with these keys:
{
  "career": "2-3 sentences about career and professional life",
  "love": "2-3 sentences about love, relationships, and emotional connections",
  "finance": "2-3 sentences about money, investments, and financial opportunities",
  "health": "2-3 sentences about physical and mental wellness",
  "opportunities": "2-3 sentences about upcoming cosmic opportunities and timing",
  "cosmicMessage": "1 inspiring sentence that is the cosmic message of the day"
}
Keep each section focused, mystical yet practical, and deeply personalized to the birth chart data.`

  const userPrompt = userMessage
    ? `The user (${astrologyData.name}, ${astrologyData.zodiacSign}) asks: "${userMessage}"
       
Birth data: Born ${astrologyData.dob} at ${astrologyData.timeOfBirth || 'unknown time'}, from ${astrologyData.city}.
Element: ${astrologyData.element}, Ruling Planet: ${astrologyData.rulingPlanet}
Key traits: ${astrologyData.traits?.join(', ')}

Provide personalized astrology insights as JSON.`
    : `Provide complete astrology insights for:
Name: ${astrologyData.name}
Zodiac Sign: ${astrologyData.zodiacSign} (${astrologyData.zodiacSymbol})
Date of Birth: ${astrologyData.dob}
Time of Birth: ${astrologyData.timeOfBirth || 'Not specified'}
City: ${astrologyData.city}
Element: ${astrologyData.element}
Ruling Planet: ${astrologyData.rulingPlanet}
Core Traits: ${astrologyData.traits?.join(', ')}
Daily Horoscope Theme: ${astrologyData.dailyHoroscope}

Generate deeply personalized insights covering career, love, finance, health, and opportunities as JSON.`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!response.ok) throw new Error('API error')

    const data = await response.json()
    const text = data.content?.map(b => b.text || '').join('') || ''
    const clean = text.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return getFallbackInsights(astrologyData)
  }
}

function getFallbackInsights(data) {
  const sign = data.zodiacSign || 'Aries'
  const name = data.name || 'Cosmic Traveler'
  const planet = data.rulingPlanet || 'the cosmos'
  const element = data.element || 'elemental'

  const pool = {
    Aries: {
      career: "Mars ignites your professional ambitions — a bold initiative you have been hesitating on will find its moment this week. Leadership opportunities emerge from unexpected quarters, rewarding those who act decisively.",
      love: "Passionate Venus transits amplify your magnetic charm. A soulmate connection deepens into something profound, while single Aries may encounter someone who truly matches their fire.",
      finance: "Jupiter aligns with your financial house, signaling an auspicious window for investments. Avoid impulsive purchases; instead, channel resources into long-term growth vehicles.",
      health: "Your vitality is heightened, but channel that Martian energy mindfully. Vigorous exercise relieves tension perfectly — consider new athletic challenges that feed your competitive spirit.",
      opportunities: "A cosmic portal opens around the next new moon, bringing breakthrough opportunities in areas you have long pursued. Stay open to unconventional paths to your goals.",
      cosmicMessage: "Courage is your compass — let it guide you through every uncharted territory life presents.",
    },
    Taurus: {
      career: "Venus blesses your professional relationships, making this an ideal time to negotiate, collaborate, and showcase your creative talents. A steady, patient approach yields extraordinary results.",
      love: "Your natural warmth and sensuality reach new heights. Existing partnerships deepen in beautiful ways, while your authentic self-expression draws admiring hearts into your orbit.",
      finance: "Earth energy stabilizes your financial foundation. A practical investment or savings strategy initiated now will compound magnificently over coming seasons.",
      health: "Nature is your healer. Grounding activities — garden walks, nourishing meals, restorative yoga — restore your vitality and calm your nervous system beautifully.",
      opportunities: "Material and creative opportunities converge in a rare alignment. Your patience is about to be rewarded with something worth the beautiful wait.",
      cosmicMessage: "Beauty is not merely seen but felt — and you carry the gift of making the world more beautiful simply by being fully yourself.",
    },
    Gemini: {
      career: "Mercury sharpens your communication to diamond clarity. Writing, presenting, and networking bring remarkable results. A message or conversation this week could open significant professional doors.",
      love: "Your wit and intellectual depth captivate hearts effortlessly. A stimulating exchange of ideas becomes the foundation of a meaningful connection.",
      finance: "Multiple income streams align favorably. Your networking genius unlocks financial opportunities others overlook — stay curious and connected.",
      health: "Mental health is physical health for you. Creative stimulation, meaningful conversations, and variety in routine keep your nervous system vibrant and balanced.",
      opportunities: "Information is treasure right now. A piece of knowledge you discover or a connection you make will prove pivotal in ways that unfold over the next several months.",
      cosmicMessage: "Every conversation is a universe — you have the rare gift of making others feel their world has expanded simply by talking with you.",
    },
    Cancer: {
      career: "The moon illuminates hidden career opportunities. Trust your intuition in professional decisions — it is sharper than any analysis right now.",
      love: "Deep emotional bonds are highlighted. Vulnerability becomes your greatest strength as authentic sharing creates extraordinary intimacy.",
      finance: "Domestic investments and family-oriented financial decisions are favored. Your instinct for security guides you toward wise choices.",
      health: "Emotional wellbeing directly influences physical health now. Prioritize rest, nourishment, and activities that make your soul feel at home.",
      opportunities: "Home, family, and creative ventures offer unexpected growth. What nurtures you also opens new professional and personal doors.",
      cosmicMessage: "Your sensitivity is not a weakness — it is the very thing that allows you to feel and share the beauty of being alive.",
    },
    Leo: {
      career: "The sun blazes through your professional house. Your generosity, creativity, and leadership are recognized and rewarded in significant ways.",
      love: "Your heart is wide open and radiant. Romantic prospects are exceptional — let your authentic warmth lead, and love follows naturally.",
      finance: "Generous energy returns to you multiplied. Strategic investments aligned with your passion and creativity yield strong returns.",
      health: "Vitality is your birthright. Joyful movement, sunshine, and activities that make your heart sing restore and energize you completely.",
      opportunities: "Creative projects and leadership roles offer transformative opportunities. Step fully into your magnificence — the cosmos supports it.",
      cosmicMessage: "You were born to shine — and your light does not diminish others but rather gives them permission to glow.",
    },
    Virgo: {
      career: "Precision and dedication bring exceptional results. A detail-oriented project or systematic improvement creates significant professional advancement.",
      love: "Thoughtful gestures and genuine service express your love language beautifully. Connection deepens through acts of care and attention.",
      finance: "Methodical financial planning yields extraordinary results. Small, consistent actions compound into remarkable outcomes over time.",
      health: "Mind-body integration is your superpower. Routines that honor both analytical and physical needs create sustainable, vibrant health.",
      opportunities: "Mastery and expertise open doors others cannot enter. Your dedication to excellence is about to be recognized in meaningful ways.",
      cosmicMessage: "Excellence is not perfectionism — it is the loving attention you bring to everything you do, and the world is better for it.",
    },
    Libra: {
      career: "Collaboration and diplomatic skill create professional breakthroughs. Your ability to find harmony in conflict makes you invaluable to teams.",
      love: "Venus blesses your relationships with grace and beauty. Balance between giving and receiving creates the harmonious love you deeply desire.",
      finance: "Partnerships and collaborations offer strong financial opportunity. Fair, balanced agreements lead to lasting prosperity.",
      health: "Balance in all things restores your wellbeing. Alternating activity with rest, and social time with solitude, creates perfect equilibrium.",
      opportunities: "Legal, artistic, and partnership ventures are especially favored. Your natural charm and sense of justice open remarkable doors.",
      cosmicMessage: "You seek balance not as an absence of conflict but as the dynamic dance of opposing forces — and in that dance, beauty is born.",
    },
    Scorpio: {
      career: "Deep research, strategic thinking, and transformation work play to your strengths now. A hidden resource or talent is ready to surface.",
      love: "Intensity creates extraordinary intimacy. The depth of connection you offer is rare — those worthy of your trust will treasure it completely.",
      finance: "Shared resources, investments, and strategic wealth building are highlighted. Your ability to see hidden value guides excellent decisions.",
      health: "Emotional release is physical healing. Transformative practices — therapy, deep movement, time in nature — restore you profoundly.",
      opportunities: "Hidden opportunities reveal themselves to your perceptive eyes. What appears as an ending contains the seeds of powerful rebirth.",
      cosmicMessage: "You have walked through fire and emerged luminous — your power comes not from avoiding darkness but from knowing it intimately.",
    },
    Sagittarius: {
      career: "Expansion, teaching, and cross-cultural connections bring professional opportunity. Your optimism inspires teams and attracts powerful mentors.",
      love: "Adventure and shared philosophy create deep romantic connection. Someone who matches your enthusiasm for growth and exploration draws near.",
      finance: "International connections, publishing, and educational ventures offer financial growth. Think expansively and the universe expands with you.",
      health: "Movement and adventure are your medicine. Outdoor activities, travel, and learning new physical skills revitalize body and spirit.",
      opportunities: "Higher education, spiritual growth, and international ventures hold exceptional promise. The horizon you seek is closer than it appears.",
      cosmicMessage: "You are the archer who never stops aiming at stars — and your arrows of intention have a way of finding exactly what the world needs.",
    },
    Capricorn: {
      career: "Saturn rewards disciplined effort with significant recognition and advancement. A long-term goal reaches its fulfillment in beautiful ways.",
      love: "Authentic commitment and shared ambition create lasting bonds. Your reliability and quiet devotion are seen and deeply valued.",
      finance: "Long-term financial strategies yield exceptional results now. Disciplined saving and strategic investment build wealth that lasts generations.",
      health: "Structure supports your wellbeing. Consistent routines, adequate rest, and honoring your body as a long-term investment creates lasting vitality.",
      opportunities: "Professional reputation and established expertise open doors that require trust and credibility. Your time of recognition has arrived.",
      cosmicMessage: "The mountain you are climbing was never just about reaching the summit — it is about who you become on the way up.",
    },
    Aquarius: {
      career: "Innovation, technology, and humanitarian work are your professional superpowers now. An unconventional approach solves what tradition cannot.",
      love: "Authentic friendship is the foundation of your deepest love. Intellectual connection and shared vision create bonds that transcend the ordinary.",
      finance: "Technology, innovation, and community-oriented ventures offer strong financial returns. Your ahead-of-the-curve vision is a genuine asset.",
      health: "Social connection and meaningful community participation are essential to your wellbeing. Isolation depletes you; collaboration restores you.",
      opportunities: "Social innovation, technology, and community leadership offer transformative possibilities. The future is your native element.",
      cosmicMessage: "You carry visions of what the world could be — and your unique gift is making others believe it too.",
    },
    Pisces: {
      career: "Creative, healing, and spiritual work align with your deepest gifts. An intuitive decision proves wiser than any strategic analysis.",
      love: "Soul-level connection is available to you now. Your compassion and empathy create a safe haven that draws loving hearts to yours.",
      finance: "Intuitive financial decisions and creative income streams open unexpectedly. Trust your instincts about value and timing.",
      health: "Spiritual and emotional nourishment is as essential as physical care. Time near water, creative expression, and meditation deeply restore you.",
      opportunities: "Creative, healing, and spiritual ventures hold extraordinary promise. What you dream with sincerity, the universe conspires to manifest.",
      cosmicMessage: "You carry the ocean within you — depths of feeling and imagination that have the power to heal, inspire, and transform.",
    },
  }

  if (pool[sign]) return pool[sign]

  return {
    career: `The stars are aligned favorably for your professional journey, ${name}. Your ruling planet ${planet} brings clarity and momentum to long-standing ambitions this season.`,
    love: `Your ${element} energy radiates powerfully in relationships. Deep connections are strengthened, and new bonds form with those who genuinely resonate with your authentic self.`,
    finance: `Cosmic cycles favor thoughtful financial decisions. Your intuitive understanding of value — both material and intangible — guides you toward abundance and stability.`,
    health: `Balance and attunement to your body's rhythms are highlighted. Rest, nourish, and move in ways that honor your unique cosmic constitution.`,
    opportunities: `A rare alignment of favorable energies opens doors that have been quietly waiting for your readiness. Trust your timing — the universe is conspiring in your favor.`,
    cosmicMessage: `You are a living constellation — every experience you have had has shaped the unique light you bring to this world.`,
  }
}

import axios from 'axios'

// ─── Zodiac utilities ────────────────────────────────────────────────────────

export function getZodiacSign(day, month) {
  const signs = [
    { name: 'Capricorn',  symbol: '♑', end: [1, 19] },
    { name: 'Aquarius',   symbol: '♒', end: [2, 18] },
    { name: 'Pisces',     symbol: '♓', end: [3, 20] },
    { name: 'Aries',      symbol: '♈', end: [4, 19] },
    { name: 'Taurus',     symbol: '♉', end: [5, 20] },
    { name: 'Gemini',     symbol: '♊', end: [6, 20] },
    { name: 'Cancer',     symbol: '♋', end: [7, 22] },
    { name: 'Leo',        symbol: '♌', end: [8, 22] },
    { name: 'Virgo',      symbol: '♍', end: [9, 22] },
    { name: 'Libra',      symbol: '♎', end: [10, 22] },
    { name: 'Scorpio',    symbol: '♏', end: [11, 21] },
    { name: 'Sagittarius',symbol: '♐', end: [12, 21] },
    { name: 'Capricorn',  symbol: '♑', end: [12, 31] },
  ]

  for (const sign of signs) {
    if (month < sign.end[0] || (month === sign.end[0] && day <= sign.end[1])) {
      return sign
    }
  }
  return { name: 'Capricorn', symbol: '♑' }
}

// ─── Trait database ──────────────────────────────────────────────────────────

const ZODIAC_DATA = {
  Aries: {
    traits: ['Courageous', 'Determined', 'Confident', 'Enthusiastic', 'Optimistic'],
    element: 'Fire 🔥',
    planet: 'Mars',
    color: '#ef4444',
    luckyNumbers: [1, 9, 19],
    luckyColors: ['Red', 'Orange'],
    description: 'Aries are natural-born leaders with an irresistible drive and passion. They charge into life headfirst and inspire others with their fearless energy.',
  },
  Taurus: {
    traits: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Responsible'],
    element: 'Earth 🌍',
    planet: 'Venus',
    color: '#22c55e',
    luckyNumbers: [2, 6, 9],
    luckyColors: ['Green', 'Pink'],
    description: 'Taurus are steadfast souls who value comfort and beauty. They build lasting foundations and bring warmth to everyone around them.',
  },
  Gemini: {
    traits: ['Gentle', 'Affectionate', 'Curious', 'Adaptable', 'Quick-witted'],
    element: 'Air 💨',
    planet: 'Mercury',
    color: '#eab308',
    luckyNumbers: [3, 8, 12],
    luckyColors: ['Yellow', 'Green'],
    description: 'Gemini are vibrant communicators who thrive on variety and intellectual stimulation. Their dual nature makes them endlessly fascinating companions.',
  },
  Cancer: {
    traits: ['Tenacious', 'Highly imaginative', 'Loyal', 'Emotional', 'Sympathetic'],
    element: 'Water 💧',
    planet: 'Moon',
    color: '#a78bfa',
    luckyNumbers: [2, 3, 15],
    luckyColors: ['White', 'Silver'],
    description: 'Cancer are deeply intuitive and sentimental, creating safe harbors for loved ones. Their nurturing spirit and emotional intelligence are their superpowers.',
  },
  Leo: {
    traits: ['Creative', 'Passionate', 'Generous', 'Warm-hearted', 'Cheerful'],
    element: 'Fire 🔥',
    planet: 'Sun',
    color: '#f59e0b',
    luckyNumbers: [1, 3, 10],
    luckyColors: ['Gold', 'Orange'],
    description: 'Leo are radiant performers who light up every room they enter. Their generosity and warmth make them beloved leaders and devoted friends.',
  },
  Virgo: {
    traits: ['Loyal', 'Analytical', 'Kind', 'Hardworking', 'Practical'],
    element: 'Earth 🌍',
    planet: 'Mercury',
    color: '#84cc16',
    luckyNumbers: [5, 14, 23],
    luckyColors: ['Beige', 'Pale Yellow'],
    description: 'Virgo are meticulous perfectionists who excel at seeing patterns others miss. Their dedication and precision make them invaluable in any endeavor.',
  },
  Libra: {
    traits: ['Cooperative', 'Diplomatic', 'Gracious', 'Fair-minded', 'Social'],
    element: 'Air 💨',
    planet: 'Venus',
    color: '#ec4899',
    luckyNumbers: [4, 6, 13],
    luckyColors: ['Pink', 'Blue'],
    description: 'Libra are natural harmonizers who seek balance and beauty in all things. Their charm and sense of fairness make them trusted mediators and beloved friends.',
  },
  Scorpio: {
    traits: ['Resourceful', 'Brave', 'Passionate', 'Stubborn', 'True friend'],
    element: 'Water 💧',
    planet: 'Pluto',
    color: '#dc2626',
    luckyNumbers: [8, 11, 18],
    luckyColors: ['Black', 'Crimson'],
    description: 'Scorpio are intense truth-seekers with magnetic personalities. Their depth of emotion and fierce loyalty create bonds that last lifetimes.',
  },
  Sagittarius: {
    traits: ['Generous', 'Idealistic', 'Great sense of humor', 'Energetic', 'Optimistic'],
    element: 'Fire 🔥',
    planet: 'Jupiter',
    color: '#7c3aed',
    luckyNumbers: [3, 7, 9],
    luckyColors: ['Purple', 'Blue'],
    description: 'Sagittarius are adventurous philosophers who chase horizons with boundless enthusiasm. Their optimism and wisdom inspire everyone on their cosmic journey.',
  },
  Capricorn: {
    traits: ['Responsible', 'Disciplined', 'Self-controlled', 'Good managers', 'Ambitious'],
    element: 'Earth 🌍',
    planet: 'Saturn',
    color: '#64748b',
    luckyNumbers: [4, 8, 13],
    luckyColors: ['Brown', 'Black'],
    description: 'Capricorn are master architects of success who build empires with patience and skill. Their discipline and ambition create extraordinary achievements over time.',
  },
  Aquarius: {
    traits: ['Progressive', 'Original', 'Independent', 'Humanitarian', 'Inventive'],
    element: 'Air 💨',
    planet: 'Uranus',
    color: '#06b6d4',
    luckyNumbers: [4, 7, 11],
    luckyColors: ['Blue', 'Silver'],
    description: 'Aquarius are visionary rebels who dream of a better world. Their innovative thinking and humanitarian spirit make them catalysts for positive change.',
  },
  Pisces: {
    traits: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Wise'],
    element: 'Water 💧',
    planet: 'Neptune',
    color: '#818cf8',
    luckyNumbers: [3, 9, 12],
    luckyColors: ['Sea Green', 'Lavender'],
    description: 'Pisces are mystical dreamers who swim between worlds with grace. Their deep empathy and artistic gifts make them the poets and healers of the zodiac.',
  },
}

// ─── Daily horoscope pool ─────────────────────────────────────────────────────

const HOROSCOPES = {
  Aries: [
    "The cosmos aligns to amplify your leadership today. Trust your instincts and charge forward — a bold move will open unexpected doors. Mars energizes your ambitions.",
    "Creative fire burns bright in your chart. Share your vision boldly; collaborators are drawn to your magnetic energy. Financial luck favors decisive action.",
  ],
  Taurus: [
    "Venus blesses your relationships today. A heart-to-heart conversation could transform a friendship into something deeper. Financial stability improves through practical decisions.",
    "The earth beneath you feels solid. This is a powerful day to plant seeds — both literal and metaphorical. Your patience will yield extraordinary results.",
  ],
  Gemini: [
    "Mercury sharpens your mind to diamond clarity. Words flow brilliantly — write, speak, connect. An unexpected message could pivot your week in a wonderful direction.",
    "Two paths glitter before you. Neither is wrong, but one aligns more deeply with your authentic self. Trust that knowing inside you.",
  ],
  Cancer: [
    "The moon, your guardian, illuminates your emotional landscape. Honor your feelings today — they carry ancient wisdom. A domestic matter resolves beautifully.",
    "Intuition is your superpower today. That quiet hunch has cosmic backing. Nurture yourself first; from overflow, you give abundantly to others.",
  ],
  Leo: [
    "The sun blazes through your chart with extraordinary warmth. Your generosity will be remembered long after today. Creative projects receive divine attention.",
    "Your radiance attracts exactly what you need. A compliment given sincerely returns to you tenfold. Stand fully in your magnificent light.",
  ],
  Virgo: [
    "Mercury brings crystal clarity to complex systems. The solution you've sought reveals itself in elegant simplicity. Health routines established today compound beautifully.",
    "Precision is your gift. A detail others overlooked holds the key. Your analytical mind solves what emotion alone cannot untangle.",
  ],
  Libra: [
    "Venus dances through your chart, harmonizing relationships. An old tension dissolves into understanding. Your sense of beauty finds a perfect outlet today.",
    "Balance is not stillness — it's dynamic equilibrium. You move gracefully between worlds today. An artistic or aesthetic choice proves wildly successful.",
  ],
  Scorpio: [
    "Pluto stirs the deep waters. What you discover about yourself today will transform you. Embrace the depth; this is where your power lives.",
    "Intensity becomes an asset in negotiations. You see what others hide. Use this gift for healing, not control, and remarkable doors open.",
  ],
  Sagittarius: [
    "Jupiter expands your horizons magnificently. A philosophy or belief upgrades itself. Adventure beckons from an unexpected direction — say yes.",
    "Optimism is a strategy, not a mood. Your positive framing reshapes a challenging situation. Teaching or sharing knowledge brings joy today.",
  ],
  Capricorn: [
    "Saturn rewards your discipline with tangible results. A long-term project reaches a milestone. Your reputation precedes you into a new opportunity.",
    "Structure creates freedom. The system you build today serves you for years. Recognition from an authority figure validates your quiet dedication.",
  ],
  Aquarius: [
    "Uranus sparks innovation in your mind. An unconventional idea is actually the most practical solution. Community connections yield surprising opportunities.",
    "The future is your native element. What you imagine today plants seeds in tomorrow's world. Technology or social networks bring meaningful connection.",
  ],
  Pisces: [
    "Neptune deepens your intuition to mystical levels. Art, dreams, and synchronicities speak loudly. Trust the imaginal realm — it reflects deeper truths.",
    "Compassion is your cosmic assignment today. Your empathy heals without depleting you when boundaries are honored. Creative work flows like water.",
  ],
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getAstrologyData(userData) {
  // Simulate a brief API call delay for UX realism
  await new Promise(r => setTimeout(r, 1200))

  const dob = new Date(userData.dob)
  const month = dob.getMonth() + 1
  const day   = dob.getDate()
  const year  = dob.getFullYear()

  const sign  = getZodiacSign(day, month)
  const data  = ZODIAC_DATA[sign.name]
  const horoscopeList = HOROSCOPES[sign.name] || []
  const todayIndex = new Date().getDate() % horoscopeList.length
  const dailyHoroscope = horoscopeList[todayIndex] || horoscopeList[0]

  // Lucky number seeded from birthday for consistency
  const luckyIdx = (day + month) % data.luckyNumbers.length
  const luckyNumber = data.luckyNumbers[luckyIdx]
  const luckyColor  = data.luckyColors[luckyIdx % data.luckyColors.length]

  // Chinese zodiac
  const chineseYears = ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig']
  const chineseSign  = chineseYears[(year - 1900) % 12]

  return {
    name: userData.name,
    gender: userData.gender,
    city: userData.city,
    dob: userData.dob,
    timeOfBirth: userData.timeOfBirth,
    zodiacSign: sign.name,
    zodiacSymbol: sign.symbol,
    chineseSign,
    element: data.element,
    rulingPlanet: data.planet,
    color: data.color,
    traits: data.traits,
    description: data.description,
    dailyHoroscope,
    luckyNumber,
    luckyColor,
  }
}

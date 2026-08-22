// Drill-down question bank + trait map, exactly as specced.

export const DRILLDOWN_QUESTIONS = [
  {
    id: 'q1',
    question: 'What are you in the mood for?',
    options: [
      { label: 'Heritage & History', trait: 'heritage', emoji: '🏛️', hint: 'Forts, palaces, old city' },
      { label: 'Food & Drinks', trait: 'food', emoji: '🍽️', hint: 'Street eats, drinks, rooftops' },
      { label: 'Arts & Craft', trait: 'craft', emoji: '🎨', hint: 'Block print, pottery, gems' },
      { label: 'Slow Travel', trait: 'slow', emoji: '🌿', hint: 'Gardens, quiet corners, chai' },
    ],
  },
  {
    id: 'q2',
    question: 'How do you like to explore?',
    options: [
      { label: 'Wander freely', trait: 'wander', emoji: '🚶', hint: 'No plan, just roam' },
      { label: 'Go deep', trait: 'deep', emoji: '📖', hint: 'Stories, guides, context' },
      { label: 'Photo first', trait: 'photo', emoji: '📸', hint: 'Iconic angles & light' },
      { label: 'Cover ground', trait: 'cover', emoji: '⚡', hint: 'Many spots, quick hits' },
    ],
  },
  {
    id: 'q3',
    question: 'When do you prefer to go?',
    options: [
      { label: 'Golden hour', trait: 'golden', emoji: '🌅', hint: 'Sunrise or sunset' },
      { label: 'Daytime', trait: 'daytime', emoji: '☀️', hint: 'Full visibility, open hours' },
      { label: 'Evening & night', trait: 'evening', emoji: '🌙', hint: 'Lit-up, peaceful, cool' },
      { label: 'Any time', trait: 'anytime', emoji: '🎒', hint: "I'm flexible" },
    ],
  },
  {
    id: 'q4',
    question: "What's your vibe today?",
    options: [
      { label: 'Slow & quiet', trait: 'quiet', emoji: '🧘', hint: 'One place, all morning' },
      { label: 'Energetic', trait: 'energetic', emoji: '🔥', hint: 'Pack in as much as possible' },
      { label: 'Off the beaten path', trait: 'offbeat', emoji: '🕵️', hint: 'Spots only locals know' },
      { label: 'One unmissable thing', trait: 'hero', emoji: '🎯', hint: 'The single best pick' },
    ],
  },
  {
    id: 'q5',
    question: "Anything you'd rather skip?",
    options: [
      { label: 'Skip crowded spots', trait: 'nocrowd', emoji: '🚫', hint: 'Keep it local & quiet' },
      { label: 'Skip paid entry', trait: 'nopaid', emoji: '💸', hint: 'Free gems please' },
      { label: 'Skip outdoor spots', trait: 'nooutdoor', emoji: '🏠', hint: 'Indoors only today' },
      { label: 'No filters — show all', trait: 'all', emoji: '✅', hint: "I'll take everything" },
    ],
  },
]

export function traitToOption(trait) {
  for (const q of DRILLDOWN_QUESTIONS) {
    const opt = q.options.find((o) => o.trait === trait)
    if (opt) return opt
  }
  return null
}

export function traitToLabel(trait) {
  return traitToOption(trait)?.label ?? trait
}

export const BUDGET_OPTIONS = [
  {
    id: 'free',
    label: 'Free gems',
    sublabel: 'No-cost spots & experiences',
    price: 'Under ₹100',
    rupees: 1,
  },
  {
    id: 'mid',
    label: 'Mid range',
    sublabel: 'Good local spots & food',
    price: '₹100–500',
    rupees: 2,
  },
  {
    id: 'premium',
    label: 'Splurge',
    sublabel: 'Rooftops, dining & guided walks',
    price: '₹500+',
    rupees: 3,
  },
]
